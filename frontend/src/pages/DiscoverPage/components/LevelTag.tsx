import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon/Icon";
import { Locale } from "@/components/Locale/Locale";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { MathEquationLevel } from "@/schemas/MathEquationSchema";
import { MathEquationsModeEnum } from "../pages/MathEquationsPage";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import medal_third_place_icon from "@icons/medal_third_place.svg";
import medal_first_place_icon from "@icons/medal_first_place.svg";
import medal_second_place_icon from "@icons/medal_second_place.svg";

import locales from "@localization/math_equations_page.json";

const MEDAL_ICONS = {
    basic: medal_third_place_icon,
    advanced: medal_first_place_icon,
    intermediate: medal_second_place_icon,
} satisfies Record<MathEquationLevel, string>;

export type LevelTagProps = ChildlessComponentProps<HTMLAnchorElement> & {
    level: MathEquationLevel;
};

export const LevelTag: FC<LevelTagProps> = ({ id, ref, level, className }) => {
    const { direction } = useLocalization();

    const variantClassName = {
        basic: "hover:bg-material-bronze-normal bg-material-bronze-light active:bg-material-bronze-dark",
        intermediate:
            "hover:bg-material-silver-normal bg-material-silver-light active:bg-material-silver-dark",
        advanced:
            "hover:bg-material-gold-normal bg-material-gold-light active:bg-material-gold-dark",
    } satisfies Record<MathEquationLevel, string>;

    return (
        <Link
            id={id}
            ref={ref}
            className={twJoin(
                direction == "ltr" ? "pl-4 pr-14" : "pl-14 pr-4",
                "relative flex cursor-pointer gap-2 rounded-full py-2 text-lg font-bold text-black duration-200",
                variantClassName[level],
                className
            )}
            to={
                DISCOVER_ROUTES.base.routes["math-equations"].absolute +
                "?" +
                new URLSearchParams({
                    query: level,
                    mode: MathEquationsModeEnum.cards,
                })
            }
        >
            <Locale variant="p">{locales.card["level-tag"][level]}</Locale>
            <Icon
                className={twJoin(
                    direction == "ltr"
                        ? "right-4 translate-x-1"
                        : "left-4 -translate-x-1",
                    "border-3 absolute bottom-2 top-2 aspect-square overflow-hidden rounded-full [&>svg]:h-full [&>svg]:w-full [&>svg]:translate-y-[-2px]"
                )}
                thickness={2}
                source={MEDAL_ICONS[level]}
            />
        </Link>
    );
};
