import { environmentVariables } from "@/services/EnvironmentVariables";

const LANDING_PAGE_ROUTES_: Array<Anchor> = [
    { text: "Colours", href: "/test/colours" },
    { text: "Typography", href: "/test/typography" },
    { text: "Components", href: "/test/components" },
    { text: "Palettes", href: "/test/palettes" },
];

export const LANDING_PAGE_ROUTES =
    environmentVariables.ENVIRONMENT == "development"
        ? LANDING_PAGE_ROUTES_
        : [];
