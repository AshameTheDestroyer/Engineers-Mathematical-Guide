import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { ProfileAvatar } from "./ProfileAvatar";
import { Image } from "@/components/Image/Image";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { DropDownList } from "@/components/DropDownList/DropDownList";
import { FC, Ref, useImperativeHandle, useMemo, useRef } from "react";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import configure_icon from "@icons/cog.svg";
import follow_icon from "@icons/user_plus.svg";
import unfollow_icon from "@icons/user_minus.svg";
import default_banner from "@images/default_banner.jpg";

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

    const { myUser } = useMain();
    const doIFollow = myUser?.followers.includes(user.username);

    const bannerHue = useMemo(
        () => (user?.username.hash() ?? 0) % 360,
        [user?.username]
    );

    const ActionButtons = () =>
        myUser?.username == user.username ? (
            <Button
                thickness="thick"
                variant="primary"
                onClick={(e) => e.stopPropagation()}
            >
                <Locale>{locales.buttons["edit-profile"]}</Locale>
            </Button>
        ) : (
            myUser != null && (
                <Button
                    thickness="thick"
                    onClick={(e) => e.stopPropagation()}
                    variant={doIFollow ? "error" : "success"}
                    icon={{
                        placement: "left",
                        source: doIFollow ? unfollow_icon : follow_icon,
                    }}
                >
                    <Locale>
                        {doIFollow
                            ? locales.buttons.unfollow
                            : locales.buttons.follow}
                    </Locale>
                </Button>
            )
        );

    return (
        <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
            <Flexbox
                ref={profilePictureRef}
                className={twJoin(
                    "absolute bottom-0 z-[1] aspect-square h-[80%] w-min translate-y-1/2 max-md:-translate-x-1/2",
                    direction == "ltr"
                        ? "max-md:left-1/2 md:left-[6vw]"
                        : "max-md:left-1/2 md:right-[6vw]"
                )}
            >
                <ProfileAvatar
                    className="h-full w-full max-sm:[&>div>div>div>img]:scale-75 [&>div]:h-full [&>div]:w-full"
                    user={user}
                >
                    <DropDownList
                        className={twJoin(
                            "max-sm:[&>div:first-child]:p-2! absolute bottom-[9%] max-sm:bottom-[19%] md:hidden",
                            direction == "ltr"
                                ? "right-[9%] max-sm:right-[19%]"
                                : "left-[9%] max-sm:left-[19%]"
                        )}
                        variant="primary"
                        icon={{ source: configure_icon }}
                        onClick={(e) => e.stopPropagation()}
                        thickness={isScreenSize.sm ? "normal" : "thin"}
                        position={
                            direction == "ltr" ? "bottom-end" : "bottom-start"
                        }
                    >
                        <ActionButtons />
                    </DropDownList>
                </ProfileAvatar>
            </Flexbox>
            <ButtonBox
                className={twJoin(
                    "absolute bottom-0 z-[1] translate-y-1/2 place-items-center max-md:hidden",
                    direction == "ltr" ? "right-[6vw]" : "left-[6vw]"
                )}
            >
                <ActionButtons />
            </ButtonBox>
            <Image
                className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                source={user.banner ?? default_banner}
                alternative={`Image of ${user.name}'s Background.`}
                style={{
                    filter:
                        user.banner == null
                            ? `hue-rotate(${bannerHue}deg)`
                            : "",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
        </figure>
    );
};
