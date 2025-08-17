import { FC } from "react";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { useGetCourses } from "@/services/Courses/useGetCourses";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/courses_page.json";

export const CoursesPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { searchQuery, setSearchQuery, debouncedSearchQuery } =
        useSchematicSearch();

    const {
        refetch,
        isError,
        isLoading,
        data: courses,
    } = useGetCourses(debouncedSearchQuery);

    const skeletonArray = new Array(20).fill(null);

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title={GetLocale(locales.title, language)}
                inputLabel={GetLocale(locales.inputs.search.label, language)}
            />
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
                    <CoursesDisplay courses={courses} />
                )}
            </Flexbox>
        </Flexbox>
    );
};
