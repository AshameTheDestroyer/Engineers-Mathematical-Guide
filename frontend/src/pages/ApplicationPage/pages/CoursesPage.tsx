import { z } from "zod";
import { queryClient } from "@/contexts";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";
import {
    useGetCourses,
    GET_COURSES_KEY,
} from "@/services/Courses/useGetCourses";

import locales from "@localization/courses_page.json";

export const CoursesQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
});

export const CoursesPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        CoursesQueryParamsSchema
    );

    const { language, GetLocale } = useLocalization();

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
                <Locale variant="h1" className="text-2xl font-bold">
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
            <Flexbox className="grow" variant="main">
                {isLoading || courses == null ? (
                    <CoursesDisplay isSkeleton courses={skeletonArray} />
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
                ) : courses.length == 0 ? (
                    <SearchResultDisplay
                        className="grow"
                        iconType="search-off"
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
                    <CoursesDisplay courses={courses} />
                )}
            </Flexbox>
        </Flexbox>
    );
};
