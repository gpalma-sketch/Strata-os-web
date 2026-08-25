# Checklist de lanzamiento

El sitio compila y se despliega sin nada de esto, pero no apuntes el dominio
real hasta cerrar la sección **Bloqueante**.

Para conectar stratalabai.com, ver `DEPLOY.md`.

## Bloqueante

- [ ] **Buzones de correo.** `hola@stratalabai.com` y
      `partners@stratalabai.com` (en `src/data/site.ts`) tienen que existir.
      Son los que usan todos los `mailto:`, la salida del chat y el mensaje de
      error de los formularios: si no existen, un fallo de formulario deja al
      lead sin ninguna vía.
- [ ] **Endpoints de los dos formularios.** `PUBLIC_WAITLIST_ENDPOINT` (lista
      de lanzamiento) y `PUBLIC_CONTACT_ENDPOINT` (diagnóstico). Sin ellos el
      sitio degrada a `mailto:`, así que no se pierde nada, pero tampoco se
      recoge nada. Envía una prueba en cada uno tras desplegar.
- [ ] **Política de privacidad y aviso legal.** Los dos formularios recogen
      datos personales y el texto de consentimiento promete cómo se tratan.
      Además, la LSSI-CE obliga a un aviso legal con los datos identificativos
      de la sociedad. No existen todavía: créalos y enlázalos desde el pie.
- [ ] **Banner de cookies: comprueba si hace falta.** Tal como está, el sitio
      no pone cookies ni analítica. En cuanto añadas analítica, lo más probable
      es que necesites consentimiento previo.
- [ ] **Repasar los precios de lanzamiento.** 490 € y 1.490 € salen del
      prototipo de diseño. Se muestran como tarifas de lanzamiento con el
      distintivo "Próximamente" y la nota de que pueden ajustarse — pero quien
      se apunte a la lista los va a dar por buenos.

## Estado de lanzamiento

STRATA OS aparece como **próximamente** en toda la página; STRATA Lab, como
**disponible hoy**. Lo controlan `osAvailable` y `labAvailable` en
`src/data/site.ts`.

- [ ] **El día del lanzamiento**, cuando el OS se pueda contratar:
  - quita `comingSoon: true` de los planes Starter y Growth en
    `src/data/content/es.ts` y `en.ts`;
  - devuelve sus CTA a la contratación (etiqueta y `ctaHref`);
  - reescribe `pricing.availabilityNote` o elimínalo;
  - actualiza la sección `waitlist` (o sustitúyela) y el `hero.statusChip`;
  - revisa las respuestas `launch` y `price` del chat y la primera pregunta
    del FAQ.
- [ ] **Fecha de lanzamiento.** Ahora mismo no se da ninguna, a propósito. Si
      la anunciáis, ponedla en `waitlist.lead` en los dos idiomas — y cumplidla.

## Contenido pendiente de datos reales

Cada uno tiene ya su componente hecho; aparece en cuanto existan los datos.

- [ ] **Opiniones de clientes** → `site.testimonials`. La sección entera está
      oculta mientras el array esté vacío. Añade citas reales y atribuibles,
      **con permiso del cliente**. No recuperes las tres inventadas del
      prototipo.
- [ ] **Logos de partners** → `site.partnerLogos`. Mismo patrón; las imágenes,
      a `src/assets/`.
- [ ] **Cifras de resultados.** `why.outcomes` son rangos presentados como
      objetivos, con su aviso visible (`why.outcomesNote`). Cuando tengáis
      resultados medidos de clientes, sustituidlos por los reales — y solo
      entonces valorad quitar el aviso.
- [ ] **Feed de agentes**: está etiquetado como `● Demo` porque es un bucle
      guionizado. Si algún día lo alimentan eventos reales, cambia la etiqueta.
- [ ] **"8 agentes operando nuestro propio negocio"** aparece en la lista de
      lanzamiento y en el cierre de "Cómo funciona". Confirma que sigue siendo
      el número correcto.

## Deseable

- [ ] **Imagen de Open Graph con el logotipo completo.** `public/og.png` es
      solo el monograma: Archivo no está instalada en la máquina de build y un
      wordmark en una tipografía sustituta se vería mal. Exporta una de
      1200×630 desde la marca (`project/logos/`) y reemplázala.
- [ ] **Chat.** Hoy es un buscador de palabras clave sobre respuestas fijas, y
      así se presenta. Conectarlo a un modelo real exige backend y clave de
      API: el sitio dejaría de ser puramente estático.
- [ ] **Analítica.** No hay ninguna. Elige algo compatible con consentimiento.
- [ ] **Fotografía.** La galería usa los tres gráficos de marca del bundle.
      Fotos reales del equipo, de la oficina o de un cliente pesarían más.
- [ ] **`NORDA`** es el cliente ficticio del panel del hero. Como demo está
      bien; cámbialo si preferís enseñar uno real (con permiso).

## Verificado en el build

Comprobado contra la salida compilada, no asumido:

- Sin desbordamiento horizontal a 1920 / 1440 / 1120 / 980 / 768 / 390 / 360 px.
- Sin errores de consola en ninguno de los dos idiomas.
- `npm run check`: 0 errores, 0 avisos, 0 sugerencias.
- Los dos idiomas se pre-renderizan; los cinco paneles de casos de uso están
  en el HTML.
- Las imágenes se compilan a WebP en varios anchos (707 kB PNG → ~7 kB al
  tamaño al que se muestra).

Vuelve a pasar `npm run check && npm run build` después de cualquier cambio de
contenido.
