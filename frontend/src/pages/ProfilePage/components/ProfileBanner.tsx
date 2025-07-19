import { twJoin } from "tailwind-merge";
import { ProfileAvatar } from "./ProfileAvatar";
import { Image } from "@/components/Image/Image";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { FC, Ref, useImperativeHandle, useRef } from "react";
import { IconButton } from "@/components/IconButton/IconButton";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import configure_icon from "@icons/cog.svg";

import locales from "@localization/profile_page.json";

export type ProfileBannerProps = {
    user: DetailedUserDTO;
    profilePictureRef: Ref<HTMLDivElement>;
};

export const ProfileBanner: FC<ProfileBannerProps> = ({
    user,
    profilePictureRef: profilePictureRef_,
}) => {
    const { direction } = useLocalization();
    const { isScreenSize } = useScreenSize();
    const profilePictureRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(profilePictureRef_, () => profilePictureRef.current!);

    return (
        <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
            <Flexbox
                ref={profilePictureRef}
                className={twJoin(
                    "absolute bottom-0 z-[1] aspect-square h-[80%] w-min translate-y-1/2 max-md:-translate-x-1/2 max-sm:scale-75",
                    direction == "ltr"
                        ? "max-md:left-1/2 md:left-[6vw]"
                        : "max-md:left-1/2 md:right-[6vw]"
                )}
            >
                <ProfileAvatar
                    className="h-full w-full [&>div]:h-full [&>div]:w-full"
                    user={user}
                >
                    <IconButton
                        className={twJoin(
                            "max-sm:[&>div:first-child]:p-2! absolute bottom-[9%] max-sm:bottom-[8%] md:hidden",
                            direction == "ltr"
                                ? "right-[9%] max-sm:right-[8%]"
                                : "left-[9%] max-sm:left-[8%]"
                        )}
                        variant="primary"
                        icon={{ source: configure_icon }}
                        onClick={(e) => e.stopPropagation()}
                        thickness={isScreenSize.sm ? "normal" : "thin"}
                    />
                </ProfileAvatar>
            </Flexbox>
            <Button
                className={twJoin(
                    "absolute bottom-0 z-[1] translate-y-1/2 max-md:hidden",
                    direction == "ltr" ? "right-[6vw]" : "left-[6vw]"
                )}
                thickness="thick"
                variant="primary"
            >
                <Locale>{locales.buttons["edit-profile"]}</Locale>
            </Button>
            <Image
                className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                source={user.banner}
                alternative={`Image of ${user.name}'s Background.`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
        </figure>
    );
};
