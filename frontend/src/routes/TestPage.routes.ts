const LANDING_PAGE_ROUTES_ = [
    { text: "Design", href: "/test/design" },
    { text: "Components", href: "/test/components" },
];

export const LANDING_PAGE_ROUTES =
    import.meta.env["VITE_ENVIRONMENT"] == "development"
        ? LANDING_PAGE_ROUTES_
        : [];
