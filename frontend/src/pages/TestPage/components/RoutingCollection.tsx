import { FC } from "react";
import { Collection } from "./Collection";
import { TEST_ROUTES } from "@/routes/test.routes";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import route_locales from "@localization/test_page_routes.json";

export const RoutingCollection: FC = () => {
    const { GetRouteLocales, language } = useLocalization();

    return (
        <Collection title="Routing Components">
            <Collection
                className="[&>div]:grow"
                title="Breadcrumbs"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <Breadcrumbs />
            </Collection>
            <Collection
                className="[&>div]:grow"
                title="Navigation Bar"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <NavigationBar
                    direction="row"
                    base={TEST_ROUTES?.base.absolute ?? ""}
                    routes={GetRouteLocales(
                        TEST_ROUTES != null
                            ? { ...TEST_ROUTES.base.routes }
                            : {},
                        route_locales,
                        language
                    )}
                />
            </Collection>
        </Collection>
    );
};
