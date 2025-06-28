import { z } from "zod";
import { queryClient } from "@/contexts";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { Typography } from "@/components/Typography/Typography";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";
import {
    useGetCourses,
    GET_COURSES_KEY,
} from "@/services/Courses/useGetCourses";

export const CoursesQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
});

export const CoursesPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        CoursesQueryParamsSchema
    );

    const [searchQuery, setSearchQuery] = useState(queryParams.query);
    const debouncedSearchQuery = useDebounce(searchQuery);

    const {
        refetch,
        isError,
        isLoading,
        data: courses,
    } = useGetCourses(debouncedSearchQuery);

    const skeletonArray = new Array(20).fill(null);

    useEffect(() => {
        setQueryParams((queryParams) => ({
            ...queryParams,
            query: debouncedSearchQuery.trimAll(),
        }));

        queryClient.invalidateQueries({
            queryKey: [GET_COURSES_KEY],
        });
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
                <Typography variant="h1" className="text-2xl font-bold">
                    Courses
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
            <Flexbox className="grow" variant="main">
                {isLoading || courses == null ? (
                    <CoursesDisplay isSkeleton courses={skeletonArray} />
                ) : isError ? (
                    <SearchResultDisplay
                        className="grow"
                        title="Error!"
                        iconType="error"
                        paragraph="An error occurred while fetching courses, try refetching."
                        buttons={
                            <Button onClick={(_e) => refetch()}>
                                Refetch Courses
                            </Button>
                        }
                    />
                ) : courses.length == 0 ? (
                    <SearchResultDisplay
                        className="grow"
                        iconType="search-off"
                        title="No Courses Found"
                        paragraph={`The term **${debouncedSearchQuery}** was not found, try searching for another thing.`}
                        buttons={
                            <Button onClick={(_e) => setSearchQuery("")}>
                                Clear Search
                            </Button>
                        }
                    />
                ) : (
                    <CoursesDisplay courses={courses} />
                )}
            </Flexbox>
        </Flexbox>
    );
};
