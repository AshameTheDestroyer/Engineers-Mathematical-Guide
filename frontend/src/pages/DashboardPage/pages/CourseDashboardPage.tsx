import { FC } from "react";
import { Table } from "@/components/Table/Table";
import { Rating } from "@/components/Rating/Rating";
import { ZodGetKeys } from "@/functions/Zod.GetKeys";
import { CourseSchema } from "@/schemas/CourseSchema";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { useGetCourses } from "@/services/Courses/useGetCourses";
import { BooleanBadge } from "@/components/BooleanBadge/BooleanBadge";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/course_dashboard_page.json";

export const CourseDashboardPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { searchQuery, setSearchQuery, debouncedSearchQuery } =
        useSchematicSearch();

    const coursesQuery = useGetCourses(debouncedSearchQuery);

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title={GetLocale(locales.title, language)}
                inputLabel={GetLocale(locales.inputs.search.label, language)}
            />

            <Table
                className="max-h-[calc(100dvh-15rem)] grow [&_.cell[role=cell]]:place-content-center [&_.cell[role=cell]]:place-items-center"
                {...coursesQuery}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                keys={ZodGetKeys(CourseSchema)}
                keysClassNames={{
                    description:
                        "[&[role=cell]]:w-[32rem] [&[role=cell]]:text-wrap",
                    tags: "[&[role=cell]]:w-[32rem] [&[role=cell]]:text-wrap",
                }}
                prioritizedKeys={[
                    "image",
                    "title",
                    "id",
                    "description",
                    "rating",
                    "rating-count",
                    "enrollment-count",
                    "locked",
                    "tags",
                ]}
                loadingTypography={{
                    title: GetLocale(locales.table.loading.title, language),
                    paragraph: GetLocale(
                        locales.table.loading.paragraph,
                        language
                    ),
                }}
                errorTypography={{
                    title: GetLocale(locales.table.error.title, language),
                    button: GetLocale(locales.table.error.button, language),
                    paragraph: GetLocale(
                        locales.table.error.paragraph,
                        language
                    ),
                }}
                emptyTypography={{
                    title: GetLocale(locales.table.empty.title, language),
                    button: GetLocale(locales.table.empty.button, language),
                    paragraph: GetLocale(
                        locales.table.empty.paragraph,
                        language
                    ).replace(/\*\*([^\*]+)\*\*/, `**"${searchQuery}"**`),
                }}
                CellRenders={({ key, value }) => {
                    switch (key) {
                        case "rating":
                            return (
                                <Rating
                                    value={value}
                                    iconProps={{
                                        width: 20,
                                        height: 20,
                                        stroke: "black",
                                    }}
                                />
                            );
                        case "rating-count":
                        case "enrollment-count":
                            return Intl.NumberFormat(
                                language == "ar" ? "ar-UA" : "en-US",
                                {
                                    notation: "compact",
                                    compactDisplay: "short",
                                    maximumFractionDigits: 1,
                                }
                            ).format(value);
                        case "locked":
                            return <BooleanBadge value={value} />;
                    }
                }}
            />
        </Flexbox>
    );
};
