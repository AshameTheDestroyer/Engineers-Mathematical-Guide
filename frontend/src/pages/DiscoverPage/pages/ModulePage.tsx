import { FC } from "react";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { LessonDropView } from "../components/LessonDropView";
import { useGetModuleByID } from "@/services/Modules/useGetModuleByID";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { MathParallaxScene } from "@/components/MathParallaxScene/MathParallaxScene";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/modules_page.json";

export const ModulePage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { courseID, moduleID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { data: module } = useGetModuleByID(courseID, moduleID, {
        usesSuspense: true,
    });

    if (courseID == null || moduleID == null || module == null) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title={GetLocale(locales.display["empty"].title, language)}
                paragraph={GetLocale(
                    locales.display["empty"].paragraph,
                    language
                ).replace(/\*\*([^\*]+)\*\*/, `**"${courseID}"**`)}
            />
        );
    }

    return (
        <Flexbox className="grow" variant="main">
            <Title>{module.title}</Title>

            <LessonDropView className="-m-page" />

            <DoubleCogIcon
                className="text-background-dark -left-page -bottom-1/10 fixed z-[-1]"
                size={400}
            />
            <CogIcon
                className="text-background-dark -right-page fixed top-0 z-[-1] translate-x-1/4 translate-y-2/3 [animation-direction:reverse]"
                size={250}
            />

            <MathParallaxScene className="-z-2 fixed inset-0" />
        </Flexbox>
    );
};
