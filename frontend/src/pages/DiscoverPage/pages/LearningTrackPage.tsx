import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { Title } from "@/components/Title/Title";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CardSummary } from "../components/CardSummary";
import { BorderedList } from "../components/BorderedList";
import { Typography } from "@/components/Typography/Typography";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { RelatedLearningTracksDisplay } from "../components/RelatedLearningTracksDisplay";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";
import { useGetLearningTrackByID } from "@/services/LearningTracks/useGetLearningTrackByID";
import { useGetSimilarLearningTracks } from "@/services/LearningTracks/useGetSimilarLearningTracks";

import specialize_icon from "@icons/star.svg";

import locales from "@localization/learning_tracks_page.json";

export const LearningTrackPage: FC = () => {
    const { direction, language, GetLocale } = useLocalization();

    const { learningTrackID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { data: learningTrack } = useGetLearningTrackByID(learningTrackID, {
        usesSuspense: true,
    });

    const similarLearningTracksQuery = useGetSimilarLearningTracks(
        learningTrack,
        undefined,
        {
            enabled: learningTrack != null,
        }
    );

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
        <Flexbox variant="main" direction="column" gap="8">
            <Title>{learningTrack.title}</Title>
            <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
                <CardSummary
                    className="[&_.icon]:drop-shadow-[3px_3px_1px_#0000007c] [&_.typography]:[text-shadow:2px_2px_2.5px_black]"
                    title={learningTrack.title}
                    rating={learningTrack.rating}
                    ratingCount={learningTrack["rating-count"]}
                    registerCount={learningTrack["specialized-count"]}
                    reviewsParagraph={GetLocale(locales.card.reviews, language)}
                    registerParagraph={GetLocale(
                        locales.card.specialization,
                        language
                    )}
                />
                <Button
                    className={twJoin(
                        direction == "ltr" ? "right-[6vw]" : "left-[6vw]",
                        "absolute bottom-0 z-[1] translate-y-1/2 font-bold"
                    )}
                    thickness="thick"
                    variant="warning"
                    icon={{
                        placement: "left",
                        source: specialize_icon,
                    }}
                >
                    <Locale>{locales.profile.buttons["specialize-now"]}</Locale>
                </Button>
                <Image
                    className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    source={learningTrack.image}
                    alternative={`Image of ${learningTrack.title} Course.`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>

            <main className="gap-page grid grid-cols-2 max-lg:grid-cols-1">
                <Flexbox variant="section" direction="column" gap="8">
                    <Flexbox direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.introduction}
                        </Locale>
                        <Typography variant="p">
                            {learningTrack.description}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.description}
                        </Locale>
                        <Typography className="text-justify" variant="p">
                            {learningTrack["detailed-description"]}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.courses}
                        </Locale>
                        <BorderedList
                            list={learningTrack.courses.map((courseID) => ({
                                title: courseID.toTitleCase(),
                                path: DISCOVER_ROUTES.base.routes.courseID.MapVariable(
                                    courseID
                                ),
                            }))}
                        />
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.tags}
                        </Locale>
                        <Flexbox gap="3" wrap="wrap">
                            {learningTrack.tags.map((tag, i) => (
                                <Link
                                    key={i}
                                    className="bg-background-dark active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover cursor-pointer rounded-full px-3 py-1 transition duration-200"
                                    to={
                                        DISCOVER_ROUTES.base.routes[
                                            "learning-tracks"
                                        ].absolute +
                                        "?" +
                                        new URLSearchParams({ query: tag })
                                    }
                                >
                                    {tag}
                                </Link>
                            ))}
                        </Flexbox>
                    </Flexbox>
                </Flexbox>

                <Flexbox className="lg:col-span-2" gap="4" direction="column">
                    <Locale className="text-lg font-bold" variant="h2">
                        {locales.profile["similar-learning-tracks"].title}
                    </Locale>
                    <RelatedLearningTracksDisplay
                        {...similarLearningTracksQuery}
                        skeletonArray={skeletonArray}
                        errorDisplay={{
                            title: GetLocale(
                                locales.profile["similar-learning-tracks"].error
                                    .title,
                                language
                            ),
                            paragraph: GetLocale(
                                locales.profile["similar-learning-tracks"].error
                                    .paragraph,
                                language
                            ),
                            button: GetLocale(
                                locales.profile["similar-learning-tracks"].error
                                    .button,
                                language
                            ),
                        }}
                        emptyDisplay={{
                            title: GetLocale(
                                locales.profile["similar-learning-tracks"].empty
                                    .title,
                                language
                            ),
                            paragraph: GetLocale(
                                locales.profile["similar-learning-tracks"].empty
                                    .paragraph,
                                language
                            ).replace(
                                /\*\*([^\*]+)\*\*/,
                                `**"${learningTrack.title}"**`
                            ),
                        }}
                    />
                </Flexbox>
            </main>
        </Flexbox>
    );
};
