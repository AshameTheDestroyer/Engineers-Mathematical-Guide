import { Icon } from "@/components/Icon/Icon";
import { Button } from "@/components/Button/Button";
import { Dispatch, FC, SetStateAction } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { RichText } from "@/components/RichText/RichText";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import search_off_icon from "@icons/search_off.svg";
import network_error_icon from "@icons/network_error.svg";

export type SearchResultDisplayProps = {
    title: string;
    searchQuery: string;
    resetButtonText: string;
    paragraph: string | ((searchQuery: string) => string);
} & Either<
    {
        state: "not-found";
        setSearchQuery: Dispatch<SetStateAction<string>>;
    },
    {
        state: "error";
        Refetch: () => void;
    }
> &
    ChildlessComponentProps<HTMLDivElement>;

export const SearchResultDisplay: FC<SearchResultDisplayProps> = ({
    id,
    ref,
    state,
    title,
    Refetch,
    className,
    paragraph,
    searchQuery,
    setSearchQuery,
    resetButtonText,
}) => {
    return (
        <Flexbox
            id={id}
            ref={ref}
            className={className}
            gap="4"
            direction="column"
            placeItems="center"
            placeContent="center"
        >
            <Icon
                width={128}
                height={128}
                source={
                    state == "not-found" ? search_off_icon : network_error_icon
                }
            />
            <Typography className="text-xl font-bold" variant="h2">
                {title}
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
                {paragraph instanceof Function
                    ? paragraph(searchQuery)
                    : paragraph}
            </RichText>
            <Button
                onClick={(_e) =>
                    state == "not-found" ? setSearchQuery("") : Refetch()
                }
            >
                {resetButtonText}
            </Button>
        </Flexbox>
    );
};
