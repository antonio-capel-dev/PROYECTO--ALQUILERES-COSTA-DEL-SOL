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
    { key: 'footer.privacy', href: '/politica-privacidad' },
  ],
  destinations: [
    { label: 'Marbella', href: '/alquiler-marbella' },
    { label: 'Málaga', href: '/alquiler-malaga' },
    { label: 'Nerja', href: '/alquiler-nerja' },
    { label: 'M. Centro Histórico', href: '/malaga-centro-historico' },
    { label: 'Marbella Familias', href: '/marbella-familias' },
  ]
};
