import { useShadow } from "@/hooks/useShadow";
import { UserDTO } from "@/schemas/UserSchema";
import { useNavigate } from "react-router-dom";
import { ProfileAvatar } from "./ProfileAvatar";
import { twJoin, twMerge } from "tailwind-merge";
import { FC, useImperativeHandle, useRef } from "react";
import { PROFILE_ROUTES } from "@/routes/profile.routes";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

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
    const fireShadow = useShadow("var(--color-secondary-normal)");

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
                    : "[&:focus-within>:is(div,span)]:outline-foreground-darker cursor-pointer transition duration-200 focus-within:outline-2 focus-within:-outline-offset-1 [&:focus-within>:is(div,span)]:outline-2 [&:focus-within>:is(div,span)]:-outline-offset-1 [&:is(:hover,:focus-within)]:scale-105",
                "bg-background-normal rounded-b-4xl relative flex flex-col gap-4 p-4",
                className
            )}
            style={{
                paddingTop: buttonInformation.width / 2,
                marginTop: `calc(${buttonInformation.width / 2}px + 1rem)`,
                boxShadow:
                    ~~((user?.["day-streak"] ?? 0) / 365) > 0
                        ? fireShadow
                        : shadow,
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
            <ProfileAvatar
                className={twJoin(
                    isSkeleton && "[&>div]:rotate-y-0! [&>div]:saturate-0",
                    "[&_img]:bg-background-dark-active! bg-background-normal absolute inset-x-0 bottom-[calc(50%-1.75rem)] aspect-square w-full rounded-full [&>div]:inset-6"
                )}
                flipType="hover"
                user={user as UserDTO}
            />
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
