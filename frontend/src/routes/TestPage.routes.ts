const LANDING_PAGE_ROUTES_ = [
    { text: "Colours", href: "/test/colours" },
    { text: "Typography", href: "/test/typography" },
    { text: "Components", href: "/test/components" },
];

export const LANDING_PAGE_ROUTES =
    import.meta.env["VITE_ENVIRONMENT"] == "development"
        ? LANDING_PAGE_ROUTES_
        : [];
