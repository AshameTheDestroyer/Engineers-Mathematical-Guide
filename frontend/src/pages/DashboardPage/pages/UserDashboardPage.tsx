import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { Table } from "@/components/Table/Table";
import { UserSchema } from "@/schemas/UserSchema";
import { GenderEnum } from "@/schemas/SignupSchema";
import { ZodGetKeys } from "@/functions/Zod.GetKeys";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { useGetUsers } from "@/services/Users/useGetUsers";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { Typography } from "@/components/Typography/Typography";
import { ProfileAvatar } from "@/pages/ApplicationPage/components/ProfileAvatar";
import { DayStreakBadge } from "@/pages/ApplicationPage/components/DayStreakBadge";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import male_icon from "@icons/male.svg";
import female_icon from "@icons/female.svg";

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
                className="max-h-[calc(100dvh-14rem)] grow [&_.cell[role=cell]]:place-content-center [&_.cell[role=cell]]:place-items-center"
                {...usersQuery}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                keys={ZodGetKeys(UserSchema).filter(
                    (key) => !["personal-image"].includes(key)
                )}
                prioritizedKeys={[
                    "avatar",
                    "name",
                    "surname",
                    "username",
                    "email",
                    "flag",
                    "country",
                    "day-streak",
                    "phone-number",
                    "gender",
                ]}
                keysClassNames={{
                    username: "[&[role=cell]]:[direction:ltr]",
                    "phone-number": "[&[role=cell]]:[direction:ltr]",
                    avatar: "[&[role=cell]]:place-content-center [&[role=cell]]:place-items-center",
                    flag: "[&[role=cell]]:place-content-center [&[role=cell]]:place-items-center grow min-w-max",
                }}
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
                CellRenders={({ key, value }, datum) => {
                    switch (key) {
                        case "flag":
                            return (
                                <img
                                    className="w-[64px] drop-shadow-[3px_3px_1px_#0000004c]"
                                    src={`/flags/${value}.svg`}
                                    width={64}
                                    height={64}
                                />
                            );
                        case "avatar":
                            return (
                                <ProfileAvatar
                                    className="scale-65 -m-3 aspect-square h-24"
                                    user={datum}
                                />
                            );
                        case "day-streak":
                            return <DayStreakBadge user={datum} />;
                        case "username":
                            return `@${value}`;
                        case "gender":
                            return (
                                <Flexbox
                                    className={twJoin(
                                        "rounded-2xl px-2 py-1 text-white",
                                        value == GenderEnum.male &&
                                            "bg-blue-500",
                                        value == GenderEnum.female &&
                                            "bg-pink-500"
                                    )}
                                    gap="2"
                                    placeItems="center"
                                    placeContent="space-between"
                                >
                                    <Icon
                                        source={
                                            { male_icon, female_icon }[
                                                `${value}_icon`
                                            ]
                                        }
                                    />
                                    <Typography
                                        className="min-w-[6ch] text-center font-bold"
                                        variant="p"
                                    >
                                        {value.toTitleCase()}
                                    </Typography>
                                </Flexbox>
                            );
                    }
                }}
            />
        </Flexbox>
    );
};
