import json, re, subprocess, pathlib, sys

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUT = pathlib.Path("public/fonts")

# Exactamente los pesos que usa la web, ni uno más.
# Solo los pesos que el CSS usa de verdad — auditado con:
#   grep -o "font-weight: *[0-9]\{3\}" src/styles/*.css src/**/*.astro
# Añadir un peso aquí sin usarlo son ~50 kB que el visitante descarga en balde.
FAMILIES = {
    "Archivo": "Archivo:wght@800",
    # ── LA DE TEXTO CAMBIÓ EL 28 AGO 2026, Y POR UNA RAZÓN MEDIBLE ──────────────────────────────
    # Antes: Space Grotesk. `impeccable detect` la señala como `overused-font`: «Inter, Roboto,
    # Fraunces, Geist, Plus Jakarta Sans y Space Grotesk se usan en tantos sitios que ya no
    # resultan distintivas. Cada nueva ola de interfaces generadas por IA converge en el mismo
    # puñado de caras.» Nuestras propias directrices de diseño la listan aparte como «la cara
    # segura» de ese mismo grupo — dos fuentes independientes señalando lo mismo.
    #
    # ⚠️ Y EL PRIMER RECAMBIO TAMBIÉN ESTABA EN LA LISTA. Probé Instrument Sans y el detector la
    # señaló igual: la descripción de la regla sólo nombra seis caras, pero su lista real tiene
    # DIECISIETE (Inter, Roboto, Open Sans, Lato, Montserrat, Arial, Helvetica, Fraunces, Geist,
    # Geist Sans/Mono, Mona Sans, Plus Jakarta Sans, Space Grotesk, Recoleta, Instrument Sans e
    # Instrument Serif). Leerla en el paquete costó dos minutos y ahorró elegir a ciegas otra vez.
    #
    # Schibsted Grotesk: diseñada por Displaay para el grupo Schibsted, pensada a la vez para
    # interfaz y editorial. Terminaciones con carácter propio sin llegar a ruidosa, y aguanta bien
    # de 13 px a 20 px, que es donde vive el texto de este sitio. Casa con una display industrial
    # pesada como Archivo. Se elige por eso, no por no estar en una lista: las otras dos que
    # quedaban fuera (Public Sans, Onest) son más neutras y aportan menos.
    #
    # ⚠️ SE ROMPE UN PARENTESCO, Y ES DELIBERADO: Space Grotesk y Space Mono son familia. Space
    # Mono se queda porque sólo se usa en etiquetas pequeñas en versalitas, donde su carácter es
    # una ventaja; mezclar una grotesca neutra con una mono con personalidad es una elección, no
    # un descuido.
    "Schibsted+Grotesk": "Schibsted+Grotesk:wght@400..700",  # VARIABLE, ver nota abajo
    "Space+Mono": "Space+Mono:wght@400;700",
}
# Solo latin y latin-ext: la web es ES/EN.
KEEP = {"latin", "latin-ext"}

# ── QUÉ CARAS SE PRECARGAN, Y POR QUÉ SE DECIDE AQUÍ (28 ago 2026) ──────────────────────────────
# `Base.astro` precargaba los ficheros con el nombre ESCRITO A MANO. Al cambiar la tipografía de
# texto esta misma mañana quedó apuntando a `space-grotesk-400-latin.woff2`, que ya no existe:
# **404 en cada carga de cada página**, una precarga desperdiciada, y la fuente que sí se usa
# quedándose SIN precargar — o sea, el efecto contrario al que buscaba la etiqueta.
#
# Lo cazó el detector de impeccable mirando la red del navegador; los tres motores de reglas no lo
# vieron, y `tsc` tampoco tenía nada que decir. Nada fallaba: sólo llegaba tarde una fuente.
#
# El arreglo no es corregir el nombre —volvería a romperse al siguiente cambio— sino que el nombre
# deje de escribirse dos veces. Este script, que es el único que sabe qué ficheros existen, emite
# la lista; `Base.astro` la importa. Cambiar de tipografía actualiza la precarga sola.
#
# Sólo el subconjunto `latin`: `latin-ext` cubre acentos y se descarga cuando hace falta, y
# precargar las dos duplicaría el peso de la ruta crítica sin ganar nada en el primer viewport.
PRECARGA = {"Archivo", "Schibsted+Grotesk"}

def curl(url, binary=False):
    r = subprocess.run(["curl", "-sS", "-m", "60", "-A", UA, url],
                       capture_output=True, check=True)
    return r.stdout if binary else r.stdout.decode("utf-8")

