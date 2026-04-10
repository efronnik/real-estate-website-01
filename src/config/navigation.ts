export const ROUTE_PATHS = {
  home: "/",
  about: "/o-mnie",
  sprzedaz: "/sprzedaz",
  inwestycje: "/inwestycje",
  bledy: "/bledy",
  blog: "/blog",
  kalkulator: "/kalkulator",
  kontakt: "/kontakt",
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export type RouteConfigItem = {
  path: RoutePath;
  label: string;
  order: number;
  showInTopbar: boolean;
  showInFooter: boolean;
};

/*
Workflow for adding a new page route:
1) Create `src/app/<route>/page.tsx`.
2) Add one item to ROUTE_CONFIG.
3) Topbar/Footer update automatically through selectors below.
*/
export const ROUTE_CONFIG: RouteConfigItem[] = [
  { path: ROUTE_PATHS.home, label: "Główna", order: 10, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.about, label: "O mnie", order: 20, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.sprzedaz, label: "Sprzedaz", order: 30, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.inwestycje, label: "Inwestycje", order: 40, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.bledy, label: "Błędy", order: 50, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.blog, label: "Blog", order: 60, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.kalkulator, label: "Kalkulator", order: 70, showInTopbar: true, showInFooter: true },
  { path: ROUTE_PATHS.kontakt, label: "Kontakt", order: 80, showInTopbar: true, showInFooter: true },
];

type NavLink = {
  href: RoutePath;
  label: string;
};

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

function toNavLink(item: RouteConfigItem): NavLink {
  return { href: item.path, label: item.label };
}

export function getTopbarLinks(): NavLink[] {
  return ROUTE_CONFIG
    .filter((item) => item.showInTopbar)
    .sort((a, b) => a.order - b.order)
    .map(toNavLink);
}

export function getFooterLinks(pathname: string): NavLink[] {
  return ROUTE_CONFIG
    .filter((item) => item.showInFooter)
    .sort((a, b) => a.order - b.order)
    .filter((item) => !isRouteActive(pathname, item.path))
    .map(toNavLink);
}
