import { FC } from "react";
import { Table } from "@/components/Table/Table";
import { Rating } from "@/components/Rating/Rating";
import { ZodGetKeys } from "@/functions/Zod.GetKeys";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { LearningTrackSchema } from "@/schemas/LearningTrackSchema";
import { useGetLearningTracks } from "@/services/LearningTracks/useGetLearningTracks";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/learning_track_dashboard_page.json";

export const LearningTrackDashboardPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { searchQuery, setSearchQuery, debouncedSearchQuery } =
        useSchematicSearch();

    const learningTracksQuery = useGetLearningTracks(debouncedSearchQuery);

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
                {...learningTracksQuery}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                keys={ZodGetKeys(LearningTrackSchema).filter(
                    (key) => !["detailed-description"].includes(key)
                )}
                keysClassNames={{
                    description:
                        "[&[role=cell]]:min-w-[32rem] [&[role=cell]]:text-wrap",
                    tags: "[&[role=cell]]:min-w-[40rem] [&[role=cell]]:text-wrap",
                }}
                prioritizedKeys={[
                    "image",
                    "title",
                    "id",
                    "description",
                    "rating",
                    "rating-count",
                    "specialized-count",
                    "courses-count",
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
                        case "specialized-count":
                            return Intl.NumberFormat(
                                language == "ar" ? "ar-UA" : "en-US",
                                {
                                    notation: "compact",
                                    compactDisplay: "short",
                                    maximumFractionDigits: 1,
                                }
                            ).format(value);
                    }
                }}
            />
        </Flexbox>
    );
};
