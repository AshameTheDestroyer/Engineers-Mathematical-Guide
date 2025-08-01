import { FC, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { useColour } from "@/hooks/useColour";
import { UserDTO } from "@/schemas/UserSchema";
import { useNavigate } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { ProfileAvatar } from "@/pages/ApplicationPage/components/ProfileAvatar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

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
    isSkeleton?: boolean;
    student: UserDTO & { grade: number };
};

export const RankingBadge: FC<RankingBadgeProps> = ({
    rank,
    student,
    isSkeleton,
}) => {
    const Navigate = useNavigate();
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
                "bg-background-normal relative flex grow place-content-evenly gap-4 rounded-full p-2 transition duration-200 max-sm:gap-1",
                "[&_.icon]:text-background-normal",
                isSkeleton
                    ? "animate-pulse"
                    : "active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover [&:active_.icon]:text-background-normal-active [&:where(:hover,:focus-within)_.icon]:text-background-normal-hover cursor-pointer",
                !isSkeleton && classNames.button[rank - 1],
                !isSkeleton && classNames.bullet[rank - 1]
            )}
            tabIndex={isSkeleton ? -1 : 0}
            onClick={(_e) =>
                !isSkeleton &&
                Navigate(
                    APPLICATION_ROUTES.base.routes.profileID.MapVariable(
                        student.username
                    )
                )
            }
        >
            <Flexbox
                className={twJoin(
                    !isSkeleton && classNames.bullet[rank - 1],
                    direction == "ltr"
                        ? "-left-22 translate-x-[10%] max-sm:-left-10 max-sm:-ml-8"
                        : "-right-22 -translate-x-[10%] max-sm:-right-10 max-sm:-mr-8",
                    "max-sm:text-md absolute top-1/2 aspect-square h-[80%] -translate-y-1/2 text-lg"
                )}
                placeItems="center"
                placeContent="center"
            >
                {rank <= 3 && !isSkeleton ? (
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
            </Flexbox>
            <ProfileAvatar
                className={twJoin(
                    isSkeleton && "[&>div]:rotate-y-0! [&>div]:saturate-0",
                    "scale-70 aspect-square h-full bg-inherit"
                )}
                user={student}
                flipType="hover"
            />
            <Flexbox
                className={twJoin(isSkeleton && "opacity-0", "overflow-hidden")}
                direction="column"
                placeContent="start"
            >
                <Typography
                    className={twJoin(
                        direction == "ltr" ? "text-start" : "text-end",
                        "max-sm:text-md w-fit overflow-hidden text-ellipsis whitespace-nowrap text-start text-lg font-bold [direction:ltr]"
                    )}
                    variant="strong"
                >
                    {isSkeleton
                        ? "skeleton"
                        : `${student.name} ${student.surname ?? ""}`}
                </Typography>
                <Typography
                    className={twJoin(
                        direction == "ltr" ? "text-start" : "text-end",
                        "w-fit overflow-hidden text-ellipsis whitespace-nowrap text-start [direction:ltr]"
                    )}
                    variant="p"
                >
                    @{student.username}
                </Typography>
            </Flexbox>
            <Typography
                className={twJoin(
                    isSkeleton && "opacity-0",
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
