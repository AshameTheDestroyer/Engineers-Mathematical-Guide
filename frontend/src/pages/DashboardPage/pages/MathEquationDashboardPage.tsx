import { FC } from "react";
import { Table } from "@/components/Table/Table";
import { ZodGetKeys } from "@/functions/Zod.GetKeys";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { MathEquationSchema } from "@/schemas/MathEquationSchema";
import { useGetMathEquations } from "@/services/MathEquations/useGetMathEquations";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/math_equation_dashboard_page.json";
import { MathExpression } from "@/components/MathExpression/MathExpression";
import { LevelTag } from "@/pages/DiscoverPage/components/LevelTag";

export const MathEquationDashboardPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { searchQuery, setSearchQuery, debouncedSearchQuery } =
        useSchematicSearch();

    const mathEquationsQuery = useGetMathEquations(debouncedSearchQuery);

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
                {...mathEquationsQuery}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                keys={ZodGetKeys(MathEquationSchema)}
                keysClassNames={{
                    description:
                        "[&[role=cell]]:w-[18rem] [&[role=cell]]:text-wrap",
                }}
                prioritizedKeys={[
                    "title",
                    "id",
                    "equation",
                    "description",
                    "level",
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
                        case "equation":
                            return <MathExpression>{value}</MathExpression>;
                        case "level":
                            return <LevelTag level={value} />;
                    }
                }}
            />
        </Flexbox>
    );
};
