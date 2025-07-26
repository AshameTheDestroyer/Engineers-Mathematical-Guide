import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { LearningTracksDisplay } from "../components/LearningTracksDisplay";
import { useGetLearningTracks } from "@/services/LearningTracks/useGetLearningTracks";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/learning_tracks_page.json";

export const LearningTracksQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
});

export const LearningTracksPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        LearningTracksQueryParamsSchema
    );

    const { language, GetLocale } = useLocalization();

    const [searchQuery, setSearchQuery] = useState(queryParams.query);
    const debouncedSearchQuery = useDebounce(searchQuery);

    const {
        refetch,
        isError,
        isLoading,
        data: learningTracks,
    } = useGetLearningTracks(debouncedSearchQuery);

    const skeletonArray = new Array(20).fill(null);

    useEffect(() => {
        setQueryParams((queryParams) => ({
            ...queryParams,
            query: debouncedSearchQuery.trimAll(),
        }));
    }, [debouncedSearchQuery]);

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <Flexbox
                rowGap="4"
                columnGap="8"
                variant="header"
                placeItems="center"
                placeContent="space-between"
                className="max-sm:flex-wrap"
            >
                <Locale variant="h1" className="text-xl font-bold">
                    {locales.title}
                </Locale>
                <Input
                    className="max-sm:grow"
                    name="query"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    label={<Locale>{locales.inputs.search.label}</Locale>}
                />
            </Flexbox>
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
