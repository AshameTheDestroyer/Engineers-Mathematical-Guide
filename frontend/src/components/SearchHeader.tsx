import { Input } from "./Input/Input";
import { twMerge } from "tailwind-merge";
import { Flexbox } from "./Flexbox/Flexbox";
import { Typography } from "./Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";

export type SearchHeaderProps = ChildlessComponentProps<HTMLDivElement> & {
    title: string;
    inputLabel: string;
    searchQuery: string;
    withoutSearchInput?: boolean;
    buttons?: PropsWithChildren["children"];
    setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const SearchHeader: FC<SearchHeaderProps> = ({
    id,
    ref,
    title,
    buttons,
    className,
    inputLabel,
    searchQuery,
    setSearchQuery,
    withoutSearchInput,
}) => {
    return (
        <Flexbox
            id={id}
            ref={ref}
            rowGap="4"
            columnGap="8"
            variant="header"
            placeItems="center"
            placeContent="space-between"
            className={twMerge("max-sm:flex-wrap", className)}
        >
            <Flexbox gap="4">
                <Typography variant="h1" className="text-2xl font-bold">
                    {title}
                </Typography>

                {buttons}
            </Flexbox>

            {!withoutSearchInput && (
                <Input
                    className="max-sm:grow"
                    name="query"
                    type="search"
                    label={inputLabel}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            )}
        </Flexbox>
    );
};
