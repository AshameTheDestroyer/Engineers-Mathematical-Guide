import { environmentVariables } from "@/services/EnvironmentVariables";

const LANDING_PAGE_ROUTES_: Array<Anchor> = [
    { text: "home", href: "/" },
    { text: "about", href: "/about" },
    { text: "contact-us", href: "/contact-us" },
    { text: "references", href: "/references" },
    { text: "help", href: "/help" },
];

export const LANDING_PAGE_ROUTES =
    environmentVariables.ENVIRONMENT != "development"
        ? LANDING_PAGE_ROUTES_
        : [...LANDING_PAGE_ROUTES_, { text: "test", href: "/test" }];
