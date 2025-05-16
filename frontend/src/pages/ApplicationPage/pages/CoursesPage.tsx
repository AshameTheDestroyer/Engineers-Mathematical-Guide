import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { Typography } from "@/components/Typography/Typography";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";

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
    }, [debouncedSearchQuery]);

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
                        searchQuery={debouncedSearchQuery?.trimAll()}
                    />
                </LazyComponent>
            </main>
        </Flexbox>
    );
};
