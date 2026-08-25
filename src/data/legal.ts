/**
 * Datos del titular y parámetros legales de la web.
 *
 * ⚠️ TODO ANTES DE PUBLICAR: los campos marcados como PENDIENTE son
 * obligatorios por el art. 10 de la LSSI-CE (Ley 34/2002) y por los arts.
 * 13-14 del RGPD. Mientras estén sin rellenar, las páginas legales muestran
 * un aviso visible en su lugar en vez de fingir que están completas.
 *
 * Titular actual: persona física (Gonzalo Palma), no sociedad. Si en el
 * futuro se constituye una S.L., cambia `tipo` a 'sociedad' y rellena
 * `sociedad`.
 */

export type TipoTitular = 'personaFisica' | 'sociedad';

/** Marcador de campo sin rellenar. Ver `datosCompletos` más abajo. */
export const PENDIENTE = '';

export const legal = {
  tipo: 'personaFisica' as TipoTitular,

  /** Nombre comercial con el que opera la web. */
  nombreComercial: 'STRATA',

  personaFisica: {
    /** PENDIENTE — nombre y apellidos completos, tal y como figuran en el DNI. */
    nombre: PENDIENTE, // p. ej. 'Gonzalo Palma …'
    /** PENDIENTE — NIF/DNI con letra. */
    nif: PENDIENTE,
    /** PENDIENTE — domicilio a efectos de notificaciones (calle, nº, CP, localidad, provincia). */
    domicilio: PENDIENTE,
  },

  /** Solo si `tipo` pasa a 'sociedad'. */
  sociedad: {
    razonSocial: PENDIENTE,
    cif: PENDIENTE,
    domicilio: PENDIENTE,
    /** Registro Mercantil, tomo, folio, hoja, inscripción. */
    datosRegistrales: PENDIENTE,
  },

  /** Email de contacto y de ejercicio de derechos RGPD. */
  email: 'gpalma@stratalabai.com',
  /** Opcional: teléfono de contacto. Vacío = no se muestra. */
  telefono: PENDIENTE,

  /** Fecha de última actualización de los textos legales (ISO). */
  actualizado: '2026-08-25',

  /**
   * Encargados del tratamiento con acceso a datos personales.
   * Se listan literalmente en la política de privacidad, como exige la
   * transparencia del art. 13.1.e RGPD.
   */
  encargados: [
    {
      nombre: 'Vercel Inc.',
      finalidad: { es: 'Alojamiento del sitio web', en: 'Website hosting' },
      ubicacion: {
        es: 'EE. UU., con Cláusulas Contractuales Tipo y adhesión al EU-US Data Privacy Framework',
        en: 'USA, under Standard Contractual Clauses and the EU-US Data Privacy Framework',
      },
      url: 'https://vercel.com/legal/privacy-policy',
    },
    {
      nombre: 'Google Ireland Ltd.',
      finalidad: { es: 'Correo electrónico (Google Workspace)', en: 'Email (Google Workspace)' },
      ubicacion: { es: 'Irlanda (UE)', en: 'Ireland (EU)' },
      url: 'https://policies.google.com/privacy',
    },
  ],

  /**
   * Proveedor de los formularios. Se rellena cuando se configure
   * PUBLIC_WAITLIST_ENDPOINT / PUBLIC_CONTACT_ENDPOINT: al pasar por él los
   * datos del formulario, hay que declararlo aquí como encargado.
   */
  proveedorFormularios: {
    nombre: PENDIENTE, // p. ej. 'Formspree, Inc.'
    ubicacion: { es: PENDIENTE, en: PENDIENTE },
    url: PENDIENTE,
  },
} as const;

/**
 * ¿Están rellenos los datos identificativos obligatorios?
 *
 * Las páginas legales lo consultan: si es `false`, en lugar de publicar un
 * aviso legal con huecos —que no cumpliría igualmente— muestran un aviso
 * claro de que está pendiente. Es preferible a aparentar cumplimiento.
 */
export const datosCompletos: boolean =
  legal.tipo === 'personaFisica'
    ? Boolean(legal.personaFisica.nombre && legal.personaFisica.nif && legal.personaFisica.domicilio)
    : Boolean(legal.sociedad.razonSocial && legal.sociedad.cif && legal.sociedad.domicilio);

/** Identificación del titular ya formateada, para no repetir el condicional. */
export function titular() {
  return legal.tipo === 'personaFisica'
    ? {
        nombre: legal.personaFisica.nombre,
        idLabel: { es: 'NIF', en: 'Tax ID (NIF)' },
        id: legal.personaFisica.nif,
        domicilio: legal.personaFisica.domicilio,
        registrales: '',
      }
    : {
        nombre: legal.sociedad.razonSocial,
        idLabel: { es: 'CIF', en: 'Tax ID (CIF)' },
        id: legal.sociedad.cif,
        domicilio: legal.sociedad.domicilio,
        registrales: legal.sociedad.datosRegistrales,
      };
}
