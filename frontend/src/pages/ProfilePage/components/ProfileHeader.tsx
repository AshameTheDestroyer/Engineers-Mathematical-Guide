import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { useClipboard } from "@/hooks/useClipboard";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import profile_dummy_data from "@data/profile.dummy.json";

export type ProfileHeaderProps = {
    profilePictureRect: DOMRect;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({
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
                marginTop: isScreenSize["max-md"]
                    ? `${profilePictureRect.height / 2}px`
                    : "0",
                marginRight:
                    isScreenSize.md && direction == "rtl"
                        ? `calc(${profilePictureRect.width}px + 5rem)`
                        : "0",
                marginLeft:
                    isScreenSize.md && direction == "ltr"
                        ? `calc(${profilePictureRect.left + profilePictureRect.width}px + 1rem)`
                        : "0",
            }}
        >
            <Typography
                className={twJoin(
                    direction == "rtl" ? "text-end" : "",
                    "overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-2xl font-bold max-md:text-center max-md:text-xl"
                )}
                dir="ltr"
                variant="h1"
            >
                {profile_dummy_data.name}
            </Typography>
            <Typography
                className={twJoin(
                    direction == "rtl" ? "text-end" : "",
                    "text-primary-normal cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-xl font-bold max-md:text-center max-md:text-lg"
                )}
                dir="ltr"
                variant="h2"
                onClick={(_e) =>
                    CopyToClipboard(`@${profile_dummy_data.username}`)
                }
            >
                @{profile_dummy_data.username}
            </Typography>
        </Flexbox>
    );
};