faces = []
for fam, spec in FAMILIES.items():
    css = curl(f"https://fonts.googleapis.com/css2?family={spec}&display=swap")
    subset = None
    for block in re.split(r"(?=/\* )", css):
        m = re.match(r"/\* ([a-z\-]+) \*/", block.strip())
        if m:
            subset = m.group(1)
        if "@font-face" not in block or subset not in KEEP:
            continue
        # ⚠️ EL PESO PUEDE SER UN RANGO, NO UN NÚMERO (28 ago 2026). Al pedir una fuente VARIABLE
        # (`wght@400..700`) Google devuelve `font-weight: 400 700` en un solo @font-face. El regex
        # de antes era `(\d+)` y se habría quedado con «400»: el fichero se guardaría como si fuera
        # sólo el regular y el navegador sintetizaría la negrita deformando las letras —peor que la
        # fuente que veníamos a mejorar, y sin que nada fallara.
        weight = re.search(r"font-weight:\s*([\d]+(?:\s+[\d]+)?)", block).group(1).strip()
        etiqueta = weight.replace(" ", "-") if " " in weight else weight
        url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
        rng = re.search(r"unicode-range:\s*([^;]+);", block).group(1).strip()
        name = f"{fam.replace('+','-').lower()}-{etiqueta}-{subset}.woff2"
        (OUT / name).write_bytes(curl(url, binary=True))
        faces.append((fam.replace("+", " "), weight, name, rng, subset))

# Hoja de estilo local equivalente a la de Google.
css_out = ["/* ============================================================================",
           "   Tipografías auto-alojadas.",
           "",
           "   Se sirven desde el propio dominio en lugar de Google Fonts: cargarlas desde",
           "   Google envía la IP de cada visitante a un tercero en EE.UU. antes de que",
           "   haya podido consentir nada (LG München I, 3 O 17493/20). Alojarlas aquí",
           "   evita esa transferencia y además elimina dos conexiones externas de la",
           "   ruta crítica.",
           "",
           "   Generado con scripts/fetch-fonts.py — no editar a mano.",
           "   Subconjuntos latin y latin-ext, solo los pesos que usa el sitio.",
           "",
           "   La de texto es VARIABLE (un fichero para todo el rango 400-700). Sale más ligera que",
           "   tres estáticas: 68 kB contra ~108 kB, y encima permite pesos intermedios sin añadir",
           "   descargas.",
           "============================================================================ */",
           ""]
for fam, weight, name, rng, subset in sorted(faces, key=lambda f: (f[0], int(f[1].split()[0]), f[4])):
    css_out.append(f"/* {fam} {weight} · {subset} */")
    css_out.append("@font-face {")
    css_out.append(f"  font-family: '{fam}';")
    css_out.append("  font-style: normal;")
    css_out.append(f"  font-weight: {weight};")
    css_out.append("  font-display: swap;")
    css_out.append(f"  src: url('/fonts/{name}') format('woff2');")
    css_out.append(f"  unicode-range: {rng};")
    css_out.append("}")
    css_out.append("")
pathlib.Path("src/styles/fonts.css").write_text("\n".join(css_out))

# ── LO QUE YA NO SE USA SE BORRA (28 ago 2026) ──────────────────────────────────────────────────
# Este script no limpiaba. La cabecera que él mismo escribe advierte de que «añadir un peso sin
# usarlo son ~50 kB que el visitante descarga en balde», y sin embargo al CAMBIAR de familia dejaba
# la anterior en public/fonts para siempre.
#
# Se vio al sustituir Space Grotesk: quedaron 12 ficheros huérfanos (Space Grotesk × 3 pesos e
# Instrument Sans × 3, de un recambio descartado a medio camino) que no los referencia ningún
# @font-face. No los descarga nadie —por eso no se notaba— pero viajan en el repo y en cada
# despliegue, y con el tiempo nadie sabe qué sobra y qué hace falta.
#
# Se borra lo que la hoja recién generada NO menciona. Falla del lado seguro: la lista de lo que se
# conserva sale de `faces`, o sea de lo que se acaba de descargar y escribir.
vivos = {name for _, _, name, _, _ in faces}
borrados = 0
for f in sorted(OUT.iterdir()):
    if f.suffix == ".woff2" and f.name not in vivos:
        f.unlink(); borrados += 1
        print(f"  · huérfano borrado: {f.name}")

# La lista de precarga, para que nadie vuelva a escribir un nombre de fichero a mano.
precarga = sorted({f"/fonts/{name}" for fam, _w, name, _r, subset in faces
                   if subset == "latin" and fam.replace(" ", "+") in PRECARGA})
if not precarga:
    raise SystemExit("✖ PRECARGA no ha encajado con ninguna familia descargada: revisa los nombres "
                     f"({sorted(PRECARGA)} vs {sorted({f[0] for f in faces})}).")
datos = pathlib.Path("src/data"); datos.mkdir(parents=True, exist_ok=True)
(datos / "fuentes-precarga.json").write_text(json.dumps({
    "_por_que": "Ficheros de tipografía que Base.astro precarga. LO GENERA scripts/fetch-fonts.py "
                "— no editar a mano. Existe porque el nombre estaba escrito a mano en Base.astro y "
                "al cambiar la tipografía quedó apuntando a un fichero borrado: 404 en cada página.",
    "ficheros": precarga,
}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(f"{len(faces)} font-face, {sum(f.stat().st_size for f in OUT.iterdir())/1024:.0f} kB en total"
      + (f" (borrados {borrados} huérfanos)" if borrados else ""))
print(f"· precarga declarada: {', '.join(precarga)}")
