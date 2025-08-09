import { FC } from "react";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { LearningTrackBanner } from "../components/LearningTrackBanner";
import { ProgressedCourseCard } from "../components/ProgressedCourseCard";
import { useGetCoursesByIDs } from "@/services/Courses/useGetCoursesByIDs";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";
import { useGetLearningTrackByID } from "@/services/LearningTracks/useGetLearningTrackByID";

import locales from "@localization/learning_tracks_page.json";

export const LearningTrackCoursesPage: FC = () => {
    const { learningTrackID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { language, GetLocale } = useLocalization();

    const { data: learningTrack } = useGetLearningTrackByID(learningTrackID, {
        usesSuspense: true,
    });

    const {
        refetch,
        isError,
        isLoading,
        data: courses,
    } = useGetCoursesByIDs(learningTrack?.courses ?? [], {
        enabled: learningTrack != null,
    });

    const skeletonArray = new Array(5).fill(null);

    if (learningTrack == null) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title={GetLocale(locales.display["empty"].title, language)}
                paragraph={GetLocale(
                    locales.display["empty"].paragraph,
                    language
                ).replace(/\*\*([^\*]+)\*\*/, `**"${learningTrackID}"**`)}
            />
        );
    }

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <Title>{`Courses of ${learningTrack.title}`}</Title>
            <LearningTrackBanner learningTrack={learningTrack} />

            <Locale className="text-2xl font-bold" variant="h1">
                {locales.profile.courses.title}
            </Locale>

            {isLoading || courses == null ? (
                <CoursesDisplay isSkeleton courses={skeletonArray} />
            ) : isError ? (
                <SearchResultDisplay
                    className="grow"
                    iconType="error"
                    title={GetLocale(
                        locales.profile.courses.error.title,
                        language
                    )}
                    paragraph={GetLocale(
                        locales.profile.courses.error.paragraph,
                        language
                    )}
                    buttons={
                        <Button onClick={(_e) => refetch()}>
                            <Locale>
                                {locales.profile.courses.error.button}
                            </Locale>
                        </Button>
                    }
                />
            ) : courses.length == 0 ? (
                <SearchResultDisplay
                    className="grow"
                    iconType="empty"
                    title={GetLocale(
                        locales.profile.courses.empty.title,
                        language
                    )}
                    paragraph={GetLocale(
                        locales.profile.courses.empty.paragraph,
                        language
                    ).replace(/\*\*([^\*]+)\*\*/, `**"${learningTrackID}"**`)}
                />
            ) : (
                <CoursesDisplay
                    courses={courses}
                    Renders={(course, i) => (
                        <ProgressedCourseCard key={i} courseID={course.id} />
                    )}
                />
            )}
        </Flexbox>
    );
};
