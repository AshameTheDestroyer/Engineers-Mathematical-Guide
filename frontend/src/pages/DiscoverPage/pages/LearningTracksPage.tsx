import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { LearningTracksDisplay } from "../components/LearningTracksDisplay";
import { useGetLearningTracks } from "@/services/LearningTracks/useGetLearningTracks";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/learning_tracks_page.json";

export const LearningTracksPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { searchQuery, setSearchQuery, debouncedSearchQuery } =
        useSchematicSearch();

    const {
        refetch,
        isError,
        isLoading,
        data: learningTracks,
    } = useGetLearningTracks(debouncedSearchQuery);

    const skeletonArray = new Array(20).fill(null);

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title={GetLocale(locales.title, language)}
                inputLabel={GetLocale(locales.inputs.search.label, language)}
            />
            <Flexbox className="flex flex-col pt-10">
                {isLoading || learningTracks == null ? (
                    <LearningTracksDisplay
                        isSkeleton
                        learningTracks={skeletonArray}
                    />
                ) : isError ? (
                    <SearchResultDisplay
                        className="grow"
                        iconType="error"
                        title={GetLocale(locales.display.error.title, language)}
                        paragraph={GetLocale(
                            locales.display.error.paragraph,
                            language
                        )}
                        buttons={
                            <Button onClick={(_e) => refetch()}>
                                <Locale>{locales.display.error.button}</Locale>
                            </Button>
                        }
                    />
                ) : learningTracks.length == 0 ? (
                    <SearchResultDisplay
                        className="grow"
                        iconType="empty"
                        title={GetLocale(locales.display.empty.title, language)}
                        paragraph={GetLocale(
                            locales.display.empty.paragraph,
                            language
                        ).replace(
                            /\*\*([^\*]+)\*\*/,
                            `**"${debouncedSearchQuery}"**`
                        )}
                        buttons={
                            <Button onClick={(_e) => setSearchQuery("")}>
                                <Locale>{locales.display.empty.button}</Locale>
                            </Button>
                        }
                    />
                ) : (
                    <LearningTracksDisplay learningTracks={learningTracks} />
                )}
            </Flexbox>
        </Flexbox>
    );
};
