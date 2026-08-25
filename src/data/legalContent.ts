/**
 * Textos de las páginas legales, en los dos idiomas.
 *
 * Redactados para la normativa española: LSSI-CE (Ley 34/2002) para el aviso
 * legal y el uso de cookies, RGPD (UE 2016/679) y LOPDGDD (LO 3/2018) para la
 * privacidad. Las secciones se renderizan en orden.
 *
 * No son un dictamen jurídico. Cubren lo que esta web hace hoy —dos
 * formularios, sin analítica, sin cookies de terceros—; si se añade
 * seguimiento, pasarela de pago o área de usuario, hay que revisarlos.
 */
import type { Locale } from './site';

export interface LegalSection {
  h: string;
  /** Párrafos. Se admite <strong>, <em> y <a>. */
  p?: string[];
  /** Lista de puntos. */
  ul?: string[];
  /** Tabla: cabeceras + filas. */
  table?: { head: string[]; rows: string[][] };
}

export interface LegalPage {
  slug: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalStrings {
  updated: string;
  backHome: string;
  /** Aviso cuando faltan los datos identificativos del titular. */
  incomplete: { h: string; p: string };
  nav: { legal: string; privacy: string; cookies: string };
  cookieBanner: {
    title: string;
    body: string;
    accept: string;
    reject: string;
    settings: string;
    more: string;
    /** Panel de preferencias */
    panelTitle: string;
    save: string;
    close: string;
    categories: Array<{ id: 'necesarias' | 'analiticas'; name: string; desc: string; locked?: boolean }>;
    /** Nota honesta: hoy no hay nada opcional que activar. */
    noneYet: string;
  };
}

// ---------------------------------------------------------------------------

export const legalStrings: Record<Locale, LegalStrings> = {
  es: {
    updated: 'Última actualización',
    backHome: '← Volver al inicio',
    incomplete: {
      h: 'Documento pendiente de completar',
      p: 'Faltan los datos identificativos del titular, obligatorios por el artículo 10 de la LSSI-CE. Rellénalos en <code>src/data/legal.ts</code> antes de publicar la web.',
    },
    nav: { legal: 'Aviso legal', privacy: 'Privacidad', cookies: 'Cookies' },
    cookieBanner: {
      title: 'Cookies',
      body: 'Usamos almacenamiento propio estrictamente necesario para que la web funcione y para recordar esta misma elección. No usamos cookies de analítica, publicidad ni seguimiento, ni cedemos datos a terceros con esos fines.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      settings: 'Configurar',
      more: 'Más información',
      panelTitle: 'Preferencias de cookies',
      save: 'Guardar preferencias',
      close: 'Cerrar',
      categories: [
        {
          id: 'necesarias',
          name: 'Estrictamente necesarias',
          desc: 'Imprescindibles para que la web funcione y para recordar tu decisión sobre este aviso. No requieren consentimiento y no se pueden desactivar.',
          locked: true,
        },
        {
          id: 'analiticas',
          name: 'Analíticas',
          desc: 'Nos permitirían medir de forma agregada cómo se usa la web. Hoy no hay ninguna instalada: si algún día la añadimos, no se activará sin tu consentimiento.',
        },
      ],
      noneYet: 'Ahora mismo esta web no instala ninguna cookie opcional.',
    },
  },
  en: {
    updated: 'Last updated',
    backHome: '← Back to home',
    incomplete: {
      h: 'Document pending completion',
      p: "The owner's identifying details are missing. They are required by article 10 of Spain's LSSI-CE. Fill them in at <code>src/data/legal.ts</code> before publishing.",
    },
    nav: { legal: 'Legal notice', privacy: 'Privacy', cookies: 'Cookies' },
    cookieBanner: {
      title: 'Cookies',
      body: 'We use strictly necessary first-party storage to make the site work and to remember this very choice. We use no analytics, advertising or tracking cookies, and we share no data with third parties for those purposes.',
      accept: 'Accept',
      reject: 'Reject',
      settings: 'Settings',
      more: 'More information',
      panelTitle: 'Cookie preferences',
      save: 'Save preferences',
      close: 'Close',
      categories: [
        {
          id: 'necesarias',
          name: 'Strictly necessary',
          desc: 'Essential for the site to work and to remember your decision about this notice. They need no consent and cannot be switched off.',
          locked: true,
        },
        {
          id: 'analiticas',
          name: 'Analytics',
          desc: 'These would let us measure in aggregate how the site is used. None are installed today: if we ever add them, they will not run without your consent.',
        },
      ],
      noneYet: 'Right now this site installs no optional cookies at all.',
    },
  },
};

// ---------------------------------------------------------------------------
// Las páginas se generan con los datos del titular ya interpolados.

interface Owner {
  nombre: string;
  idLabel: string;
  id: string;
  domicilio: string;
  registrales: string;
  email: string;
  telefono: string;
  dominio: string;
  actualizado: string;
  encargados: Array<{ nombre: string; finalidad: string; ubicacion: string; url: string }>;
}

export function legalPages(locale: Locale, o: Owner): LegalPage[] {
  return locale === 'es' ? paginasEs(o) : pagesEn(o);
}

const enc = (o: Owner) => ({
  head: ['Proveedor', 'Finalidad', 'Ubicación'],
  rows: o.encargados.map((e) => [`<a href="${e.url}" rel="noopener noreferrer" target="_blank">${e.nombre}</a>`, e.finalidad, e.ubicacion]),
});

function paginasEs(o: Owner): LegalPage[] {
  const identificacion = [
    `<strong>Titular:</strong> ${o.nombre}`,
    `<strong>${o.idLabel}:</strong> ${o.id}`,
    `<strong>Domicilio:</strong> ${o.domicilio}`,
    ...(o.registrales ? [`<strong>Datos registrales:</strong> ${o.registrales}`] : []),
    `<strong>Correo electrónico:</strong> <a href="mailto:${o.email}">${o.email}</a>`,
    ...(o.telefono ? [`<strong>Teléfono:</strong> ${o.telefono}`] : []),
    `<strong>Sitio web:</strong> ${o.dominio}`,
  ];

  return [
    {
      slug: 'aviso-legal',
      title: 'Aviso legal',
      intro: `Condiciones de uso del sitio web ${o.dominio}, conforme a la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).`,
      sections: [
        { h: '1. Datos identificativos', ul: identificacion },
        {
          h: '2. Objeto',
          p: [
            'Este aviso regula el acceso y uso del sitio web. La navegación por el sitio atribuye la condición de usuario e implica la aceptación plena de estas condiciones en la versión publicada en cada momento.',
            'El titular se reserva el derecho a modificar en cualquier momento la presentación, configuración y contenidos del sitio, así como estas condiciones.',
          ],
        },
        {
          h: '3. Estado del servicio',
          p: [
            '<strong>STRATA OS se encuentra en desarrollo y no está disponible para su contratación.</strong> Los precios que figuran en este sitio son tarifas de lanzamiento con carácter meramente informativo, no constituyen una oferta contractual y pueden modificarse hasta la fecha de lanzamiento.',
            'La suscripción a la lista de lanzamiento no genera derecho alguno de compra, ni obligación de prestación del servicio, ni reserva de plaza o de precio con carácter vinculante.',
            'Los servicios de STRATA Lab se prestan mediante presupuesto individualizado y contrato específico entre las partes.',
          ],
        },
        {
          h: '4. Condiciones de uso',
          p: ['El usuario se compromete a utilizar el sitio conforme a la ley, a este aviso legal, a la buena fe y al orden público. En particular, se obliga a abstenerse de:'],
          ul: [
            'Utilizar los contenidos con fines contrarios a la ley o lesivos de derechos de terceros.',
            'Introducir o difundir programas susceptibles de causar daños en los sistemas del titular o de terceros.',
            'Intentar acceder a áreas restringidas, o realizar acciones que puedan dañar, sobrecargar o impedir el normal funcionamiento del sitio.',
            'Reproducir, distribuir o transformar los contenidos sin autorización expresa del titular.',
          ],
        },
        {
          h: '5. Propiedad intelectual e industrial',
          p: [
            'Todos los contenidos del sitio —textos, fotografías, gráficos, imágenes, diseño, código fuente, marcas y nombres comerciales— son titularidad del titular o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial.',
            'Queda prohibida su reproducción, distribución, comunicación pública y transformación sin autorización expresa y por escrito.',
          ],
        },
        {
          h: '6. Exclusión de responsabilidad',
          p: [
            'El titular no garantiza la disponibilidad continuada del sitio ni la ausencia de errores en sus contenidos, si bien realizará los esfuerzos razonables para evitarlos y subsanarlos.',
            'Las estimaciones de resultados que figuran en el sitio son rangos orientativos del impacto que se persigue en un proyecto, no resultados medidos ni garantizados. El alcance concreto de cada proyecto se determina en el diagnóstico previo.',
            'El sitio puede contener enlaces a webs de terceros. El titular no se responsabiliza de sus contenidos ni de sus políticas de privacidad.',
          ],
        },
        {
          h: '7. Legislación aplicable y jurisdicción',
          p: [
            'Estas condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del titular, salvo que la normativa aplicable en materia de consumidores establezca otro fuero.',
          ],
        },
      ],
    },

    {
      slug: 'privacidad',
      title: 'Política de privacidad',
      intro: 'Cómo tratamos tus datos personales, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
      sections: [
        { h: '1. Responsable del tratamiento', ul: identificacion },
        {
          h: '2. Datos que tratamos y con qué finalidad',
          table: {
            head: ['Qué recogemos', 'Para qué', 'Base legal', 'Conservación'],
            rows: [
              [
                'Correo electrónico (formulario de lista de lanzamiento)',
                'Avisarte del lanzamiento de STRATA OS',
                'Tu consentimiento (art. 6.1.a RGPD)',
                'Hasta que te des de baja o hasta 2 años tras el lanzamiento',
              ],
              [
                'Nombre, correo, empresa y mensaje (formulario de contacto)',
                'Responder a tu solicitud y, en su caso, elaborar un presupuesto',
                'Tu consentimiento y medidas precontractuales (art. 6.1.a y 6.1.b RGPD)',
                'Durante la relación y, después, el plazo de prescripción de las acciones legales',
              ],
              [
                'Datos que nos envíes por correo electrónico',
                'Atender tu comunicación',
                'Tu consentimiento (art. 6.1.a RGPD)',
                'Mientras sea necesario para atenderla',
              ],
            ],
          },
        },
        {
          h: '3. Qué NO hacemos',
          ul: [
            'No vendemos ni cedemos tus datos a terceros con fines comerciales.',
            'No elaboramos perfiles ni tomamos decisiones automatizadas con efectos jurídicos sobre ti.',
            'No usamos cookies de analítica, publicidad ni seguimiento.',
            'No enviamos comunicaciones comerciales distintas de aquello para lo que te suscribiste.',
          ],
        },
        {
          h: '4. Destinatarios',
          p: ['Tus datos pueden ser tratados por los siguientes proveedores, que actúan como encargados del tratamiento con contrato firmado conforme al art. 28 RGPD:'],
          table: enc(o),
        },
        {
          h: '5. Transferencias internacionales',
          p: [
            'El alojamiento del sitio se presta desde una infraestructura que puede implicar tratamiento en Estados Unidos. Dicha transferencia se ampara en Cláusulas Contractuales Tipo aprobadas por la Comisión Europea y en la adhesión del proveedor al EU-US Data Privacy Framework.',
            'Las tipografías del sitio están alojadas en nuestro propio servidor, de forma que la navegación no transfiere tu dirección IP a proveedores de fuentes externos.',
          ],
        },
        {
          h: '6. Tus derechos',
          p: ['Puedes ejercer en cualquier momento los siguientes derechos escribiendo a <a href="mailto:' + o.email + '">' + o.email + '</a>, indicando el derecho que ejercitas y adjuntando copia de un documento identificativo:'],
          ul: [
            '<strong>Acceso:</strong> saber qué datos tuyos tratamos.',
            '<strong>Rectificación:</strong> corregir datos inexactos.',
            '<strong>Supresión:</strong> pedir que los eliminemos.',
            '<strong>Oposición:</strong> oponerte a un tratamiento concreto.',
            '<strong>Limitación:</strong> pedir que suspendamos el tratamiento.',
            '<strong>Portabilidad:</strong> recibir tus datos en formato estructurado.',
            '<strong>Retirar el consentimiento</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.',
          ],
        },
        {
          h: '7. Reclamación ante la autoridad de control',
          p: [
            'Si consideras que el tratamiento no se ajusta a la normativa, puedes reclamar ante la <strong>Agencia Española de Protección de Datos</strong> (C/ Jorge Juan 6, 28001 Madrid — <a href="https://www.aepd.es" rel="noopener noreferrer" target="_blank">www.aepd.es</a>).',
          ],
        },
        {
          h: '8. Seguridad',
          p: [
            'Aplicamos medidas técnicas y organizativas apropiadas al riesgo: cifrado en tránsito mediante HTTPS, acceso restringido a los datos y proveedores con garantías contractuales de seguridad.',
          ],
        },
        {
          h: '9. Menores',
          p: ['El sitio se dirige a profesionales y empresas. No está destinado a menores de 14 años y no recogemos conscientemente sus datos.'],
        },
      ],
    },

    {
      slug: 'cookies',
      title: 'Política de cookies',
      intro: 'Qué almacenamos en tu dispositivo y por qué, conforme al artículo 22.2 de la LSSI-CE y a la Guía de cookies de la AEPD.',
      sections: [
        {
          h: '1. Qué es una cookie',
          p: [
            'Una cookie es un pequeño fichero que un sitio web guarda en tu dispositivo. La normativa española equipara a las cookies otras tecnologías de almacenamiento local con la misma función, como <code>localStorage</code>, y por eso las tratamos aquí igual.',
          ],
        },
        {
          h: '2. Qué usa esta web',
          p: [
            'Esta web es un sitio estático. <strong>No instala cookies de analítica, de publicidad ni de seguimiento, y no incorpora píxeles ni scripts de terceros.</strong> Lo único que guarda es lo siguiente:',
          ],
          table: {
            head: ['Nombre', 'Tipo', 'Finalidad', 'Duración'],
            rows: [
              [
                '<code>strata_cookie_consent</code>',
                'Propia · técnica',
                'Recordar tu decisión sobre este aviso para no volver a mostrártelo',
                '1 año',
              ],
              [
                '<code>strata_lang</code>',
                'Propia · técnica',
                'Recordar el idioma que elegiste',
                'Persistente hasta que borres los datos del navegador',
              ],
            ],
          },
        },
        {
          h: '3. Por qué no te pedimos consentimiento para ellas',
          p: [
            'El artículo 22.2 de la LSSI-CE exime del consentimiento a las cookies estrictamente necesarias para prestar el servicio solicitado por el usuario. Las dos anteriores lo son: una recuerda tu propia decisión sobre las cookies y la otra el idioma que elegiste. Ninguna te identifica ni sigue tu actividad.',
            'Aun así, mostramos el aviso para que sepas exactamente qué se guarda.',
          ],
        },
        {
          h: '4. Analítica',
          p: [
            'Actualmente <strong>no utilizamos ninguna herramienta de analítica</strong>. Si en el futuro la incorporamos, se te pedirá consentimiento previo y no se cargará hasta que lo otorgues. Esta política se actualizará en consecuencia.',
          ],
        },
        {
          h: '5. Cómo gestionar o eliminar el almacenamiento',
          p: [
            'Puedes cambiar tu decisión en cualquier momento desde el enlace «Cookies» del pie de página, o borrar lo almacenado desde la configuración de tu navegador:',
          ],
          ul: [
            '<a href="https://support.google.com/chrome/answer/95647" rel="noopener noreferrer" target="_blank">Google Chrome</a>',
            '<a href="https://support.mozilla.org/es/kb/Borrar%20cookies" rel="noopener noreferrer" target="_blank">Mozilla Firefox</a>',
            '<a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" rel="noopener noreferrer" target="_blank">Safari</a>',
            '<a href="https://support.microsoft.com/es-es/microsoft-edge" rel="noopener noreferrer" target="_blank">Microsoft Edge</a>',
          ],
        },
        {
          h: '6. Servicios de terceros',
          p: [
            'El sitio se aloja en Vercel, que puede registrar datos técnicos de la conexión (dirección IP, agente de usuario) con fines de seguridad y funcionamiento del servicio, sin instalar cookies en tu navegador. Las tipografías se sirven desde nuestro propio dominio, por lo que no se realiza ninguna petición a Google Fonts.',
          ],
        },
      ],
    },
  ];
}

function pagesEn(o: Owner): LegalPage[] {
  const identification = [
    `<strong>Owner:</strong> ${o.nombre}`,
    `<strong>${o.idLabel}:</strong> ${o.id}`,
    `<strong>Address:</strong> ${o.domicilio}`,
    ...(o.registrales ? [`<strong>Registry details:</strong> ${o.registrales}`] : []),
    `<strong>Email:</strong> <a href="mailto:${o.email}">${o.email}</a>`,
    ...(o.telefono ? [`<strong>Phone:</strong> ${o.telefono}`] : []),
    `<strong>Website:</strong> ${o.dominio}`,
  ];

  return [
    {
      slug: 'aviso-legal',
      title: 'Legal notice',
      intro: `Terms of use for ${o.dominio}, under Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE).`,
      sections: [
        { h: '1. Owner details', ul: identification },
        {
          h: '2. Purpose',
          p: [
            'This notice governs access to and use of the website. Browsing the site makes you a user and implies full acceptance of these terms as published at any given time.',
            'The owner reserves the right to modify the presentation, configuration and contents of the site, as well as these terms, at any time.',
          ],
        },
        {
          h: '3. Service status',
          p: [
            '<strong>STRATA OS is under development and is not available for purchase.</strong> The prices shown on this site are launch rates provided for information only; they do not constitute a contractual offer and may change before launch.',
            'Joining the launch list creates no right of purchase, no obligation to provide the service, and no binding reservation of a place or a price.',
            'STRATA Lab services are provided under an individual quotation and a specific contract between the parties.',
          ],
        },
        {
          h: '4. Conditions of use',
          p: ['You agree to use the site in accordance with the law, this notice, good faith and public order. In particular, you agree not to:'],
          ul: [
            'Use the contents for unlawful purposes or in ways that harm third-party rights.',
            "Introduce or spread software capable of damaging the owner's or third parties' systems.",
            'Attempt to access restricted areas, or take actions that could damage, overload or disrupt the normal operation of the site.',
            'Reproduce, distribute or transform the contents without the express authorisation of the owner.',
          ],
        },
        {
          h: '5. Intellectual and industrial property',
          p: [
            'All contents of the site — text, photographs, graphics, images, design, source code, trade marks and trade names — belong to the owner or to third parties who have authorised their use, and are protected by intellectual and industrial property law.',
            'Their reproduction, distribution, public communication and transformation without express written authorisation is prohibited.',
          ],
        },
        {
          h: '6. Disclaimer',
          p: [
            'The owner does not guarantee continuous availability of the site or the absence of errors in its contents, but will make reasonable efforts to prevent and correct them.',
            'The outcome estimates shown on the site are indicative ranges for the impact targeted in a project, not measured or guaranteed results. The specific scope of each project is determined in the prior diagnosis.',
            'The site may contain links to third-party websites. The owner is not responsible for their contents or their privacy policies.',
          ],
        },
        {
          h: '7. Applicable law and jurisdiction',
          p: [
            "These terms are governed by Spanish law. For the resolution of any dispute, the parties submit to the courts of the owner's domicile, unless consumer protection law establishes a different venue.",
          ],
        },
      ],
    },

    {
      slug: 'privacidad',
      title: 'Privacy policy',
      intro: 'How we process your personal data, under Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).',
      sections: [
        { h: '1. Data controller', ul: identification },
        {
          h: '2. What we process and why',
          table: {
            head: ['What we collect', 'Why', 'Legal basis', 'Retention'],
            rows: [
              [
                'Email address (launch list form)',
                'To notify you of the STRATA OS launch',
                'Your consent (art. 6(1)(a) GDPR)',
                'Until you unsubscribe, or up to 2 years after launch',
              ],
              [
                'Name, email, company and message (contact form)',
                'To answer your enquiry and, where applicable, prepare a quotation',
                'Your consent and pre-contractual steps (art. 6(1)(a) and 6(1)(b) GDPR)',
                'For the duration of the relationship and thereafter the limitation period for legal claims',
              ],
              [
                'Data you send us by email',
                'To handle your communication',
                'Your consent (art. 6(1)(a) GDPR)',
                'For as long as needed to handle it',
              ],
            ],
          },
        },
        {
          h: '3. What we do NOT do',
          ul: [
            'We do not sell or transfer your data to third parties for commercial purposes.',
            'We do not build profiles or make automated decisions with legal effects on you.',
            'We use no analytics, advertising or tracking cookies.',
            'We send no marketing communications other than what you signed up for.',
          ],
        },
        {
          h: '4. Recipients',
          p: ['Your data may be processed by the following providers, acting as processors under a contract signed in accordance with art. 28 GDPR:'],
          table: { head: ['Provider', 'Purpose', 'Location'], rows: enc(o).rows },
        },
        {
          h: '5. International transfers',
          p: [
            'Site hosting is provided on infrastructure that may involve processing in the United States. That transfer relies on Standard Contractual Clauses approved by the European Commission and on the provider adhering to the EU-US Data Privacy Framework.',
            'The site\'s fonts are hosted on our own server, so browsing does not transfer your IP address to external font providers.',
          ],
        },
        {
          h: '6. Your rights',
          p: ['You may exercise the following rights at any time by writing to <a href="mailto:' + o.email + '">' + o.email + '</a>, stating the right you are exercising and attaching a copy of an identity document:'],
          ul: [
            '<strong>Access:</strong> know what data of yours we process.',
            '<strong>Rectification:</strong> correct inaccurate data.',
            '<strong>Erasure:</strong> ask us to delete it.',
            '<strong>Objection:</strong> object to a specific processing.',
            '<strong>Restriction:</strong> ask us to suspend processing.',
            '<strong>Portability:</strong> receive your data in a structured format.',
            '<strong>Withdraw consent</strong> at any time, without affecting the lawfulness of prior processing.',
          ],
        },
        {
          h: '7. Complaints to the supervisory authority',
          p: [
            'If you believe the processing does not comply with the law, you may lodge a complaint with the <strong>Spanish Data Protection Agency</strong> (C/ Jorge Juan 6, 28001 Madrid — <a href="https://www.aepd.es" rel="noopener noreferrer" target="_blank">www.aepd.es</a>).',
          ],
        },
        {
          h: '8. Security',
          p: [
            'We apply technical and organisational measures appropriate to the risk: encryption in transit via HTTPS, restricted access to data, and providers with contractual security guarantees.',
          ],
        },
        {
          h: '9. Minors',
          p: ['The site is aimed at professionals and businesses. It is not intended for children under 14 and we do not knowingly collect their data.'],
        },
      ],
    },

    {
      slug: 'cookies',
      title: 'Cookie policy',
      intro: "What we store on your device and why, under article 22(2) of Spain's LSSI-CE and the AEPD cookie guidelines.",
      sections: [
        {
          h: '1. What a cookie is',
          p: [
            'A cookie is a small file a website stores on your device. Spanish law treats other local storage technologies with the same function — such as <code>localStorage</code> — the same way, which is why we cover them here too.',
          ],
        },
        {
          h: '2. What this site uses',
          p: [
            'This is a static site. <strong>It installs no analytics, advertising or tracking cookies, and embeds no third-party pixels or scripts.</strong> All it stores is the following:',
          ],
          table: {
            head: ['Name', 'Type', 'Purpose', 'Duration'],
            rows: [
              [
                '<code>strata_cookie_consent</code>',
                'First-party · technical',
                'Remember your decision about this notice so we do not show it again',
                '1 year',
              ],
              [
                '<code>strata_lang</code>',
                'First-party · technical',
                'Remember the language you chose',
                'Persistent until you clear your browser data',
              ],
            ],
          },
        },
        {
          h: '3. Why we do not ask consent for these',
          p: [
            'Article 22(2) of the LSSI-CE exempts from consent those cookies strictly necessary to provide the service the user requested. Both of the above are: one remembers your own decision about cookies, the other the language you picked. Neither identifies you nor tracks your activity.',
            'Even so, we show the notice so you know exactly what is stored.',
          ],
        },
        {
          h: '4. Analytics',
          p: [
            'We currently <strong>use no analytics tool at all</strong>. If we add one in the future, you will be asked for prior consent and it will not load until you give it. This policy will be updated accordingly.',
          ],
        },
        {
          h: '5. How to manage or delete this storage',
          p: [
            'You can change your decision at any time from the "Cookies" link in the footer, or clear what is stored from your browser settings:',
          ],
          ul: [
            '<a href="https://support.google.com/chrome/answer/95647" rel="noopener noreferrer" target="_blank">Google Chrome</a>',
            '<a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" rel="noopener noreferrer" target="_blank">Mozilla Firefox</a>',
            '<a href="https://support.apple.com/guide/safari/sfri11471/mac" rel="noopener noreferrer" target="_blank">Safari</a>',
            '<a href="https://support.microsoft.com/microsoft-edge" rel="noopener noreferrer" target="_blank">Microsoft Edge</a>',
          ],
        },
        {
          h: '6. Third-party services',
          p: [
            'The site is hosted on Vercel, which may log technical connection data (IP address, user agent) for security and service operation purposes, without installing cookies in your browser. Fonts are served from our own domain, so no request is made to Google Fonts.',
          ],
        },
      ],
    },
  ];
}
