import type { Content } from './types';

/**
 * Spanish is the source copy — it is the language the design was written in.
 *
 * Where this differs from the design prototype, it is because the prototype
 * asserted things that are not true yet:
 *
 *  1. `stats` / `why.outcomes` — the prototype stated single measured figures
 *     (−30 %, ×2, 96 %, +300 h). They are now ranges framed as objectives and
 *     carry `why.outcomesNote` as a visible disclaimer.
 *  2. `waitlist` — replaces the prototype's "empieza tu empresa esta noche ·
 *     sin tarjeta · en minutos" band and its "2.369 empresas activadas en 24 h"
 *     counter. STRATA OS is not purchasable and cannot be self-served in
 *     minutes, so the section is now the launch list it should always have
 *     been. Its ticker lists what the agents do, not invented sign-ups.
 *  3. `pricing` — the tiers keep their figures as launch pricing but carry a
 *     "coming soon" chip and point at the waitlist instead of a checkout.
 *
 * STRATA Lab is the one thing on this page that can be bought today, so it
 * keeps a live price and a real enquiry form.
 */
export const es: Content = {
  meta: {
    title: 'STRATA — El sistema operativo autónomo de tu empresa',
    description:
      'Agentes de IA que operan tu negocio 24/7 y un solo panel desde el que los gobiernas. STRATA OS llega próximamente: apúntate al lanzamiento. Soluciones a medida disponibles hoy con STRATA Lab.',
    ogAlt: 'STRATA — compañía de IA aplicada',
  },

  nav: {
    links: [
      { href: '#producto', label: 'El OS' },
      { href: '#agentes', label: 'Agentes' },
      { href: '#motor', label: 'El motor' },
      { href: '#despliegue', label: 'Control' },
      { href: '#grupo', label: 'Casos reales' },
      { href: '#precios', label: 'Precios' },
      { href: '#lab', label: 'STRATA Lab' },
      { href: '#partners', label: 'Para quién' },
    ],
    cta: 'Hablemos →',
    skipToContent: 'Saltar al contenido',
    menuLabel: 'Abrir menú',
    closeMenuLabel: 'Cerrar menú',
  },

  hero: {
    kicker: 'El sistema operativo autónomo de tu empresa',
    title: ['La IA que opera', 'tu negocio.'],
    leadTop: 'La tecnología ejecuta. Las personas deciden.',
    leadPrefix: 'Convertimos la IA en',
    rotor: ['eficiencia.', 'producto.', 'ventaja.'],
    ctaPrimary: 'Apúntate al lanzamiento →',
    ctaSecondary: 'Ver STRATA Lab',
    statusChip: 'STRATA OS · próximo lanzamiento · lista abierta',
    devicesKicker: 'Un sistema · todos tus dispositivos',
    devicesTitle: 'Tu negocio, en el bolsillo y en el escritorio.',
    windowTitle: 'STRATA Business OS — NORDA',
    sectors: [
      'Distribución y logística',
      'Clínicas privadas',
      'Construcción',
      'Concesionarios',
      'Hoteles independientes',
      'Formación profesional',
    ],
  },

  stats: [
    { value: '3–6', unit: 'meses', caption: ['objetivo de retorno', 'de la inversión'] },
    { value: '+200–300', unit: 'h', caption: ['horas al mes que', 'buscamos liberar'], gold: true },
    { value: '~80', unit: '%', caption: ['del trabajo repetible', 'lo ejecuta la máquina'] },
    { value: '24/7', caption: ['tu negocio operando', 'sin descanso'] },
  ],

  waitlist: {
    kicker: 'Próximamente',
    title: ['STRATA OS llega pronto. ', 'Apúntate al lanzamiento.'],
    lead: 'Estamos terminando el producto con un grupo reducido de empresas. Déjanos tu email y serás de los primeros en entrar cuando abramos — sin compromiso y sin tarjeta.',
    reasons: [
      { value: 'Acceso', caption: ['anticipado: entras antes', 'que el resto del mercado'] },
      { value: 'Precio', caption: ['de lanzamiento,', 'bloqueado para ti'], gold: true },
      { value: '0 €', caption: ['apuntarte no cuesta', 'ni compromete a nada'] },
    ],
    ticker: [
      ['Marketing', 'crea contenido y nutre leads'],
      ['Ventas', 'cualifica leads y prepara presupuestos'],
      ['Atención', 'resuelve consultas y pedidos 24/7'],
      ['Legal', 'redacta contratos y controla vencimientos'],
      ['Finanzas', 'concilia cobros y proyecta tesorería'],
      ['Producto & Dev', 'prioriza el roadmap y cierra incidencias'],
      ['People', 'ordena incorporaciones, ausencias y turnos'],
      ['Ops', 'coordina rutas, pedidos y partes de obra'],
      ['Dirección', 'consolida el cuadro de mando del negocio'],
      ['Business OS', 'un solo panel para gobernarlo todo'],
      ['Supervisión humana', 'tú apruebas cada acción crítica'],
    ],
    form: {
      label: 'Tu email',
      placeholder: 'nombre@tuempresa.com',
      submit: 'Apúntame al lanzamiento →',
      sending: 'Enviando…',
      success: 'Estás dentro. Te avisamos en cuanto abramos el acceso.',
      error: 'No hemos podido apuntarte. Escríbenos a',
      consent: 'Solo te escribiremos sobre el lanzamiento de STRATA OS. Ni spam, ni cesión a terceros; te puedes borrar cuando quieras.',
      fallbackCta: 'Apúntate al lanzamiento →',
    },
  },

  pillars: {
    kicker: 'Dos formas de trabajar con STRATA',
    title: ['Un sistema operativo listo para usar — o algo ', 'hecho a tu medida.'],
    items: [
      {
        tag: 'Producto · autoservicio',
        name: 'STRATA OS',
        summary:
          'El sistema operativo autónomo de tu empresa. Contratas agentes de IA que trabajan 24/7 en cada departamento y los gobiernas desde un solo panel.',
        bullets: [
          'Departamentos enteros operando desde el día uno',
          'Se conecta con las herramientas que ya usas',
          'Empiezas por un área y añades las demás cuando toque',
          'En desarrollo — apúntate para entrar en el primer grupo',
        ],
        ctaLabel: 'Apúntate al lanzamiento →',
        ctaHref: '#lanzamiento',
        price: 'próximamente · desde {{cuota_desde}}',
      },
      {
        tag: 'Servicios · a medida',
        name: 'STRATA Lab',
        summary:
          'Cuando necesitas algo único: diseñamos, construimos y operamos soluciones de IA a medida para tu empresa, de la venta al cierre.',
        bullets: [
          'Diagnóstico de toda tu operación con ROI',
          'Agentes y sistemas construidos para tu caso',
          'Diagnóstico → implementación → mantenimiento',
          'Disponible hoy: empezamos cuando quieras',
        ],
        ctaLabel: 'Ver STRATA Lab →',
        ctaHref: '#lab',
        price: 'disponible hoy · proyecto a medida',
      },
    ],
  },

  why: {
    kicker: 'Por qué STRATA',
    title: ['La IA que se paga sola. ', 'Y se nota en la caja.'],
    lead: 'No vendemos tecnología: vendemos horas recuperadas, margen que no se escapa y decisiones con el dato delante. Esto es lo que cambia en tu negocio.',
    bento: {
      team: {
        title: 'Un agente, o un equipo entero.',
        body: 'Un agente general lleva el día a día. Añades especialistas en ventas, operaciones o finanzas — cada uno con su propia experiencia y memoria.',
        channel: '#lanzamiento-producto',
        agentCount: '4 agentes',
        rows: [
          { initial: 'V', name: 'Agente de Ventas', detail: '3 leads cualificados hoy · visita agendada' },
          { initial: 'O', name: 'Agente de Ops', detail: 'Pedido #4811 en ruta · a tiempo' },
          { initial: 'F', name: 'Agente de Finanzas', detail: '12 facturas conciliadas · margen 18,4%' },
        ],
      },
      integrations: {
        title: 'Conecta una vez. Automatiza todo.',
        body: 'CRM, email, WhatsApp, ERP, banco y +50 herramientas — conexión en un clic. Sin proyectos de integración ni desarrolladores.',
        more: '+50',
      },
      data: {
        title: 'Tus datos. Tu control.',
        body: 'Ejecución supervisada: tú apruebas cada acción crítica. Soberanía de datos con residencia europea y aislamiento por cliente.',
      },
      platform: {
        title: 'Una plataforma. Ventas, operaciones y finanzas.',
        body: 'Todo bajo un mismo panel: elige el agente, actívalo y olvídate. El impacto de cada área, siempre a la vista.',
        tiles: [
          { label: 'Ventas', value: '1.284', pct: 82 },
          { label: 'Horas ahorradas', value: '312 h', pct: 64 },
          { label: 'Ahorro/mes', value: '€14,2k', pct: 71 },
        ],
      },
    },
    outcomesKicker: 'Lo que notas en la cuenta de resultados',
    outcomesTitle: 'Los resultados que perseguimos en tu negocio — y que medimos contigo.',
    outcomes: [
      {
        icon: 'users',
        value: '−20–30',
        suffix: '%',
        title: 'Menos coste de personal',
        detail: 'La IA absorbe el trabajo repetitivo; creces sin ampliar plantilla al mismo ritmo.',
      },
      {
        icon: 'calendar-check',
        value: '0',
        suffix: 'bajas que paran',
        title: 'Sin ausencias ni cuellos de botella',
        detail: 'Los agentes no se ponen malos ni se van de vacaciones: la operación no se detiene.',
      },
      {
        icon: 'message',
        value: '+30–40',
        suffix: '%',
        title: 'Más reuniones cerradas',
        detail: 'Ningún lead se enfría: seguimiento inmediato y constante hasta agendar la visita.',
      },
      {
        icon: 'trend',
        value: 'hasta ×2',
        title: 'Más conversión en la web',
        detail: 'Respuesta al instante 24/7: el visitante que pregunta a medianoche también se convierte.',
      },
      {
        icon: 'headset',
        value: '<1',
        suffix: 'min',
        title: 'Mejor atención al cliente',
        detail: 'Respuestas en segundos y sin colas — más satisfacción, más recompra y más recomendación.',
      },
      {
        icon: 'euro',
        value: '−80–90',
        suffix: '%',
        title: 'Menos errores en finanzas',
        detail: 'Conciliación y facturación automáticas: se acaban los descuadres y los cobros olvidados.',
      },
      {
        icon: 'wallet',
        value: '+10–18',
        suffix: '%',
        title: 'Más margen y control de coste',
        detail: 'Ves la desviación de cada proyecto en tiempo real y la corriges antes de que se coma el beneficio.',
      },
      {
        icon: 'clock',
        value: '+200–300',
        suffix: 'h',
        title: 'Horas recuperadas al mes',
        detail: 'Tu equipo deja las tareas mecánicas y dedica el tiempo a lo que de verdad hace crecer el negocio.',
      },
    ],
    outcomesNote:
      'Rangos orientativos del impacto que perseguimos en una implementación STRATA, no resultados medidos de clientes. El diagnóstico estima el rango concreto de tu negocio —y cómo lo mediremos— antes de que te comprometas a nada.',
    ctaLabel: 'Diagnóstico en 3 semanas →',
    ctaNote:
      'Te decimos dónde la IA crea valor en tu negocio — con ROI estimado, antes de comprometerte a nada.',
  },

  agents: {
    kicker: 'Tus departamentos, operando solos',
    title: ['No vendemos software. Vendemos el ', 'resultado, ya hecho.'],
    lead: 'Service-as-a-software: no contratas un agente suelto, contratas un departamento entero. Dentro de cada uno trabaja un equipo de agentes especializados que se reparten el trabajo del área y entregan el servicio completo. El de ventas vende, el de atención atiende, el de finanzas cobra. Pagas por el trabajo terminado — ahí está el negocio.',
    items: [
      {
        icon: 'send',
        name: 'Marketing',
        status: 'Departamento',
        description:
          'El servicio de captación: crea contenido, nutre leads y publica en tus canales con el tono de tu marca.',
        tags: ['RRSS', 'Email', 'CMS'],
      },
      {
        icon: 'chart',
        name: 'Ventas',
        status: 'Departamento',
        description:
          'El servicio de vender: cualifica leads, prepara presupuestos y hace el seguimiento hasta el cierre.',
        tags: ['CRM', 'Email', 'WhatsApp'],
      },
      {
        icon: 'headset',
        name: 'Atención',
        status: 'Departamento',
        description:
          'El servicio de soporte: responde consultas, gestiona pedidos y resuelve incidencias 24/7. Solo lo excepcional llega a una persona.',
        tags: ['Chat', 'Email', 'Tickets'],
      },
      {
        icon: 'shield',
        name: 'Legal',
        status: 'Departamento',
        description:
          'El servicio jurídico del día a día: redacta y revisa contratos, controla vencimientos y vigila que los procesos cumplan.',
        tags: ['Contratos', 'Firma', 'Vencimientos'],
      },
      {
        icon: 'euro',
        name: 'Finanzas',
        status: 'Departamento',
        description:
          'El servicio financiero: factura, concilia cobros y proyecta la tesorería. El margen real, siempre a la vista.',
        tags: ['Contabilidad', 'Banco', 'Excel'],
      },
      {
        icon: 'bolt',
        name: 'Producto & Dev',
        status: 'Departamento',
        description:
          'El servicio técnico: recoge peticiones, prioriza el roadmap y sigue las incidencias hasta que se cierran.',
        tags: ['Roadmap', 'Repos', 'Incidencias'],
      },
      {
        icon: 'people',
        name: 'People',
        status: 'Departamento',
        description:
          'El servicio de personas: ordena la incorporación de cada nueva persona y lleva ausencias, turnos y documentación.',
        tags: ['Onboarding', 'Ausencias', 'Turnos'],
      },
      {
        icon: 'layers',
        name: 'Ops',
        status: 'Departamento',
        description:
          'El servicio operativo: coordina pedidos, rutas y partes de obra; detecta cuellos de botella y avisa antes de que sean un problema.',
        tags: ['ERP', 'Calendario', 'Rutas'],
      },
      {
        icon: 'node',
        name: 'Dirección',
        status: 'Departamento',
        description:
          'La capa de gobierno: consolida lo que hace cada área en un cuadro de mando y te pone delante las decisiones que esperan por ti.',
        tags: ['KPIs', 'Informes', 'Aprobaciones'],
      },
    ],
    feedTitle: 'Ejemplo de actividad de una jornada',
    feedLive: '● Demo',
    feedDone: 'Hecho',
    /*
     * Cada línea se etiqueta «Departamento · agente», porque dentro de un
     * departamento no trabaja una sola pieza: el que hace presupuestos no es
     * el que cualifica leads. Es lo que justifica que la unidad de venta sea
     * el área y no el agente suelto.
     */
    feedLines: [
      { agent: 'Ventas · Presupuestos', text: 'Presupuesto #2041 enviado al cliente' },
      { agent: 'Atención · Pedidos', text: 'Ticket de pedido resuelto en 40s' },
      { agent: 'Finanzas · Conciliación', text: '12 facturas conciliadas' },
      { agent: 'Ops · Rutas', text: 'Ruta de entrega optimizada' },
      { agent: 'Marketing · Contenido', text: '3 publicaciones lanzadas en RRSS' },
      { agent: 'Legal · Contratos', text: 'Contrato generado y enviado a firma' },
      { agent: 'Ventas · Cualificación', text: 'Lead cualificado y visita agendada' },
      { agent: 'People · Onboarding', text: 'Alta de nueva incorporación completada' },
      { agent: 'Producto & Dev · Incidencias', text: 'Incidencia #318 cerrada y desplegada' },
      { agent: 'Atención · Consultas', text: 'FAQ respondida y caso cerrado' },
      { agent: 'Ops · Stock', text: 'Alerta de stock enviada al dueño' },
      { agent: 'Dirección · Decisiones', text: '2 aprobaciones esperando tu decisión' },
    ],
    ctaLabel: 'Ver planes de lanzamiento →',
    ctaNote: 'Estos departamentos forman parte de STRATA OS, que abrimos próximamente. ¿Necesitas un agente a medida ya? Lo construimos en ',
    ctaNoteLink: 'STRATA Lab',
    ctaNoteAfter: '.',
  },

  product: {
    kicker: 'El producto',
    title: ['Un panel que el dueño abre ', 'cada mañana.'],
    lead: 'El Business OS es el panel desde el que se gobierna toda la IA de la empresa. En el centro está Jarvis, el núcleo al que le preguntas por voz o por texto; alrededor, las vistas desde las que ves lo que pasa y decides.',
    vistas: [
      {
        n: '01',
        title: 'Puesta en marcha',
        summary: 'El arranque: conectas tus herramientas, cargas el conocimiento de tu empresa y dejas operando los primeros departamentos.',
      },
      {
        n: '02',
        title: 'Mi día',
        summary: 'Lo que te toca hoy y nada más: qué ha pasado desde ayer y qué tienes delante ahora.',
      },
      {
        n: '03',
        title: 'Bandeja',
        summary: 'Lo que espera tu decisión. El trabajo rutinario no aparece aquí; solo llega lo que necesita que alguien diga que sí.',
      },
      {
        n: '04',
        title: 'Overview',
        summary: 'El cockpit del negocio: objetivos, ingresos, agentes activos y —si tienes varias empresas— todas de un vistazo.',
      },
      {
        n: '05',
        title: 'En vivo',
        summary: 'Lo que está ocurriendo ahora mismo, según ocurre.',
      },
      {
        n: '06',
        title: 'Trabajo',
        summary: 'El trabajo en curso, por departamento y con su estado.',
      },
      {
        n: '07',
        title: 'Chat agentes',
        summary: 'Hablas con los agentes directamente, sin abrir una herramienta distinta para cada cosa.',
      },
      {
        n: '08',
        title: 'Contrata tu equipo',
        summary: 'Das de alta un agente como quien contrata a alguien: eliges el puesto y entra a trabajar.',
      },
      {
        n: '09',
        title: 'Loop evolutivo',
        summary: 'El sistema revisa cómo lo está haciendo y propone sus propias mejoras, para que apruebes o descartes.',
      },
    ],
    shotsLabel: 'Capturas reales del sistema, no maquetas',
    shots: [
      {
        image: 'os-dia.png',
        alt: 'Sección «Empieza aquí» del Business OS, con seis acciones propuestas: cerrar el mes contable, reclamar cobros, encontrar leads, publicar en redes, comparar presupuestos y vigilar a la competencia',
        title: 'Lo que te propone al abrirlo',
        caption: 'Cierra el mes contable, reclama los cobros pendientes, busca 50 leads que encajen con tu cliente ideal. Un clic y tu equipo se pone a ello.',
      },
      {
        image: 'os-equipo.png',
        alt: 'Pantalla «Contrata tu equipo» del Business OS, con las fichas de los agentes de Marketing y el contador de 132 en plantilla',
        title: 'Contratas agentes como se contrata gente',
        caption: 'Cada uno con su puesto, lo que entrega, las cuentas que necesita y para qué no debes pedirle ayuda. Contratas los que hagan falta y despides al resto.',
      },
      {
        image: 'os-depto.png',
        alt: 'Mapa del departamento de Marketing & Growth en el Business OS, con quince funciones —calendario, mensajes, fábrica de contenido, redes, marca, web, SEO, email, paid, conversión, lanzamientos, creadores, PR, retail y analítica— y el trabajo pendiente en cada una',
        title: 'Y por dentro, un departamento entero',
        caption: 'Marketing & Growth no es «un agente de marketing»: son quince funciones con su propio trabajo pendiente, de la fábrica de contenido al SEO y la conversión.',
      },
      {
        image: 'os-aprobar.png',
        alt: 'Cola de aprobaciones por departamento en el Business OS, con Marketing, Ventas y Finanzas esperando revisión',
        title: 'Y nada sale sin que tú lo apruebes',
        caption: 'Los agentes trabajan y dejan lo terminado en la cola de su departamento. Tú revisas, apruebas o descartas — y solo entonces sale.',
      },
    ],
  },
  how: {
    kicker: 'Cómo funciona',
    title: ['Jarvis decide. ', 'Los agentes ejecutan. Tú apruebas.'],
    columns: [
      [
        { title: 'La empresa', summary: 'emails · llamadas · leads · pedidos' },
        { title: 'El dueño', summary: 'voz o texto · “pregúntale al sistema”' },
      ],
      [{ title: 'Jarvis · el núcleo', summary: 'clasifica la intención · elige departamento, agente y modelo', hot: true }],
      [
        { title: 'Jefes de departamento', summary: 'un C-level por área: prioriza y revisa a los suyos', hot: true },
        { title: 'Marketing · Ventas · Atención', summary: 'contenido · leads · tickets' },
        { title: 'Ops · Finanzas · Legal', summary: 'pedidos · cobros · contratos' },
        { title: 'People · Producto & Dev · Dirección', summary: 'equipo · roadmap · decisiones' },
      ],
      [
        { title: 'Agente auditor', summary: 'revisa el trabajo antes de que llegue a ti' },
        { title: 'Tu aprobación', summary: 'lo crítico espera tu visto bueno', hot: true },
        { title: 'Loop evolutivo', summary: 'mide lo que salió mal y propone el ajuste' },
        { title: 'Memoria privada', summary: 'los datos de la empresa · solo suyos' },
      ],
    ],
    closing: 'No es un diagrama de marketing: este sistema ya opera ',
    closingStrong: 'nuestro propio negocio',
    closingAfter: ', 24/7, con nuestros propios departamentos operando dentro. Somos el primer cliente de nuestro producto.',
  },

  engine: {
    kicker: 'El motor',
    title: ['No dependemos de un solo modelo. ', 'Usamos el que gana en cada tarea.'],
    lead: 'No hay un modelo bueno para todo. El que mejor razona no es el que mejor busca en tu documentación, ni el más barato para clasificar mil correos. Para cada tarea elegimos entre los modelos disponibles el que da mejor resultado al coste que toca — y esa elección se cambia sin tocar tus agentes.',
    layers: [
      {
        icon: 'bolt',
        job: 'Razonar y escribir',
        who: 'Claude · Anthropic',
        detail: 'El motor de Jarvis y de los agentes: entiende lo que pides, decide qué departamento lo resuelve y redacta el resultado.',
      },
      {
        icon: 'layers',
        job: 'Memoria semántica',
        who: 'Embeddings · OpenAI',
        detail: 'El cerebro que busca dentro del conocimiento de tu empresa. Encuentra el contrato, el precio o la conversación aunque no recuerdes cómo se llamaba.',
      },
      {
        icon: 'headset',
        job: 'Voz',
        who: 'ElevenLabs',
        detail: 'Jarvis escucha y contesta hablando. Puedes pedirle cosas conduciendo y recibir el resumen del día sin mirar la pantalla.',
      },
      {
        icon: 'doc',
        job: 'Imagen y documento',
        who: 'Multimodal',
        detail: 'Adjuntas la foto de un albarán, una captura o un PDF y el agente trabaja sobre eso. No todo el trabajo de una empresa es texto.',
      },
    ],
    swapKicker: 'Y lo importante',
    swapNote: 'Lo relevante no es qué modelo usamos hoy, sino que no dependamos de ninguno. Sale uno mejor cada pocos meses; cuando pasa, se cambia en el enrutado y tus agentes, tus procesos y tu conocimiento siguen intactos. Un competidor atado a un solo proveedor tiene que esperar a que su proveedor mejore.',
  },

  rollout: {
    kicker: 'Puesta en marcha y control',
    title: ['Se instala en seis pasos. ', 'Y no hace nada sin tu permiso.'],
    lead: 'La pregunta que importa no es cómo entra el sistema en tu empresa, sino quién manda una vez está dentro. Mandas tú, y estos son los frenos.',
    steps: [
      {
        title: 'Elige dónde vive',
        detail: 'El Business OS corre en tu servidor o en el nuestro, y lo eliges tú. Si lo quieres en casa, tus datos no salen de casa para que el sistema funcione.',
      },
      {
        title: 'Decide qué permisos das',
        detail: 'Tres niveles por agente: que solo proponga, que ejecute pidiéndote permiso, o que actúe solo. Empiezas por el primero y sueltas cuerda cuando te fías.',
      },
      {
        title: 'Conecta tus modelos',
        detail: 'Pones tus propias claves de API. Pagas el consumo directamente al proveedor, ves lo que gastas y cambias de modelo cuando quieras.',
      },
      {
        title: 'Conecta tu stack',
        detail: 'CRM, ERP, banco, correo, redes, tienda. Cada cuenta que enchufas le da a tus agentes el contexto real del negocio en vez de suposiciones.',
      },
      {
        title: 'Cuéntanos tu negocio',
        detail: 'Unas cuantas preguntas rápidas. Con eso el sistema sabe quién eres, qué vendes, a quién y con qué tono.',
      },
      {
        title: 'Genera tu Business OS',
        detail: 'Con tu contexto y tus conexiones, el cerebro produce tu diagnóstico, tu plan de mejora y puebla tu panel con los departamentos que te tocan.',
      },
    ],
    stackLabel: 'Algunas de las cuentas que se conectan',
    controlKicker: 'Dónde está el freno',
    controls: [
      {
        icon: 'check',
        title: 'Aprobaciones',
        detail: 'Nada crítico sale sin tu visto bueno. Cada departamento tiene su propia cola: revisas, apruebas o descartas.',
      },
      {
        icon: 'wallet',
        title: 'Tope de gasto',
        detail: 'Un límite de consumo diario que fijas tú. El sistema se para antes de pasarse, no después de la factura.',
      },
      {
        icon: 'shield',
        title: 'Trazabilidad',
        detail: 'Cada acción queda registrada: qué agente, cuándo, con qué datos y qué produjo. Nada ocurre sin dejar rastro.',
      },
      {
        icon: 'trend',
        title: 'Loop evolutivo',
        detail: 'El sistema audita su propio rendimiento y te propone qué afinar. Propone: aplicar o no lo decides tú.',
      },
    ],
  },

  useCases: {
    kicker: 'Casos de uso',
    title: ['Pensado para cada ', 'reto de tu negocio.'],
    youLabel: 'TÚ',
    aiLabel: 'IA',
    items: [
      {
        tab: 'Vender más',
        title: 'Cierra más, persiguiendo menos',
        description:
          'El agente cualifica cada lead, prepara el presupuesto y hace el seguimiento hasta el cierre. Tu equipo solo entra a cerrar.',
        you: 'entra un lead',
        ai: 'cualifica · presupuesta · hace seguimiento',
        caption: 'Agente de Ventas · demo',
        rows: [
          { title: 'Lead €120k cualificado', sub: 'fuente: web · intención alta', state: 'hecho', icon: 'check' },
          { title: 'Presupuesto #2041 enviado', sub: 'plantilla + precios al día', state: 'hecho', icon: 'check' },
          { title: 'Seguimiento programado', sub: 'recordatorio en 3 días', state: 'activo', icon: 'plus' },
        ],
      },
      {
        tab: 'Atender 24/7',
        title: 'Atención que no duerme',
        description:
          'Responde consultas, gestiona pedidos y resuelve incidencias 24/7. Solo lo excepcional llega a una persona.',
        you: 'llega una consulta',
        ai: 'responde · gestiona · escala solo lo raro',
        caption: 'Agente de Atención · demo',
        rows: [
          { title: 'Consulta resuelta en 40s', sub: 'pedido #4811 · estado enviado', state: 'hecho', icon: 'check' },
          { title: 'Devolución gestionada', sub: 'política aplicada sola', state: 'hecho', icon: 'check' },
          { title: 'Caso escalado a humano', sub: 'condición especial de pago', state: 'revisar', icon: 'plus' },
        ],
      },
      {
        tab: 'Operar sin fricción',
        title: 'Operaciones sin cuellos de botella',
        description:
          'Coordina pedidos, rutas y partes de obra; detecta cuellos de botella y avisa antes de que sean un problema.',
        you: 'entra un pedido',
        ai: 'planifica · coordina · alerta',
        caption: 'Agente de Ops · demo',
        rows: [
          { title: 'Ruta de entrega optimizada', sub: '3 paradas · -22% km', state: 'hecho', icon: 'check' },
          { title: 'Parte de obra actualizado', sub: 'fase 4 · montaje', state: 'hecho', icon: 'check' },
          { title: 'Alerta de stock enviada', sub: 'reponer antes del viernes', state: 'aviso', icon: 'plus' },
        ],
      },
      {
        tab: 'Controlar las finanzas',
        title: 'Las finanzas, siempre al día',
        description:
          'Factura, concilia cobros y proyecta la tesorería. El margen real de cada proyecto, siempre a la vista.',
        you: 'llega una factura',
        ai: 'concilia · proyecta · avisa',
        caption: 'Agente de Finanzas · demo',
        rows: [
          { title: '12 facturas conciliadas', sub: 'cuadre automático con banco', state: 'hecho', icon: 'check' },
          { title: 'Tesorería proyectada 60d', sub: '€1,24M previstos', state: 'hecho', icon: 'check' },
          { title: 'Cobro pendiente detectado', sub: 'fase 2 · +12 días', state: 'aviso', icon: 'plus' },
        ],
      },
      {
        tab: 'Crecer en marketing',
        title: 'Marketing en piloto automático',
        description:
          'Crea contenido, nutre leads y publica en tus canales con el tono de tu marca. Publicas una vez, el agente hace el resto.',
        you: 'publicas una vez',
        ai: 'programa · engagement · analítica',
        caption: 'Agente de Marketing · demo',
        rows: [
          { title: '3 publicaciones lanzadas', sub: 'LinkedIn · Instagram · X', state: 'hecho', icon: 'check' },
          { title: 'Leads nutridos', sub: 'secuencia de 4 emails', state: 'hecho', icon: 'check' },
          { title: 'Informe de resultados', sub: 'CTR de la semana', state: 'activo', icon: 'plus' },
        ],
      },
    ],
  },

  pricing: {
    kicker: 'Precios · STRATA OS',
    title: ['Contratas departamentos, ', 'no licencias.'],
    lead: 'La unidad no es el agente suelto: es el departamento. Cada uno es un equipo de agentes que entrega el servicio completo de su área. El Business OS va incluido —es donde tu plantilla digital trabaja, no un extra que se factura aparte.',
    comingSoonLabel: 'Próximamente',
    availabilityNote:
      'STRATA OS todavía no está a la venta: estas son las tarifas de lanzamiento y aún no se pueden contratar. Apúntate a la lista y te avisamos en cuanto abramos —quienes estén dentro entran con este precio. Si necesitas algo a medida ahora mismo, STRATA Lab sí está disponible hoy.',
    setupLabel: 'Implantación · pago único',
    tiers: [
      {
        name: 'Un departamento',
        planKey: 'un_departamento',
        setup: 'desde 9.500 €',
        price: '1.490 €',
        period: '/mes',
        meta: 'El área que más te duela, operando entera',
        features: [
          'El departamento que elijas, de los nueve disponibles',
          'Todos los agentes de ese departamento, no uno suelto',
          'Business OS incluido: panel, supervisión y trazabilidad de cada acción',
          'Integración con las herramientas que ya usas',
          'Soporte por email y revisión mensual de resultados',
        ],
        comingSoon: true,
        ctaLabel: 'Apúntate al lanzamiento',
        ctaHref: '#lanzamiento',
      },
      {
        name: 'Tres departamentos',
        planKey: 'tres_departamentos',
        setup: 'desde 18.000 €',
        price: '2.900 €',
        period: '/mes',
        meta: 'Las áreas se coordinan entre sí y el sistema empieza a componer',
        badge: 'El más elegido',
        highlight: true,
        features: [
          'Tres departamentos a elegir, con todos sus agentes',
          'Trabajo encadenado entre áreas: ventas pasa a operaciones, y operaciones a finanzas, sin que nadie reescriba nada',
          'Business OS incluido, con reporte del valor generado',
          'Integraciones a medida sobre tu ERP y tu CRM',
          'Soporte prioritario y ajuste continuo del sistema',
        ],
        comingSoon: true,
        ctaLabel: 'Apúntate al lanzamiento →',
        ctaHref: '#lanzamiento',
      },
      {
        name: 'Empresa completa',
        planKey: 'empresa_completa',
        setup: 'según alcance',
        price: 'A medida',
        meta: 'Los nueve departamentos, más lo que solo existe en tu empresa',
        features: [
          'Los nueve departamentos operando de forma coordinada',
          'Agentes propios construidos para tus procesos únicos, en STRATA Lab',
          'VPC dedicado · residencia de datos en la UE · SLA',
          'Diagnóstico → implementación → operación continua',
          'Un responsable de STRATA asignado a tu cuenta',
          'Disponible hoy: el precio se cierra tras el diagnóstico, no antes',
        ],
        ctaLabel: 'Ver STRATA Lab →',
        ctaHref: '#lab',
      },
    ],
    billingKicker: 'Cómo se factura',
    billingNote:
      'La implantación es un pago único: conectar tus sistemas, cargar el conocimiento de tu empresa y dejar los agentes operando de verdad. La cuota mensual cubre que sigan funcionando, la supervisión y las mejoras. Añadir un departamento después tiene su propia implantación y ajusta la cuota. Sin permanencia una vez desplegado. Precios sin IVA y sujetos a ajuste hasta el lanzamiento.',
  },

  permisos: {
    kicker: 'Permisos y control',
    title: ['Arranca cerrado. ', 'Lo abres tú, gesto a gesto.'],
    lead: 'La primera pantalla decide si un dueño sigue o desinstala. Por eso el sistema no pide un solo permiso al instalarse: pide cada cosa cuando hace falta y explicando para qué.',

    principleKicker: 'El principio',
    principleTitle: 'Nadie decide permisos el día uno',
    principleBody:
      'Pedirlo todo el primer día es el mayor motivo de abandono en este tipo de software. El dueño todavía no sabe qué necesita cada agente, así que concede de más por inercia o de menos por miedo, y en los dos casos acaba mal. Preguntar en contexto —cuando un agente concreto necesita algo concreto para una tarea que acabas de pedir— convierte cada permiso en una decisión fácil.',

    doorsKicker: 'Tres puertas que se abren a la vez',
    doorsNote:
      'No es una escala, es una conjunción: un agente sólo puede hacer algo si las tres lo permiten, y manda siempre la más restrictiva.',
    doors: [
      {
        icon: 'layers',
        n: '01',
        name: 'La casa',
        question: '«¿Dónde acaban mis datos, y quién puede entrar?»',
        detail:
          'Es la primera pregunta de cualquier revisión de protección de datos, y la que decide si se firma. No tenemos una respuesta única porque no debería haberla: la eliges tú.',
        levels: [
          {
            label: 'En nuestro servidor',
            body: 'Infraestructura en la Unión Europea, aislada por cliente. Entras con tu correo corporativo, y quien no esté en la lista ni siquiera ve que exista.',
          },
          {
            label: 'En el tuyo',
            body: 'El mismo sistema desplegado en tu casa. Tus datos no salen, y el único tercero que ve algo es el proveedor del modelo — con tus claves.',
            open: true,
          },
        ],
      },
      {
        icon: 'node',
        n: '02',
        name: 'Las cuentas',
        question: '«¿Puede leer todo mi correo, o sólo escribir borradores?»',
        detail:
          'Cada cuenta se conecta con el permiso mínimo que necesita el trabajo, y cuando hace falta. Retirarla es un clic y surte efecto en el momento.',
        levels: [
          {
            label: 'Sólo lectura',
            body: 'Consulta y usa la información como contexto, pero no modifica nada: lee tus correos y redacta borradores. No envía.',
          },
          {
            label: 'Lectura y escritura',
            body: 'Crea y modifica. Lo que sale al mundo sigue esperando tu visto bueno aunque ese agente tenga cuerda larga.',
            open: true,
          },
        ],
      },
      {
        icon: 'bolt',
        n: '03',
        name: 'El agente',
        question: '«¿Esto va a hacer cosas sin que yo me entere?»',
        detail:
          'Tres niveles por agente, no por sistema. Con una plantilla de más de cien, un único interruptor de «modo autónomo» no es control: es una apuesta.',
        levels: [
          {
            label: 'Propone',
            body: 'Prepara el trabajo y lo deja en la cola de su departamento. Todos los agentes nacen aquí.',
          },
          {
            label: 'Ejecuta con permiso',
            body: 'Hace el trabajo de verdad y espera tu visto bueno antes de que salga.',
          },
          {
            label: 'Actúa solo',
            body: 'Ejecuta y te lo cuenta en el parte del día. Para lo repetitivo y reversible: clasificar, etiquetar, conciliar, resumir.',
            open: true,
          },
        ],
      },
    ],

    vetoKicker: 'Y por encima de las tres',
    vetoTitle: 'La lista roja',
    vetoBody:
      'Hay acciones que no se ejecutan solas nunca, tenga el agente el nivel que tenga y estén abiertas las tres puertas. El veto atraviesa los tres planos y no se desactiva.',
    vetoItems: [
      'Mover dinero o iniciar un pago',
      'Escribir a más de un puñado de destinatarios externos',
      'Publicar en abierto: web, redes, tienda',
      'Firmar o aceptar un contrato',
      'Borrar datos',
      'Cambiar precios o condiciones comerciales',
      'Dar permisos a otro agente',
    ],

    dayOneKicker: 'El día uno',
    dayOneTitle: 'Lo importante es lo que no aparece',
    dayOneBody:
      'Conectamos tus sistemas, cargamos el conocimiento de tu empresa y dejamos los agentes trabajando. En ningún paso se te pide que decidas de golpe qué puede hacer cada uno: todos empiezan proponiendo, y cada cuenta se conecta en modo lectura el día que la primera tarea la necesita. La conversación sobre permisos llega cuando ya sabes para qué, no antes.',

    upKicker: 'Cómo se suelta cuerda',
    upQuote: '«Tu agente de Marketing lleva 12 entregas aprobadas sin que cambiaras nada. ¿Le dejas ejecutar con permiso?»',
    upBody:
      'El sistema propone; nunca sube solo, y siempre con el dato delante. Bajar de nivel es inmediato y sin preguntas: un solo trabajo mal hecho basta para devolverlo a proponer.',
  },

  method: {
    kicker: 'El método',
    title: ['No instalamos una herramienta. Construimos un sistema, ', 'nivel a nivel.'],
    lead: 'Cada empresa está en un punto distinto. Te subimos por la escalera sin saltarnos pasos — y solo construimos a medida lo que de verdad te da ventaja. Lo que el mercado ya resuelve mejor, lo integramos.',
    rungs: [
      {
        n: '01',
        name: 'Fundamentos',
        who: 'Todo tu equipo',
        detail: 'Tu gente usando IA con criterio en el día a día. Lo que más retorno da y casi todos se saltan.',
        filled: 1,
      },
      {
        n: '02',
        name: 'Proyectos & Skills',
        who: 'Referentes internos',
        detail: 'El conocimiento de tu empresa —tono, catálogo, procesos— encapsulado una vez y reutilizable.',
        filled: 2,
      },
      {
        n: '03',
        name: 'Integrar',
        who: 'Tu responsable + STRATA',
        detail: 'Conectamos las mejores herramientas que ya existen y las dejamos funcionando dentro del negocio.',
        filled: 3,
      },
      {
        n: '04',
        name: 'Agentes propios',
        who: 'STRATA · a medida',
        detail: 'Construimos agentes que ejecutan procesos completos — solo donde te dan ventaja real.',
        filled: 4,
      },
    ],
    capstoneTitle: 'El destino: tu Business OS',
    capstoneBody:
      'Los cuatro niveles no quedan sueltos: convergen en un solo panel — el cerebro de tu negocio, desde el que ves y gobiernas toda la IA de la empresa.',
  },

  lab: {
    kicker: 'STRATA Lab · soluciones a medida',
    title: ['¿Necesitas algo único? ', 'Lo construimos contigo.'],
    lead: 'Cuando el OS estándar no basta, STRATA Lab diseña, construye y opera IA a medida para tu empresa — con un modelo de tres pasos y precio por proyecto.',
    steps: [
      {
        n: '1',
        title: 'Diagnóstico',
        price: 'desde {{implantacion_desde}}',
        body: 'En 3 semanas mapeamos tu operación y te decimos dónde la IA crea valor, con ROI estimado por iniciativa. Pago único — y se descuenta si seguimos.',
        gives: '→ define tu punto de partida',
      },
      {
        n: '2',
        title: 'Implementación',
        body: 'Construimos e integramos tu sistema y formamos a tu equipo. Eliges una de tres opciones según hasta qué nivel de la escalera quieras llegar.',
        gives: '→ una de 3 opciones · pago único',
      },
      {
        n: '3',
        title: 'Mantenimiento',
        body: 'Cuota fija mensual: mantenemos el sistema vivo, lo operamos y lo afinamos contigo. Escala con el nivel que uses — sin sorpresas.',
        gives: '→ operativa mensual',
      },
    ],
    dealKicker: 'El trato',
    dealBody: 'El diagnóstico decide tu nivel — y el nivel marca la inversión. El objetivo que fijamos contigo es recuperar lo invertido en ',
    dealHighlight: '3–6 meses',
    dealAfter: '.',
  },

  reviews: {
    kicker: 'Opiniones',
    title: ['Lo que dicen quienes ', 'ya operan con STRATA.'],
  },

  team: {
    kicker: 'Las personas',
    title: ['Tres socios. Cero empleados. ', 'Por diseño.'],
    lead: 'Los socios deciden y dan la cara. Nuestros propios agentes ejecutan la operación — somos el primer caso de éxito del producto.',
    members: [
      {
        photo: 'founder-gonzalo.jpg',
        name: 'Gonzalo',
        role: 'Co-CEO · CPO · CEO de OFFTV',
        bio: 'CEO de OFFTV. Producto, marketing y growth; lidera el delivery y la orquestación del Business OS.',
      },
      {
        photo: 'founder-borja.jpg',
        name: 'Borja',
        role: 'Co-CEO · CRO',
        bio: 'Revenue, GTM y operaciones entre España y Silicon Valley. Background legal como abogado; red de fondos y asesores.',
      },
      {
        photo: 'founder-lucia.jpg',
        name: 'Lucía',
        role: 'CTO · Ex-Sharpei AI · Forbes 30U30',
        bio: 'Ex-CTO de Sharpei AI. Arquitectura del AI Brain y el Business OS: agentes, infraestructura e IA.',
      },
    ],
  },

  cases: {
    kicker: 'Nuestro campo de pruebas',
    title: ['No lo estrenamos contigo. ', 'Lo estrenamos en lo nuestro.'],
    lead: 'Antes de venderle esto a nadie, lo pusimos a operar nuestros propios negocios. Cada uno tiene sus clientes, sus cobros y sus urgencias — y todos funcionan con el mismo sistema que te proponemos. Pasa por encima de cada uno para ver qué opera.',
    disclosure: 'Cinco de estas empresas son del grupo y una es cliente. Va marcado en cada tarjeta, porque no es lo mismo y no queremos que lo parezca. Que la mayoría sean nuestras es el argumento: si algo falla, lo pagamos nosotros antes que nadie.',
    runningLabel: 'Operando con agentes',
    allDepartments: 'Los nueve departamentos',
    badgeGroup: 'Empresa del grupo',
    badgeClient: 'Cliente',
    flipHint: 'Pasa por encima para ver más →',
    flipHintTouch: 'Toca para ver más →',
    carouselLabel: 'carrusel',
    prev: 'Caso anterior',
    next: 'Caso siguiente',
  },
  partners: {
    kicker: 'Para quién es',
    title: ['Para empresas que tienen el problema ', 'y no a quién delegarlo.'],
    lead: 'No hace falta ser una multinacional ni tener departamento técnico. Hace falta tener suficiente trabajo repetido como para que duela, y a nadie a quien pasárselo. Estos son los perfiles con los que trabajamos.',
    types: [
      {
        icon: 'users',
        title: 'Pymes de 10 a 100 empleados',
        detail: 'El perfil central: volumen suficiente para que el trabajo repetido pese, y ningún equipo de IT al que encargárselo.',
      },
      {
        icon: 'card',
        title: 'Ecommerce y marcas D2C',
        detail: 'Picos de pedidos y de atención, catálogo que cambia cada semana y un equipo pequeño detrás sosteniéndolo.',
      },
      {
        icon: 'doc',
        title: 'Gestorías y asesorías',
        detail: 'El mismo trámite repetido por cada cliente, cada mes. Es donde la diferencia se nota antes.',
      },
      {
        icon: 'bank',
        title: 'Family offices y grupos de inversión',
        detail: 'Instalar el sistema en las participadas y ver el conjunto —no cada empresa por separado— desde un solo panel.',
      },
      {
        icon: 'layers',
        title: 'Grupos con varias sociedades',
        detail: 'El cockpit consolida todas tus empresas de un vistazo, sin cuadrar hojas de cálculo a fin de mes.',
      },
      {
        icon: 'send',
        title: 'Distribución y logística',
        detail: 'Pedidos, rutas, stock y partes. Mucha coordinación que hoy vive en llamadas y en WhatsApp.',
      },
      {
        icon: 'headset',
        title: 'Clínicas y servicios profesionales',
        detail: 'Agenda, seguimiento de pacientes o clientes y facturación, sin que se caiga cuando falta alguien en recepción.',
      },
      {
        icon: 'node',
        title: 'Negocios multi-sede y franquicias',
        detail: 'El mismo proceso repetido en cada punto, con la garantía de que se hace igual en todos.',
      },
    ],
    logosKicker: 'Confían en nosotros',
    cta: 'Cuéntanos tu caso →',
    partnerNote: '¿No eres cliente sino canal? Trabajamos con fondos, despachos, asociaciones sectoriales e integradores que ya asesoran a empresas de este perfil, con un modelo de referidos claro y siempre bajo la marca STRATA.',
    partnerCta: 'Quiero ser partner →',
  },
  faq: {
    kicker: 'Preguntas frecuentes',
    title: ['Lo que suelen ', 'preguntarnos.'],
    items: [
      {
        q: '¿Puedo contratar STRATA OS ya?',
        a: 'Todavía no. Lo estamos terminando con un grupo reducido de empresas y abriremos por fases: apúntate a la lista de lanzamiento y entrarás en el primer grupo, con la tarifa de salida. Lo que sí puedes contratar hoy es STRATA Lab, nuestra pata de proyectos a medida, empezando por el diagnóstico.',
      },
      {
        q: '¿En qué se diferencia de un chat de IA normal?',
        a: 'Un chat responde; nuestros agentes ejecutan. Se conectan a tus herramientas, hacen el trabajo de principio a fin y solo te piden aprobación en lo crítico.',
      },
      {
        q: '¿Necesito un equipo técnico para usarlo?',
        a: 'No. Nosotros lo instalamos, lo integramos con lo que ya usas y lo operamos. Tú gobiernas todo desde un único panel, sin tocar código.',
      },
      {
        q: '¿Cómo se facturará STRATA OS?',
        a: 'Por departamentos, no por agentes sueltos ni por usuarios. Cada departamento lleva una implantación de una vez —desde {{implantacion_desde}}, que es conectar tus sistemas y dejar los agentes trabajando— y una cuota mensual desde {{cuota_desde_importe}} que cubre la operación, la supervisión y las mejoras. El Business OS va incluido. Sin permanencia una vez desplegado. Son las tarifas de lanzamiento y pueden ajustarse hasta esa fecha.',
      },
      {
        q: '¿Y si necesito algo a medida ahora, sin esperar al OS?',
        a: 'Ahí entra STRATA Lab, que sí está disponible hoy: diseñamos y construimos agentes y sistemas para tu caso, con un modelo de diagnóstico → implementación → mantenimiento y precio por proyecto. Empezamos por el diagnóstico, en 3 semanas.',
      },
      {
        q: '¿Qué pasa con la seguridad de mis datos?',
        a: 'Tus datos son tuyos. Inferencia con residencia europea, aislamiento por cliente y humano en el bucle en cada punto sensible — el agente propone, una persona aprueba y todo queda trazado.',
      },
    ],
  },

  contact: {
    kicker: 'STRATA Lab · disponible hoy',
    title: ['¿Tienes una empresa', 'que escalar con IA?'],
    lead: 'Sin esperar al lanzamiento del OS: en 3 semanas te decimos dónde la IA crea valor en tu negocio, con ROI estimado por iniciativa.',
    ctaPrimary: 'Pide tu diagnóstico →',
    ctaSecondary: '¿Buscas el OS? Apúntate al lanzamiento',
    form: {
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      message: 'Cuéntanos tu caso',
      messagePlaceholder: '¿Qué parte de tu operación te está costando más tiempo o margen?',
      submit: 'Pide tu diagnóstico →',
      sending: 'Enviando…',
      success: 'Recibido. Te escribimos en menos de 24 h laborables.',
      error: 'No hemos podido enviarlo. Escríbenos directamente a',
      consent:
        'Al enviar aceptas que tratemos tus datos para responderte. No los compartimos con terceros ni te apuntamos a ninguna lista.',
      required: 'obligatorio',
    },
  },

  footer: {
    tagline: 'Compañía de IA aplicada',
  },

  chat: {
    fabLabel: 'Abrir chat de asistencia',
    name: 'Asistente STRATA',
    status: 'Respuestas guiadas',
    greeting:
      '¡Hola! Soy el asistente guiado de STRATA — respondo a las preguntas de abajo. Para cualquier otra cosa te pasamos con el equipo.',
    placeholder: 'Escribe tu pregunta…',
    send: 'Enviar',
    close: 'Cerrar',
    quicks: ['¿Qué hacéis?', '¿Cuándo sale el OS?', 'Precios', 'Pedir diagnóstico'],
    answers: {
      launch:
        'STRATA OS está en desarrollo y abrimos por fases. Aún no hay fecha pública: apúntate a la lista de lanzamiento y serás de los primeros en entrar, con la tarifa de salida. Mientras tanto, STRATA Lab sí está disponible hoy.',
      what: 'Dos cosas. STRATA OS es el producto —agentes por departamento y un panel desde el que los gobiernas— y llega próximamente: puedes apuntarte a la lista de lanzamiento. STRATA Lab es nuestra pata a medida y sí está disponible hoy.',
      price:
        'STRATA OS aún no está a la venta. Se contrata por departamentos: implantación desde {{implantacion_desde}} (una vez) y cuota desde {{cuota_desde}}, con el Business OS incluido. Quien esté en la lista entra con la tarifa de lanzamiento. Lo que sí puedes contratar hoy es STRATA Lab: empieza por un diagnóstico desde {{implantacion_desde}} (se descuenta si seguimos), y la implementación y la operativa mensual dependen del nivel que elijas.',
      diagnosis:
        'En 3 semanas mapeamos tu operación y te decimos dónde la IA crea valor, con ROI estimado. Es la pata que ya está disponible: rellena el formulario de contacto y arrancamos.',
      trust:
        'Operamos nuestro propio negocio con este sistema 24/7 — somos nuestro primer caso de éxito. Y nos quedamos dentro hasta que tu equipo lo use y rinda.',
    },
    fallback: 'Esa se me escapa: soy un asistente guiado, no una IA abierta. Escríbenos y te responde una persona:',
  },
};
