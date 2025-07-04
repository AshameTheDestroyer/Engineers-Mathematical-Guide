import { FC, PropsWithChildren } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Icon, IconProps } from "@/components/Icon/Icon";
import { RichText } from "@/components/RichText/RichText";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import empty_icon from "@icons/empty.svg";
import network_error_icon from "@icons/network_error.svg";

export type SearchResultDisplayProps = {
    title: string;
    paragraph: string;
    buttons?: PropsWithChildren["children"];
} & Either<
    {
        iconType?: "error" | "empty" | "none";
    },
    {
        iconType: "custom";
        iconProps: IconProps;
    }
> &
    ChildlessComponentProps<HTMLDivElement>;

export const SearchResultDisplay: FC<SearchResultDisplayProps> = ({
    id,
    ref,
    title,
    buttons,
    iconProps,
    className,
    paragraph,
    iconType = "none",
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
            {iconType != "none" && (
                <Icon
                    width={128}
                    height={128}
                    {...(iconType == "custom" ? iconProps : {})}
                    source={
                        iconType == "empty"
                            ? empty_icon
                            : iconType == "error"
                              ? network_error_icon
                              : iconProps!.source
                    }
                />
            )}
            <Typography className="text-center text-xl font-bold" variant="h2">
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
                {paragraph}
            </RichText>

            {buttons}
        </Flexbox>
    );
};
