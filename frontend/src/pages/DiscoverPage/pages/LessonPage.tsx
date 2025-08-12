import { FC } from "react";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Typography } from "@/components/Typography/Typography";
import { useGetLessonByID } from "@/services/Lessons/useGetLessonByID";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/modules_page.json";

export const LessonPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { courseID, moduleID, lessonID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { data: lesson } = useGetLessonByID(courseID, moduleID, lessonID, {
        usesSuspense: true,
    });

    if (courseID == null || moduleID == null) {
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

    if (lesson == null) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title={GetLocale(locales.lessons["empty"].title, language)}
                paragraph={GetLocale(
                    locales.lessons["empty"].paragraph,
                    language
                ).replace(/\*\*([^\*]+)\*\*/, `**"${moduleID}"**`)}
            />
        );
    }

    return (
        <Flexbox>
            <Title>{lesson.title}</Title>
            <Typography className="text-xl font-bold" variant="h1">
                {lesson.title}
            </Typography>
        </Flexbox>
    );
};
