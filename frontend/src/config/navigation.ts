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
    { label: 'Alquiler en Marbella', href: '/zona/marbella' },
    { label: 'Alquiler en Malaga', href: '/zona/malaga' },
    { label: 'Alquiler en Nerja', href: '/zona/nerja' },
    { label: 'Alquiler en Torremolinos', href: '/zona/torremolinos' },
    { label: 'Alquiler en Fuengirola', href: '/zona/fuengirola' },
    { label: 'Alquiler en Benalmadena', href: '/zona/benalmadena' },
    { label: 'Alquiler en Estepona', href: '/zona/estepona' },
    { label: 'Alquiler en Torre del Mar', href: '/zona/torre-del-mar' },
  ],
  guides: [
    { label: 'Guia Costa del Sol', href: '/guia/guia-completa-alquilar-costa-del-sol' },
    { label: 'Mejores apartamentos Torre del Mar', href: '/guia/mejores-apartamentos-torre-del-mar-familias' },
    { label: 'Que ver en Nerja', href: '/guia/que-ver-nerja-playas-alquileres' },
  ]
};
