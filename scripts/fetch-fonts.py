import re, subprocess, pathlib, sys

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUT = pathlib.Path("public/fonts")

# Exactamente los pesos que usa la web, ni uno más.
# Solo los pesos que el CSS usa de verdad — auditado con:
#   grep -o "font-weight: *[0-9]\{3\}" src/styles/*.css src/**/*.astro
# Añadir un peso aquí sin usarlo son ~50 kB que el visitante descarga en balde.
FAMILIES = {
    "Archivo": "Archivo:wght@800",
    "Space+Grotesk": "Space+Grotesk:wght@400;600;700",
    "Space+Mono": "Space+Mono:wght@400;700",
}
# Solo latin y latin-ext: la web es ES/EN.
KEEP = {"latin", "latin-ext"}

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
        weight = re.search(r"font-weight:\s*(\d+)", block).group(1)
        url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
        rng = re.search(r"unicode-range:\s*([^;]+);", block).group(1).strip()
        name = f"{fam.replace('+','-').lower()}-{weight}-{subset}.woff2"
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
           "============================================================================ */",
           ""]
for fam, weight, name, rng, subset in sorted(faces, key=lambda f: (f[0], int(f[1]), f[4])):
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
print(f"{len(faces)} font-face, {sum(f.stat().st_size for f in OUT.iterdir())/1024:.0f} kB en total")
