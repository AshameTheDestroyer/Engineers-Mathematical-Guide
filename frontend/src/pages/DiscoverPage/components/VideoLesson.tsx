import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/modules_page.json";

export type VideoLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.video };
};

export const VideoLesson: FC<VideoLessonProps> = ({ lesson }) => {
    const { language, GetLocale } = useLocalization();

    return (
        <>
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
                    title={GetLocale(
                        locales.lessons.video.loading.title,
                        language
                    )}
                    paragraph={GetLocale(
                        locales.lessons.video.loading.paragraph,
                        language
                    )}
                />
            </Flexbox>
            <iframe
                className="z-1 w-full rounded-2xl"
                allow="fullscreen"
                src={
                    lesson.url +
                    "?" +
                    new URLSearchParams({
                        rel: "0",
                        hl: language,
                        modestbranding: "1",
                        cc_load_policy: "1",
                        cc_lang_pref: language,
                    })
                }
            />
        </>
    );
};
