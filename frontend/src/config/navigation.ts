/**
 * Configuración centralizada de navegación.
 * Separa la estructura (URLs) del contenido (i18n).
 */
export const NAV_ITEMS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/nosotros' },
  { key: 'nav.rentals', href: '/#rentals' },
] as const;

export const FOOTER_LINKS = {
  company: [
    { key: 'nav.about', href: '/nosotros' },
    { key: 'footer.contact', href: '/contacto' },
    { key: 'footer.privacy', href: '/legal/politica-privacidad' },
  ],
  destinations: [
    { label: 'Villas de lujo Marbella', href: '/zona/marbella' },
    { label: 'Apartamentos Málaga', href: '/zona/malaga' },
    { label: 'Alquiler en Nerja', href: '/zona/nerja' },
    { label: 'Promociones Torremolinos', href: '/zona/torremolinos' },
    { label: 'Familiares Fuengirola', href: '/zona/fuengirola' },
    { label: 'Benalmadena Coast', href: '/zona/benalmadena' },
    { label: 'Exclusivo Estepona', href: '/zona/estepona' },
    { label: 'Torre del Mar Relax', href: '/zona/torre-del-mar' },
  ],
  guides: [
    { label: 'Villas de Lujo Costa del Sol', href: '/guia/villas-lujo-costa-del-sol' },
    { label: 'Guía Familias en Marbella', href: '/guia/villa-familias-marbella' },
    { label: 'Actividades en Familia', href: '/guia/actividades-familia-costa-del-sol' },
  ]
};
