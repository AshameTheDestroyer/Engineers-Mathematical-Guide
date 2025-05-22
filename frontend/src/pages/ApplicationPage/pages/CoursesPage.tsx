import { z } from "zod";
import { queryClient } from "@/contexts";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { Typography } from "@/components/Typography/Typography";
import { useGetCourses } from "@/services/Courses/useGetCourses";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

export const CoursesQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
});

export const CoursesPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        CoursesQueryParamsSchema
    );

    const [searchQuery, setSearchQuery] = useState(queryParams?.query ?? "");
    const debouncedSearchQuery = useDebounce(searchQuery);

    const {
        refetch,
        isError,
        isLoading,
        data: courses,
    } = useGetCourses(debouncedSearchQuery);

    const skeletonCourses = new Array(20).fill(null);

    useEffect(() => {
        setQueryParams((queryParams) => ({
            ...queryParams,
            query: debouncedSearchQuery.trimAll(),
        }));

        queryClient.invalidateQueries({
            queryKey: ["courses"],
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
                    <CoursesDisplay isSkeleton courses={skeletonCourses} />
                ) : isError ? (
                    <SearchResultDisplay
                        state="error"
                        title="Error!"
                        Refetch={refetch}
                        resetButtonText="Refetch Courses"
                        searchQuery={debouncedSearchQuery}
                        paragraph="An error occurred while fetching courses, try refetching."
                    />
                ) : courses.length == 0 ? (
                    <SearchResultDisplay
                        state="not-found"
                        title="No Courses Found"
                        resetButtonText="Clear Search"
                        setSearchQuery={setSearchQuery}
                        searchQuery={debouncedSearchQuery}
                        paragraph={(searchQuery) =>
                            `The term **${searchQuery}** was not found, try searching for another thing.`
                        }
                    />
                ) : (
                    <CoursesDisplay courses={courses} />
                )}
            </Flexbox>
        </Flexbox>
    );
};
