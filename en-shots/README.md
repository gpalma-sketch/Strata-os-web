# Las capturas del Business OS en inglés

Aquí vive la **fuente** de `src/assets/os-*-en.png`, las cuatro capturas del panel que se muestran
en la versión inglesa de la web. No son imágenes editadas: son réplicas en HTML que se renderizan y
se capturan, así que se pueden corregir y regenerar en un minuto.

## Por qué existen (27 ago 2026)

La versión inglesa mostraba las capturas del panel **con la interfaz en español**, y Borja
presentaba STRATA en un evento al día siguiente. El Business OS no tiene traducción y no la iba a
tener a tiempo, así que Gonzalo decidió recrear las cuatro capturas en inglés como material de venta.

Es una decisión suya y consciente. Lo que se hizo para que la web no mintiera al hacerlo: el rótulo
de esa sección en inglés decía *«Real screenshots of the system, not mockups»* y se cambió por
**«The Business OS, screen by screen»**. El español conserva el original porque allí las capturas
**sí** son reales.

## Cómo regenerar una

```bash
node shot.mjs os-depto        # renderiza os-depto.html y escribe src/assets/os-depto-en.png
```

Cada `.html` se maqueta en un lienzo con **las medidas reales de la imagen original** (2000 px de
ancho, o 2200 en `os-equipo`) y se reduce con `transform: scale(.5)` sobre un viewport a la mitad,
capturando con `deviceScaleFactor: 2`. Así 1 píxel de diseño = 1 píxel de la imagen final y las
medidas leídas del original se pueden usar tal cual, sin conversiones.

> **El hallazgo que ahorra la próxima vez**: la original NO está renderizada a 1000 CSS × 2, sino a
> **2000 CSS × 1**. Se ve midiendo un rótulo: «DEPARTAMENTOS DEL NEGOCIO» ocupa ~206 px, que es
> exactamente Space Mono 11 px con `letter-spacing: .12em` a escala 1:1. Maquetar a 1000 CSS con
> tipos «normales» saca todo al doble de tamaño.

## Reglas al tocarlas

- **Los nombres propios no se traducen**: Lola, Benja, Gio, Marta, OFF TV, NORDA, Metricool, Gamma,
  ChatGPT, Perplexity, Claude, AI Overviews, Meta, Google, llms.txt, Holded, CMO, COO, CAC, ROAS.
- **Respetar los recortes.** En las originales hay palabras cortadas a media letra en los bordes,
  porque son recortes de una pantalla más grande. Si la réplica sale centradita y completa, canta
  que es una maqueta — es lo que más delata.
- **Vocabulario coherente con la web inglesa**: Sales (no Revenue), Support, Finance, Leadership,
  Governance, Hire your team, Your AI team, Start here, Department map, Approvals by department.
- Las fuentes (`fonts/`) están descargadas en local a propósito: una captura no puede depender de
  que Google Fonts responda el día que alguien regenere.

## Lo que no quedó calcado, y se dejó a sabiendas

- El verde de los cuadritos de icono en `os-dia` tira un punto más mentolado que el original, que es
  más grisáceo.
- «Creators & Influencers» no se corta en el borde derecho como «Creadores & Influencers» en la
  original: el inglés es más corto.
- Los iconitos junto a los contadores de `os-depto` son manchas de 16 px en la original; aquí son un
  icono de trazo de la misma familia. A tamaño real no se distingue.

Ninguno de los tres se ve a tamaño de publicación. Están escritos aquí para que quien los note sepa
que se miraron y se decidieron, en vez de perseguirlos otra vez.
