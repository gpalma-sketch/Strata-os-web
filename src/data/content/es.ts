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
      { href: '#modelo', label: 'El OS' },
      { href: '#agentes', label: 'Agentes' },
      { href: '#lanzamiento', label: 'Lanzamiento' },
      { href: '#casos', label: 'Casos' },
      { href: '#precios', label: 'Precios' },
      { href: '#lab', label: 'STRATA Lab' },
      { href: '#partners', label: 'Para quién' },
      { href: '#equipo', label: 'Equipo' },
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
        price: 'próximamente · desde 1.490 €/mes',
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
    title: ['La IA que se paga sola — ', 'normalmente en 3 a 6 meses.'],
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
  },
  how: {
    kicker: 'Cómo funciona',
    title: ['Jarvis decide. ', 'Los agentes ejecutan.'],
    columns: [
      [
        { title: 'La empresa', summary: 'emails · llamadas · leads · pedidos' },
        { title: 'El dueño', summary: 'voz o texto · “pregúntale al sistema”' },
      ],
      [{ title: 'Jarvis · el núcleo', summary: 'clasifica la intención · elige departamento, agente y modelo', hot: true }],
      [
        { title: 'Marketing · Ventas · Atención', summary: 'contenido · leads · tickets' },
        { title: 'Ops · Finanzas · Legal', summary: 'pedidos · cobros · contratos' },
        { title: 'People · Producto & Dev · Dirección', summary: 'equipo · roadmap · decisiones' },
      ],
      [
        { title: 'Memoria privada', summary: 'los datos de la empresa · solo suyos' },
        { title: 'Business OS', summary: 'el dueño lo gobierna desde el panel', hot: true },
      ],
    ],
    closing: 'No es un diagrama de marketing: este sistema ya opera ',
    closingStrong: 'nuestro propio negocio',
    closingAfter: ', 24/7, con nuestros propios departamentos operando dentro. Somos el primer cliente de nuestro producto.',
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
        price: 'desde 9.500 €',
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

  gallery: [
    {
      image: 'gfx-network.png',
      alt: 'Diagrama de la red de agentes de STRATA conectados a un router central',
      label: 'El sistema',
      caption: 'ocho agentes, un router',
    },
    {
      image: 'gfx-panel.png',
      alt: 'Vista del panel Business OS con métricas en tiempo real',
      label: 'El panel',
      caption: 'tu negocio en tiempo real',
    },
    {
      image: 'gfx-growth.png',
      alt: 'Gráfico de crecimiento del margen a lo largo del tiempo',
      label: 'El resultado',
      caption: 'margen que crece',
    },
  ],

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
    lead: 'Antes de venderle esto a nadie, lo pusimos a operar los negocios del grupo. Cada uno tiene sus propios clientes, sus propios cobros y sus propias urgencias — y todos funcionan con el mismo sistema que te proponemos.',
    disclosure: 'Estas son empresas del grupo, no clientes. Lo decimos claro a propósito: si algo falla aquí, lo pagamos nosotros. Ese es exactamente el motivo por el que puedes fiarte de que el sistema aguanta.',
    runningLabel: 'Operando con agentes',
    allDepartments: 'Los nueve departamentos',
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
        a: 'Por departamentos, no por agentes sueltos ni por usuarios. Cada departamento lleva una implantación de una vez —desde 9.500 €, que es conectar tus sistemas y dejar los agentes trabajando— y una cuota mensual desde 1.490 € que cubre la operación, la supervisión y las mejoras. El Business OS va incluido. Sin permanencia una vez desplegado. Son las tarifas de lanzamiento y pueden ajustarse hasta esa fecha.',
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
        'STRATA OS aún no está a la venta. Se contrata por departamentos: implantación desde 9.500 € (una vez) y cuota desde 1.490 €/mes, con el Business OS incluido. Quien esté en la lista entra con la tarifa de lanzamiento. Lo que sí puedes contratar hoy es STRATA Lab: empieza por un diagnóstico desde 9.500 € (se descuenta si seguimos), y la implementación y la operativa mensual dependen del nivel que elijas.',
      diagnosis:
        'En 3 semanas mapeamos tu operación y te decimos dónde la IA crea valor, con ROI estimado. Es la pata que ya está disponible: rellena el formulario de contacto y arrancamos.',
      trust:
        'Operamos nuestro propio negocio con este sistema 24/7 — somos nuestro primer caso de éxito. Y nos quedamos dentro hasta que tu equipo lo use y rinda.',
    },
    fallback: 'Esa se me escapa: soy un asistente guiado, no una IA abierta. Escríbenos y te responde una persona:',
  },
};
