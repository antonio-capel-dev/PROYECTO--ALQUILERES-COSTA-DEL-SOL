/**
 * Configuración centralizada de navegación.
 * Separa la estructura (URLs) del contenido (i18n).
 */
export const NAV_ITEMS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/nosotros' },
  { key: 'nav.rentals', href: '/#rentals' },
] as const;

export const NAV_ZONAS = [
  { label: 'Marbella', href: '/zona/marbella' },
  { label: 'Málaga Centro', href: '/zona/malaga' },
  { label: 'Torre del Mar', href: '/zona/torre-del-mar' },
  { label: 'Benalmádena', href: '/zona/benalmadena' },
  { label: 'Torremolinos', href: '/zona/torremolinos' },
];

export const FOOTER_LINKS = {
  company: [
    { key: 'nav.about', href: '/nosotros' },
    { key: 'footer.contact', href: '/contacto' },
    { key: 'footer.privacy', href: '/politica-privacidad' },
  ],
  destinations: [
    { label: 'Marbella', href: '/zona/marbella' },
    { label: 'Málaga Centro', href: '/zona/malaga' },
    { label: 'Benalmádena', href: '/zona/benalmadena' },
    { label: 'Torre del Mar', href: '/zona/torre-del-mar' },
  ]
};
