import { z } from "zod";
import { queryClient } from "@/contexts";
import { Icon } from "@/components/Icon/Icon";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { RichText } from "@/components/RichText/RichText";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { Typography } from "@/components/Typography/Typography";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";

import search_off_icon from "@icons/search_off.svg";

export const CoursesQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
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
                <LazyComponent skeleton={<CoursesDisplay isSkeleton />}>
                    <CoursesDisplay
                        searchQuery={debouncedSearchQuery}
                        emptyQueryDisplay={
                            <Flexbox
                                gap="4"
                                className="grow"
                                direction="column"
                                placeItems="center"
                                placeContent="center"
                            >
                                <Icon
                                    source={search_off_icon}
                                    width={128}
                                    height={128}
                                />
                                <Typography
                                    className="text-xl font-bold"
                                    variant="h2"
                                >
                                    No Course Found
                                </Typography>
                                <RichText
                                    variant="p"
                                    className="text-center"
                                    ExtractedTextRenders={(text) => (
                                        <span className="text-primary-normal font-bold">
                                            {text}
                                        </span>
                                    )}
                                >
                                    {`The term **${debouncedSearchQuery}** was not found, try searching for another thing.`}
                                </RichText>
                                <Button onClick={(_e) => setSearchQuery("")}>
                                    Reset Search
                                </Button>
                            </Flexbox>
                        }
                    />
                </LazyComponent>
            </Flexbox>
        </Flexbox>
    );
};
