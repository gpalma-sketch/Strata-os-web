# Despliegue y conexión del dominio

`npm run build` genera `dist/`: ficheros estáticos, sin servidor ni secretos.
Vale cualquier hosting estático.

El dominio es **stratalabai.com**, registrado en GoDaddy.

---

## 1. Antes de desplegar

Configura las dos variables de entorno en el panel del hosting (no en el
repositorio — aunque no son secretos, así se cambian sin tocar código):

```
PUBLIC_WAITLIST_ENDPOINT=…   # lista de lanzamiento de STRATA OS (solo email)
PUBLIC_CONTACT_ENDPOINT=…    # diagnóstico de STRATA Lab (formulario completo)
```

Si las dejas vacías el sitio compila igual: el formulario de la lista se
sustituye por un enlace `mailto:` y el de diagnóstico desaparece dejando el
botón de correo. Nada se pierde en silencio, pero tampoco se recoge.

Comando de build: `npm run build` · directorio de salida: `dist`

---

## 2. Conectar stratalabai.com desde GoDaddy

Dos caminos. **El A es el recomendado**: delegas el DNS en el hosting y este
gestiona certificado, `www` y renovaciones solo.

### Camino A — delegar los nameservers (recomendado)

1. En el panel del hosting, añade el dominio `stratalabai.com` al proyecto.
   Te dará entre dos y cuatro **nameservers** (algo del estilo
   `ns1.vercel-dns.com`, `dns1.p01.nsone.net`, `xxx.ns.cloudflare.com`).
2. En GoDaddy: **Mis productos → Dominios → stratalabai.com → DNS →
   Nameservers → Cambiar → Usar mis propios nameservers**.
3. Pega los que te dio el hosting y guarda.
4. Espera la propagación. Suele tardar de 30 minutos a 2 horas; formalmente
   puede llegar a 48. El certificado HTTPS se emite solo en cuanto resuelve.

> Ojo: al delegar los nameservers, **cualquier registro DNS que hoy viva en
> GoDaddy deja de aplicarse** — incluido el correo. Si ya tenéis buzones
> `@stratalabai.com`, copiad antes los registros MX (y SPF/DKIM/DMARC) y
> volvedlos a crear en el nuevo proveedor de DNS. Si aún no hay correo, no hay
> nada que salvar.

### Camino B — mantener el DNS en GoDaddy

Útil si preferís no mover el correo. En **GoDaddy → DNS → Registros**:

| Tipo | Nombre | Valor | TTL |
| --- | --- | --- | --- |
| A | `@` | la IP que indique el hosting | 1 hora |
| CNAME | `www` | el destino que indique el hosting | 1 hora |

Valores habituales, **a título orientativo**: Vercel usa `76.76.21.21` para el
registro A y `cname.vercel-dns.com` para el CNAME; Netlify usa `75.2.60.5` y
`<tu-sitio>.netlify.app`. Manda siempre lo que diga el panel del hosting el día
que lo hagas, no esta tabla.

Borra los registros `A` y `CNAME` de `@` y `www` que GoDaddy trae por defecto
(el aparcamiento del dominio), o entrarán en conflicto.

---

## 3. Decidir apex o www

El sitio está configurado para **`https://stratalabai.com`** (sin `www`), y así
lo declaran `site` en `astro.config.mjs`, `domain` en `src/data/site.ts` y
`public/robots.txt`.

Configura en el hosting que `www.stratalabai.com` **redirija** al apex con un
301. Si preferís lo contrario —`www` como principal— hay que cambiar esos tres
sitios además de la redirección, porque de ellos salen la URL canónica, los
`hreflang` y la URL absoluta de la imagen de Open Graph.

---

## 4. Comprobaciones después de conectar

- [ ] `https://stratalabai.com` carga y el candado es válido.
- [ ] `https://www.stratalabai.com` redirige al apex (301, no 302).
- [ ] `http://` redirige a `https://`.
- [ ] `https://stratalabai.com/en` carga la versión en inglés.
- [ ] `https://stratalabai.com/sitemap-index.xml` responde.
- [ ] Enviar una prueba en **los dos** formularios y confirmar que llegan.
- [ ] Compartir el enlace en WhatsApp o LinkedIn y ver que sale la tarjeta con
      la imagen (`/og.png`) y el título correctos.
- [ ] Dar de alta el dominio en Google Search Console y enviar el sitemap.

---

## 5. Notas

- **Correo.** `hola@stratalabai.com` y `partners@stratalabai.com` están por
  todo el sitio. Tienen que existir antes de publicar: son la única vía de
  contacto si un formulario falla.
- **Cabeceras.** Si el hosting lo permite, añade `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`.
  El sitio no los necesita para funcionar, pero son gratis.
- **Caché.** Todo lo que hay bajo `/_astro/` lleva hash en el nombre y puede
  cachearse de forma indefinida e inmutable. El HTML, no.
