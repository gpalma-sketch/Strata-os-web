# Despliegue y conexión del dominio

`npm run build` genera `dist/`: ficheros estáticos, sin servidor ni secretos.
Vale cualquier hosting estático.

El dominio es **stratalabai.com**, registrado en GoDaddy.

---

## Estado actual — leer antes de tocar nada

Dos cosas hay que deshacer para que el dominio sirva esta web:

1. **`stratalabai.com` apunta hoy al constructor de webs de GoDaddy (Airo)**,
   que sirve una plantilla genérica ("Drop us a line!"). GoDaddy la publica
   sola al registrar el dominio. Hay que desconectarla — paso 3.
2. **El correo ya está en marcha**: `gpalma@stratalabai.com` funciona con
   Gmail, lo que significa que hay **registros MX de Google** viviendo en el
   DNS de GoDaddy.

> ### ⚠️ No delegues los nameservers
>
> Por el punto 2: si delegas los nameservers a Vercel o Netlify, **todo el DNS
> de GoDaddy deja de aplicarse, incluidos esos MX, y el correo deja de entrar
> en el acto.**
>
> Usa el **camino del paso 4**: dejas el DNS en GoDaddy y cambias solo dos
> registros. El correo ni se entera.

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

## 2. Publicar el sitio en Vercel

El código ya está en `github.com/gpalma-sketch/Strata-os-web`, así que:

1. Entra en <https://vercel.com/new>.
2. **Import Git Repository** → elige `Strata-os-web`.
   La primera vez te pedirá instalar la app de Vercel en tu GitHub y darle
   acceso a ese repositorio.
3. Vercel detecta **Astro** solo. No cambies nada:
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: la raíz (déjalo vacío)
4. Despliega. En un minuto tienes una URL `…vercel.app` funcionando.
5. **Settings → Environment Variables**: añade las dos del paso 1 y vuelve a
   desplegar (**Deployments → … → Redeploy**) para que las tome.

A partir de aquí, cada `git push` a `main` despliega solo.

---

## 3. Quitar el sitio de GoDaddy del dominio

Antes de tocar el DNS, desconecta el constructor o competirá por el dominio:

1. GoDaddy → **Mis productos → Sitios web + Marketing / Airo**.
2. Abre el sitio publicado en `stratalabai.com`.
3. **Configuración → Dominio** → desconéctalo del dominio (o despublica el
   sitio entero si no lo vas a usar).

Si lo dejas publicado y solo cambias el DNS, GoDaddy puede volver a reescribir
los registros y tumbarte la web sin avisar.

---

## 4. Apuntar el DNS sin romper el correo

Primero, en Vercel: **Settings → Domains → Add** `stratalabai.com`. Te dirá
exactamente qué registros crear. Después, en **GoDaddy → Mis productos →
stratalabai.com → DNS → Registros**:

| Tipo | Nombre | Valor | TTL |
| --- | --- | --- | --- |
| A | `@` | la IP que indique Vercel | 1 hora |
| CNAME | `www` | el destino que indique Vercel | 1 hora |

A día de hoy Vercel usa `76.76.21.21` para el registro A y
`cname.vercel-dns.com` para el CNAME, pero **manda siempre lo que diga su panel
el día que lo hagas**, no esta tabla.

**Qué borrar:** los registros `A` y `CNAME` de `@` y `www` que apuntan hoy al
constructor de GoDaddy. Nada más.

**Qué NO tocar bajo ningún concepto:** los registros **MX**, y los `TXT` de
SPF, DKIM y DMARC. Son los que hacen llegar el correo de
`gpalma@stratalabai.com`. Si el panel te avisa de que vas a sustituirlos,
cancela.

La propagación suele tardar entre 30 minutos y 2 horas. El certificado HTTPS lo
emite Vercel solo en cuanto resuelve.

---

## 5. Apex o www

El sitio está configurado para **`https://stratalabai.com`** (sin `www`), y así
lo declaran `site` en `astro.config.mjs`, `domain` en `src/data/site.ts` y
`public/robots.txt`.

En Vercel, marca `stratalabai.com` como dominio principal y deja que
`www.stratalabai.com` redirija a él (lo hace solo al añadir ambos). Si
prefieres `www` como principal, hay que cambiar esos tres sitios además de la
redirección: de ellos salen la URL canónica, los `hreflang` y la URL absoluta
de la imagen de Open Graph.

---

## 6. Comprobaciones después de conectar

- [ ] `https://stratalabai.com` carga **nuestra** web, no la de GoDaddy.
- [ ] `https://www.stratalabai.com` redirige al apex (301, no 302).
- [ ] `http://` redirige a `https://`.
- [ ] `https://stratalabai.com/en` carga la versión en inglés.
- [ ] `https://stratalabai.com/sitemap-index.xml` responde.
- [ ] **Envíate un correo a `gpalma@stratalabai.com` y comprueba que llega.**
      Es la verificación de que no rompiste los MX.
- [ ] Enviar una prueba en los dos formularios y confirmar que llegan.
- [ ] Compartir el enlace en WhatsApp o LinkedIn y ver que sale la tarjeta con
      la imagen (`/og.png`) y el título correctos.
- [ ] Dar de alta el dominio en Google Search Console y enviar el sitemap.

---

## 7. Notas

- **Correo.** `gpalma@stratalabai.com` está en todos los CTA de la web. Si más
  adelante creas `hola@` o `partners@`, cámbialo en `src/data/site.ts`.
- **Cabeceras.** Si quieres, añade `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`
  en `vercel.json`. El sitio no los necesita para funcionar, pero son gratis.
- **Caché.** Todo lo que hay bajo `/_astro/` lleva hash en el nombre y puede
  cachearse de forma indefinida e inmutable. El HTML, no. Vercel lo hace bien
  por defecto con Astro.
