import { z } from "zod";
import { queryClient } from "@/contexts";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { CourseDTO } from "@/schemas/CourseSchema";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { Typography } from "@/components/Typography/Typography";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";

import courses_dummy_data from "../pages/courses.dummy.json";

export const CoursesQueryParamsSchema = z.object({
    query: z.string().optional(),
});

export const CoursesPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        CoursesQueryParamsSchema
    );

    const [searchQuery, setSearchQuery] = useState(queryParams?.query);
    const debouncedSearchQuery = useDebounce(searchQuery);

    useEffect(() => {
        setQueryParams((queryParams) => ({
            ...queryParams,
            query: debouncedSearchQuery?.trimAll(),
        }));
        queryClient.invalidateQueries({
            queryKey: ["courses"],
        });
    }, [debouncedSearchQuery]);

    function FilterBySearchQuery(course: CourseDTO) {
        const searchQuery = debouncedSearchQuery?.trimAll();
        if (searchQuery == null || searchQuery == "") {
            return true;
        }

        const terms = searchQuery.toLowerCase().split(" ");
        return terms.some(
            (term) =>
                course.title.toLowerCase().includes(term) ||
                course.tags.some((tag) =>
                    tag
                        .toLocaleLowerCase()
                        .split(" ")
                        .some((word) => word.includes(term))
                )
        );
    }

    return (
        <Flexbox variant="main" direction="column" gap="8">
            <Flexbox
                variant="header"
                placeItems="center"
                placeContent="space-between"
            >
                <Typography variant="h1" className="text-2xl font-bold">
                    Courses
                </Typography>
                <Input
                    type="search"
                    name="query"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Flexbox>
            <main>
                <LazyComponent skeleton={<CoursesDisplay isSkeleton />}>
                    <CoursesDisplay
                        queryFn={() =>
                            courses_dummy_data.filter(FilterBySearchQuery)
                        }
                    />
                </LazyComponent>
            </main>
        </Flexbox>
    );
};
