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
import { FilterBySearchQuery } from "../functions/FilterBySearchQuery";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";

import search_off_icon from "@icons/search_off.svg";
import courses_dummy_data from "../pages/courses.dummy.json";

export const CoursesQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
});

export const CoursesPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        CoursesQueryParamsSchema
    );

    const [searchQuery, setSearchQuery] = useState(queryParams?.query ?? "");
    const debouncedSearchQuery = useDebounce(searchQuery);

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
                <LazyComponent skeleton={<CoursesDisplay isSkeleton />}>
                    <CoursesDisplay
                        queryFn={() =>
                            courses_dummy_data.filter((course) =>
                                FilterBySearchQuery(
                                    course,
                                    debouncedSearchQuery
                                )
                            )
                        }
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
