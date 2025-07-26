import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { useClipboard } from "@/hooks/useClipboard";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { Typography } from "@/components/Typography/Typography";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export type ProfileHeaderProps = {
    user: DetailedUserDTO;
    profilePictureRect: DOMRect;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({
    user,
    profilePictureRect,
}) => {
    const { direction } = useLocalization();
    const { isScreenSize } = useScreenSize();
    const { CopyToClipboard } = useClipboard();

    return (
        <Flexbox
            className="overflow-hidden md:mt-4"
            gap="4"
            direction="column"
            style={{
                marginTop: isScreenSize["max-sm"]
                    ? `calc(${profilePictureRect.height / 2}px - 3rem)`
                    : isScreenSize["max-md"]
                      ? `${profilePictureRect.height / 2}px`
                      : "0",
                marginRight:
                    isScreenSize.md && direction == "rtl"
                        ? `calc(${profilePictureRect.width}px + 8rem)`
                        : "0",
                marginLeft:
                    isScreenSize.md && direction == "ltr"
                        ? `calc(${profilePictureRect.left + profilePictureRect.width}px + 1rem)`
                        : "0",
            }}
        >
            <Flexbox
                className="max-md:place-content-center"
                alignItems="center"
                gap="4"
            >
                <Typography
                    className={twJoin(
                        direction == "rtl" ? "text-end" : "",
                        "overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-2xl font-bold max-md:text-xl"
                    )}
                    dir="ltr"
                    variant="h1"
                >
                    {user.name} {user.surname}
                </Typography>
                <img
                    className="h-[48px] translate-y-0 drop-shadow-[3px_3px_1px_#0000004c]"
                    src={`/flags/${user.flag}.svg`}
                    width={48}
                    height={48}
                />
            </Flexbox>
            <Typography
                className={twJoin(
                    direction == "rtl" ? "text-end" : "",
                    "text-primary-normal w-fit cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-xl font-bold max-md:place-self-center max-md:text-lg"
                )}
                dir="ltr"
                variant="h2"
                onClick={(_e) => CopyToClipboard(`@${user.username}`)}
            >
                @{user.username}
            </Typography>
        </Flexbox>
    );
};
