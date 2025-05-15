import { FC, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { useColour } from "@/hooks/useColour";
import { Typography } from "@/components/Typography/Typography";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import user_icon from "@icons/user.svg";
import medal_third_place_icon from "@icons/medal_third_place.svg";
import medal_first_place_icon from "@icons/medal_first_place.svg";
import medal_second_place_icon from "@icons/medal_second_place.svg";

const MEDAL_ICONS = [
    medal_first_place_icon,
    medal_second_place_icon,
    medal_third_place_icon,
];

export type RankingBadgeProps = {
    rank: number;
    // TODO: Create Student Schema.
    student: {
        email: string;
        username: string;
        name: string;
        gender: string;
        country: string;
        phoneNumber: string;
        surname: string;
        grade: number;
    };
};

export const RankingBadge: FC<RankingBadgeProps> = ({ rank, student }) => {
    const { direction } = useLocalization();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const classNames = {
        button: [
            "bg-material-gold-light active:bg-material-gold-dark [&:where(:hover,:focus-within)]:bg-material-gold-normal",
            "bg-material-silver-light active:bg-material-silver-dark [&:where(:hover,:focus-within)]:bg-material-silver-normal",
            "bg-material-bronze-light active:bg-material-bronze-dark [&:where(:hover,:focus-within)]:bg-material-bronze-normal",
        ],
        bullet: [
            "[&_.icon]:text-material-gold-light [&:active_.icon]:text-material-gold-dark [&:where(:hover,:focus-within)_.icon]:text-material-gold-normal",
            "[&_.icon]:text-material-silver-light [&:active_.icon]:text-material-silver-dark [&:where(:hover,:focus-within)_.icon]:text-material-silver-normal",
            "[&_.icon]:text-material-bronze-light [&:active_.icon]:text-material-bronze-dark [&:where(:hover,:focus-within)_.icon]:text-material-bronze-normal",
        ],
    };

    const { isDarkColour } = useColour({
        updateDelay: 250,
        reference: buttonRef,
        className: classNames.button[rank - 1],
    });

    return (
        <button
            ref={buttonRef}
            className={twJoin(
                direction == "ltr"
                    ? "ml-22 max-sm:ml-10"
                    : "mr-22 max-sm:mr-10",
                isDarkColour ? "text-white" : "text-black",
                "bg-background-normal active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover relative flex grow cursor-pointer place-content-evenly gap-4 rounded-full p-2 transition duration-200",
                "[&_.icon]:text-background-normal [&:active_.icon]:text-background-normal-active [&:where(:hover,:focus-within)_.icon]:text-background-normal-hover",
                classNames.button[rank - 1],
                classNames.bullet[rank - 1],
                isDarkColour ? "text-white" : "text-black"
            )}
        >
            <div
                className={twJoin(
                    classNames.bullet[rank - 1],
                    direction == "ltr"
                        ? "-left-22 translate-x-[10%] max-sm:-left-10 max-sm:-ml-8"
                        : "-right-22 -translate-x-[10%] max-sm:-right-10 max-sm:-mr-8",
                    "max-sm:text-md absolute top-1/2 flex aspect-square h-[80%] -translate-y-1/2 place-content-center place-items-center text-lg"
                )}
            >
                {rank <= 3 ? (
                    <Icon
                        className="border-3 h-full w-full overflow-hidden rounded-full transition duration-200 max-sm:scale-75 [&>svg]:h-full [&>svg]:w-full [&>svg]:-translate-y-1"
                        thickness={1.5}
                        source={MEDAL_ICONS[rank - 1]}
                    />
                ) : (
                    <Typography
                        className="text-foreground-darker font-semibold not-italic"
                        variant="i"
                    >
                        #{rank}
                    </Typography>
                )}
            </div>
            <div className="bg-background-light -m-0.5 aspect-square rounded-[inherit] p-2 transition duration-200">
                {
                    // TODO: Add avatars.
                    // student.avatar != null ? (
                    //     <Image
                    //         className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    //         source={course.image}
                    //         alternative={`Image of ${course.title} Course.`}
                    //     />
                    // ) : (
                    <Icon
                        className="h-full w-full transition duration-200 [&>svg]:h-full [&>svg]:w-full"
                        source={user_icon}
                    />
                    // )
                }
            </div>
            <div className="flex flex-col overflow-hidden">
                <Typography
                    className="max-sm:text-md overflow-hidden text-ellipsis whitespace-nowrap text-start text-lg font-bold"
                    variant="strong"
                >
                    {`${student.name} ${student.surname}`}
                </Typography>
                <Typography
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-start"
                    variant="p"
                >
                    @{student.username} {colourHex}
                </Typography>
            </div>
            <Typography
                className={twJoin(
                    direction == "ltr"
                        ? "ml-auto mr-2 max-sm:mr-1"
                        : "ml-2 mr-auto max-sm:ml-1",
                    "max-sm:text-md flex aspect-square place-content-center place-items-center text-lg font-bold"
                )}
                variant="em"
            >
                {Math.round(student.grade)}%
            </Typography>
        </button>
    );
};
