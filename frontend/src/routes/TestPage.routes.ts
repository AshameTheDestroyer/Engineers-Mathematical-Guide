import { environmentVariables } from "@/services/EnvironmentVariables";

const LANDING_PAGE_ROUTES_: Array<Anchor> = [
    { text: "colours", href: "/test/colours" },
    { text: "typography", href: "/test/typography" },
    { text: "components", href: "/test/components" },
    { text: "palettes", href: "/test/palettes" },
];

export const LANDING_PAGE_ROUTES =
    environmentVariables.ENVIRONMENT == "development"
        ? LANDING_PAGE_ROUTES_
        : [];
