import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Markdown } from "@/components/Markdown/Markdown";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { useGetMarkdownByID } from "@/services/Markdown/useGetMarkdownByID";
import { JumpToStartButton } from "@/components/JumpToStartButton/JumpToStartButton";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/modules_page.json";

export type ReadingLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.reading };
};

export const ReadingLesson: FC<ReadingLessonProps> = ({ lesson }) => {
    const { language, GetLocale } = useLocalization();

    const { data: markdowns } = useGetMarkdownByID(lesson.id, {
        usesSuspense: true,
    });

    return (
        <Flexbox className="bg-background-normal relative min-h-[60dvh] grow rounded-2xl p-4">
            <Flexbox
                className="absolute inset-0 overflow-auto p-[inherit]"
                gap="8"
                direction="column"
            >
                {markdowns.length > 0 ? (
                    markdowns.map((markdown, i) => (
                        <Markdown key={i} {...markdown} />
                    ))
                ) : (
                    <SearchResultDisplay
                        className="-translate-1/2 absolute left-1/2 top-1/2"
                        iconType="empty"
                        title={GetLocale(
                            locales.lessons.reading.empty.title,
                            language
                        )}
                        paragraph={GetLocale(
                            locales.lessons.reading.empty.paragraph,
                            language
                        ).replace(/\*\*([^\*]+)\*\*/, `**"${lesson.title}"**`)}
                    />
                )}

                <JumpToStartButton
                    className="right-4! left-4! bottom-4! place-self-end"
                    isContainerized
                    orientation="vertical"
                />
            </Flexbox>
        </Flexbox>
    );
};
