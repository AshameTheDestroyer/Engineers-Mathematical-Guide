const HEADER_ROUTES_ = [
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
        text: "Refrences",
        href: "/references",
    },
    {
        text: "Help",
        href: "/help",
    },
];

export const HEADER_ROUTES =
    import.meta.env["VITE_ENVIRONMENT"] != "development"
        ? HEADER_ROUTES_
        : [...HEADER_ROUTES_, { text: "TEST", href: "/test" }];
