import { FC } from "react";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { LessonTypeEnum } from "@/schemas/LessonSchema";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Typography } from "@/components/Typography/Typography";
import { useGetLessonByID } from "@/services/Lessons/useGetLessonByID";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
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
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <Title>{lesson.title}</Title>
            <Typography className="text-xl font-bold" variant="h1">
                {lesson.title}
            </Typography>

            {(() => {
                switch (lesson.type) {
                    case LessonTypeEnum.video:
                        return (
                            <Flexbox className="bg-background-normal-hover relative min-h-[60dvh] grow rounded-2xl p-4">
                                <Flexbox
                                    className="-translate-1/2 absolute left-1/2 top-1/2"
                                    gap="4"
                                    direction="column"
                                    placeItems="center"
                                >
                                    <DoubleCogIcon
                                        size={64}
                                        className="scale-85 [&>*]:[animation-duration:3s]"
                                    />
                                    <SearchResultDisplay
                                        title="Video Loading..."
                                        paragraph="Your video is currently loading, just wait a moment."
                                    />
                                </Flexbox>
                                <iframe
                                    className="z-1 w-full rounded-2xl"
                                    src={lesson.url}
                                />
                            </Flexbox>
                        );
                    case LessonTypeEnum.reading:
                        return <p>Reading</p>;
                }
            })()}
        </Flexbox>
    );
};
