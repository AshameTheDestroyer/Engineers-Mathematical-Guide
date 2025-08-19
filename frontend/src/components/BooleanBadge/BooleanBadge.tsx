import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import error_icon from "@icons/variant_error.svg";
import success_icon from "@icons/variant_success.svg";

export type BooleanBadgeProps = ChildlessComponentProps<HTMLDivElement> & {
    value: boolean;
};

export const BooleanBadge: FC<BooleanBadgeProps> = ({
    id,
    ref,
    value,
    className,
}) => {
    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                "place-self-center rounded-full px-2 py-1 text-white",
                value ? "bg-vibrant-green-normal" : "bg-vibrant-red-normal",
                className
            )}
            gap="2"
            placeItems="center"
        >
            <Icon source={value ? success_icon : error_icon} />
            <Locale className="min-w-[5ch] text-center font-bold" variant="p">
                {value
                    ? {
                          en: "True",
                          ar: "صَحٌّ",
                      }
                    : {
                          en: "False",
                          ar: "خَطأٌ",
                      }}
            </Locale>
        </Flexbox>
    );
};
