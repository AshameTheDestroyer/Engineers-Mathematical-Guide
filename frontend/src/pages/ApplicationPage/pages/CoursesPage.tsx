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
    const { data } = useSchematicQuery({
        usesSuspense: true,
        schema: CourseSchema,
        queryKey: ["courses"],
        dummyData: dummy_data,
        requestTime: 0,
        usesSuspense: true,
        schema: CourseSchema,
        queryKey: ["courses"],
        queryFn: () => dummy_data,
        parseFn: (data, schema) => data?.map((datum) => schema.parse(datum)),
    });

    const { data: images } = useExtendedQuery({
        usesSuspense: true,
        queryKey: ["courses-images"],
        queryFn: () =>
            Promise.all(
                data.map(
                    async (datum) =>
                        [
                            datum.id,
                            datum.image != null
                                ? (await fetch(datum.image)).url
                                : undefined,
                        ] as const
                )
            ).then((entries) => Object.fromEntries(entries)),
    });

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
