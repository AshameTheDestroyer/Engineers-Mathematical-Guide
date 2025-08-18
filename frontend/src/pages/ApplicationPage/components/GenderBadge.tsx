import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { GenderEnum } from "@/schemas/SignupSchema";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import male_icon from "@icons/male.svg";
import female_icon from "@icons/female.svg";

import locales from "@localization/profile_page.json";

export type GenderBadgeProps = ChildlessComponentProps<HTMLDivElement> & {
    gender: GenderEnum;
};

export const GenderBadge: FC<GenderBadgeProps> = ({
    id,
    ref,
    gender,
    className,
}) => {
    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                "place-self-center rounded-full px-2 py-1 text-white",
                gender == GenderEnum.male && "bg-blue-500",
                gender == GenderEnum.female && "bg-pink-500",
                className
            )}
            gap="2"
            placeItems="center"
        >
            <Icon source={{ male_icon, female_icon }[`${gender}_icon`]} />
            <Locale className="min-w-[6ch] text-center font-bold" variant="p">
                {locales.information.gender[gender]}
            </Locale>
        </Flexbox>
    );
};
