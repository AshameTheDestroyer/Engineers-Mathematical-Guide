import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { UserDTO } from "@/schemas/UserSchema";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import fire_icon from "@icons/fire.svg";
import locales from "@localization/profile_page.json";

export type DayStreakBadgeProps = ChildlessComponentProps<HTMLDivElement> & {
    user: UserDTO;
};

export const DayStreakBadge: FC<DayStreakBadgeProps> = ({
    id,
    ref,
    user,
    className,
}) => {
    const { direction, language, GetGenderedLocale } = useLocalization();

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twJoin(
                "bg-secondary-normal place-self-center rounded-full px-6 py-2 font-bold text-white",
                direction == "ltr"
                    ? "rounded-br-xl rounded-tl-xl md:ml-auto"
                    : "rounded-bl-xl rounded-tr-xl md:mr-auto",
                className
            )}
            gap="2"
            placeItems="center"
            placeContent="space-between"
        >
            <Icon source={fire_icon} />
            <Typography className="text-nowrap" variant="p">
                {user["day-streak"]}{" "}
                {GetGenderedLocale(
                    locales.information.streak,
                    language,
                    user.gender
                )}
            </Typography>
        </Flexbox>
    );
};
