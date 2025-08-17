import { FC } from "react";
import { Table } from "@/components/Table/Table";
import { UserSchema } from "@/schemas/UserSchema";
import { ZodGetKeys } from "@/functions/Zod.GetKeys";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { useGetUsers } from "@/services/Users/useGetUsers";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/user_dashboard_page.json";

export const UserDashboardPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const { searchQuery, setSearchQuery, debouncedSearchQuery } =
        useSchematicSearch();

    const usersQuery = useGetUsers(debouncedSearchQuery);

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title={GetLocale(locales.title, language)}
                inputLabel={GetLocale(locales.inputs.search.label, language)}
            />

            <Table
                className="max-h-[calc(100dvh-14rem)] grow"
                {...usersQuery}
                searchQuery={searchQuery}
                keys={ZodGetKeys(UserSchema)}
                setSearchQuery={setSearchQuery}
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
            />
        </Flexbox>
    );
};
