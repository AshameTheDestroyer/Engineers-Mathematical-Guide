import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { LearningTracksDisplay } from "../components/LearningTracksDisplay";
import { useGetLearningTracks } from "@/services/LearningTracks/useGetLearningTracks";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

export const LearningTracksQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
});

export const LearningTracksPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        LearningTracksQueryParamsSchema
    );

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
                <Typography variant="h1" className="text-xl font-bold">
                    Learning Tracks
                </Typography>
                <Input
                    className="max-sm:grow"
                    name="query"
                    type="search"
                    label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                        title="Error!"
                        iconType="error"
                        paragraph="An error occurred while fetching learning tracks, try refetching."
                        buttons={
                            <Button onClick={(_e) => refetch()}>
                                Refetch Learning Tracks
                            </Button>
                        }
                    />
                ) : learningTracks.length == 0 ? (
                    <SearchResultDisplay
                        className="grow"
                        iconType="empty"
                        title="No Courses Found"
                        paragraph={`The term **${debouncedSearchQuery}** was not found, try searching for another thing.`}
                        buttons={
                            <Button onClick={(_e) => setSearchQuery("")}>
                                Clear Search
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
