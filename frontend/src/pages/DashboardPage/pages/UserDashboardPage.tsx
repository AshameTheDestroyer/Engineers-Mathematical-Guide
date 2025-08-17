import { FC } from "react";
import { Table } from "@/components/Table/Table";
import { UserSchema } from "@/schemas/UserSchema";
import { ZodGetKeys } from "@/functions/Zod.GetKeys";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { useGetUsers } from "@/services/Users/useGetUsers";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";

export const UserDashboardPage: FC = () => {
    const { searchQuery, setSearchQuery, debouncedSearchQuery } =
        useSchematicSearch();

    const usersQuery = useGetUsers(debouncedSearchQuery);

    console.log(UserSchema._def);

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title="Users"
                inputLabel="Search"
                // title={GetLocale(locales.title, language)}
                // inputLabel={GetLocale(locales.inputs.search.label, language)}
            />

            <Table
                className="max-h-[calc(100dvh-14rem)] grow"
                {...usersQuery}
                searchQuery={searchQuery}
                keys={ZodGetKeys(UserSchema)}
                setSearchQuery={setSearchQuery}
            />
        </Flexbox>
    );
};
