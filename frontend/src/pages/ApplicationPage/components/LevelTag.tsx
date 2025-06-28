import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { MathEquationLevel } from "@/schemas/MathEquationSchema";
import { APPLICATION_ROUTES } from "@/routes/application.routes";

import medal_third_place_icon from "@icons/medal_third_place.svg";
import medal_first_place_icon from "@icons/medal_first_place.svg";
import medal_second_place_icon from "@icons/medal_second_place.svg";

const MEDAL_ICONS = {
    basic: medal_third_place_icon,
    advanced: medal_first_place_icon,
    intermediate: medal_second_place_icon,
} satisfies Record<MathEquationLevel, string>;

export type LevelTagProps = ChildlessComponentProps<HTMLButtonElement> & {
    level: MathEquationLevel;
};

export const LevelTag: FC<LevelTagProps> = ({ id, ref, level, className }) => {
    const Navigate = useNavigate();

    const variantClassName = {
        basic: "hover:bg-material-bronze-normal bg-material-bronze-light active:bg-material-bronze-dark",
        intermediate:
            "hover:bg-material-silver-normal bg-material-silver-light active:bg-material-silver-dark",
        advanced:
            "hover:bg-material-gold-normal bg-material-gold-light active:bg-material-gold-dark",
    } satisfies Record<MathEquationLevel, string>;

    return (
        <button
            id={id}
            ref={ref}
            className={twJoin(
                "relative flex cursor-pointer gap-2 rounded-full py-2 pl-4 pr-14 text-lg font-bold text-black duration-200",
                variantClassName[level],
                className
            )}
            onClick={(_e) =>
                Navigate(
                    APPLICATION_ROUTES.base.routes["math-equations"].absolute +
                        "?" +
                        new URLSearchParams({ query: level })
                )
            }
        >
            <p>{level.toTitleCase()}</p>
            <Icon
                className="border-3 absolute bottom-2 right-4 top-2 aspect-square translate-x-1 overflow-hidden rounded-full [&>svg]:h-full [&>svg]:w-full [&>svg]:translate-y-[-2px]"
                thickness={2}
                source={MEDAL_ICONS[level]}
            />
        </button>
    );
};
