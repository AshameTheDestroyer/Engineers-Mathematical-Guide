import { useShadow } from "@/hooks/useShadow";
import { UserDTO } from "@/schemas/UserSchema";
import { useNavigate } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { FC, useImperativeHandle, useRef } from "react";
import { PROFILE_ROUTES } from "@/routes/profile.routes";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import default_avatar from "@images/default_avatar.png";

export type UserCardProps = ChildlessComponentProps<HTMLButtonElement> &
    Either<
        {
            isSkeleton?: false;
            user: UserDTO;
        },
        {
            isSkeleton: true;
            user?: Partial<UserDTO>;
        }
    >;

export const UserCard: FC<UserCardProps> = ({
    id,
    ref,
    user,
    className,
    isSkeleton,
}) => {
    const shadow = useShadow();
    const Navigate = useNavigate();
    const { direction, language } = useLocalization();

    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => buttonRef.current!);

    const buttonInformation = useElementInformation(buttonRef);

    return (
        <button
            id={id}
            ref={buttonRef}
            className={twMerge(
                isSkeleton
                    ? "animate-pulse"
                    : "cursor-pointer transition duration-200 focus-within:outline-2 focus-within:-outline-offset-1 [&:focus-within>:is(div,span)]:outline-2 [&:focus-within>:is(div,span)]:-outline-offset-1 [&:focus-within>:is(div,span)]:outline-black [&:is(:hover,:focus-within)]:scale-105",
                "bg-background-normal rounded-b-4xl relative flex flex-col gap-4 p-4",
                className
            )}
            style={{
                boxShadow: shadow,
                marginTop: buttonInformation.width / 2,
                paddingTop: buttonInformation.width / 2,
            }}
            role="region"
            tabIndex={isSkeleton ? -1 : 0}
            aria-label={isSkeleton ? undefined : user.username}
            onClick={(_e) =>
                !isSkeleton &&
                Navigate(
                    PROFILE_ROUTES.base.routes.profileID.MapVariable(
                        user.username
                    )
                )
            }
        >
            <div className="bg-background-normal absolute inset-x-0 bottom-[calc(50%-1.5rem)] rounded-full p-3">
                <Image
                    className={twJoin(
                        isSkeleton && "saturate-0",
                        "[&>img]:bg-background-dark-active rounded-full"
                    )}
                    source={user?.avatar ?? default_avatar}
                    alternative={`Avatar of ${user?.name}'s Profile.`}
                />
            </div>
            {(isSkeleton || user["day-streak"] > 365) && (
                <span
                    className={twJoin(
                        isSkeleton
                            ? "bg-background-normal-active"
                            : "bg-secondary-normal",
                        "absolute left-1/2 top-[calc(50%-1rem)] -translate-x-1/2 rounded-full px-6 py-2 font-bold text-white",
                        direction == "ltr"
                            ? "rounded-br-xl rounded-tl-xl"
                            : "rounded-bl-xl rounded-tr-xl"
                    )}
                >
                    <Typography
                        className={twJoin(
                            isSkeleton && "opacity-0",
                            "text-nowrap"
                        )}
                        variant="p"
                    >
                        +
                        {!isSkeleton
                            ? Intl.NumberFormat(
                                  language == "ar" ? "ar-UA" : "en-US",
                                  {
                                      unit: "year",
                                      style: "unit",
                                      unitDisplay: "long",
                                  }
                              )
                                  .format(~~(user["day-streak"] / 365))
                                  .toTitleCase()
                            : 9999}
                    </Typography>
                </span>
            )}
            <Typography
                className={twJoin(
                    isSkeleton && "opacity-0",
                    "overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-lg font-bold"
                )}
                dir="ltr"
                variant="legend"
            >
                {!isSkeleton ? `${user.name} ${user.surname}` : "..."}
            </Typography>
        </button>
    );
};
