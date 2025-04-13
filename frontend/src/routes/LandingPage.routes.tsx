const LANDING_PAGE_ROUTES_: Array<Anchor> = [
    {
        text: "Home",
        href: "/",
    },
    {
        text: "About",
        href: "/about",
    },
    {
        text: "Contact Us",
        href: "/contact-us",
    },
    {
        text: "References",
        href: "/references",
    },
    {
        text: "Help",
        href: "/help",
    },
];

export const LANDING_PAGE_ROUTES =
    import.meta.env["VITE_ENVIRONMENT"] != "development"
        ? LANDING_PAGE_ROUTES_
        : [...LANDING_PAGE_ROUTES_, { text: "TEST", href: "/test" }];
