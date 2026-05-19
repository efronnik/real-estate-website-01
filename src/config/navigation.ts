export const ROUTE_PATHS = {
  home: "/",
  about: "/o-mnie",
  sprzedaz: "/sprzedaz",
  inwestycje: "/inwestycje",
  katalogOfert: "/katalog-ofert",
  homeStaging: "/home-staging",
  kredytyHipoteczne: "/kredyty-hipoteczne",
  bledy: "/bledy",
  blog: "/blog",
  kalkulator: "/kalkulator",
  kontakt: "/kontakt",
  politykaPrywatnosci: "/polityka-prywatnosci",
  rodo: "/rodo",
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export type RouteConfigItem = {
  path: RoutePath;
  label: string;
  order: number;
  showInTopbar: boolean;
  showInFooter: boolean;
};

export type NavLink = {
  href: RoutePath;
  label: string;
};

export type TopbarNavItem =
  | { type: "link"; href: RoutePath; label: string }
  | { type: "dropdown"; label: string; children: NavLink[] };

export const USLUGI_NAV_LINKS: NavLink[] = [
  { href: ROUTE_PATHS.katalogOfert, label: "Katalog ofert" },
  { href: ROUTE_PATHS.homeStaging, label: "Home staging" },
  { href: ROUTE_PATHS.kredytyHipoteczne, label: "Kredyty hipoteczne" },
];

/*
Workflow for adding a new page route:
1) Create `src/app/<route>/page.tsx`.
2) Add one item to ROUTE_CONFIG.
3) Topbar/Footer update automatically through selectors below.
*/
export const ROUTE_CONFIG: RouteConfigItem[] = [
  { path: ROUTE_PATHS.home, label: "Główna", order: 10, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.about, label: "O mnie", order: 20, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.sprzedaz, label: "Sprzedaż", order: 30, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.inwestycje, label: "Inwestycje", order: 40, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.katalogOfert, label: "Katalog ofert", order: 45, showInTopbar: false, showInFooter: true },
  { path: ROUTE_PATHS.homeStaging, label: "Home staging", order: 46, showInTopbar: false, showInFooter: true },
  { path: ROUTE_PATHS.kredytyHipoteczne, label: "Kredyty hipoteczne", order: 47, showInTopbar: false, showInFooter: true },
  { path: ROUTE_PATHS.bledy, label: "Błędy", order: 50, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.blog, label: "Blog", order: 60, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.kalkulator, label: "Kalkulator", order: 70, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.kontakt, label: "Kontakt", order: 80, showInTopbar: true, showInFooter: true },
];

function normalizePathname(pathname: string) {
  if (!pathname) return ROUTE_PATHS.home;
  if (pathname === ROUTE_PATHS.home) return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function isRouteActive(pathname: string, routePath: RoutePath) {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedRoutePath = normalizePathname(routePath);

  if (normalizedRoutePath === ROUTE_PATHS.home) {
    return normalizedPathname === ROUTE_PATHS.home;
  }

  return (
    normalizedPathname === normalizedRoutePath ||
    normalizedPathname.startsWith(`${normalizedRoutePath}/`)
  );
}

export function isUslugiNavActive(pathname: string) {
  return USLUGI_NAV_LINKS.some((link) => isRouteActive(pathname, link.href));
}

function toNavLink(item: RouteConfigItem): NavLink {
  return { href: item.path, label: item.label };
}

/** @deprecated Use getTopbarNavItems — kept for callers expecting flat links only */
export function getTopbarLinks(): NavLink[] {
  return getTopbarNavItems()
    .filter((item): item is Extract<TopbarNavItem, { type: "link" }> => item.type === "link")
    .map((item) => ({ href: item.href, label: item.label }));
}

export function getTopbarNavItems(): TopbarNavItem[] {
  const flatLinks = ROUTE_CONFIG.filter((item) => item.showInTopbar)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({ type: "link" as const, href: item.path, label: item.label }));

  const items: TopbarNavItem[] = [];
  for (const link of flatLinks) {
    if (link.href === ROUTE_PATHS.inwestycje) {
      items.push(link);
      items.push({
        type: "dropdown",
        label: "Usługi",
        children: USLUGI_NAV_LINKS,
      });
      continue;
    }
    items.push(link);
  }

  return items;
}

export function getFooterLinks(pathname: string): NavLink[] {
  return ROUTE_CONFIG.filter((item) => item.showInFooter)
    .sort((a, b) => a.order - b.order)
    .filter((item) => !isRouteActive(pathname, item.path))
    .map(toNavLink);
}
