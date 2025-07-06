import { FC, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { Title } from "@/components/Title/Title";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { IconButton } from "@/components/IconButton/IconButton";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import configure_icon from "@icons/cog.svg";

import minecraft_wallpaper from "@images/minecraft_wallpaper.jpg";
import hashem_wannous_avatar from "@images/hashem_wannous_avatar.png";

const user = {
    name: "Hashem Wannous",
    username: "ashamethedestroyer",
};

export const ProfileMainContent: FC = () => {
    const { direction } = useLocalization();
    const { isScreenSize } = useScreenSize();

    const profilePictureRef = useRef<HTMLDivElement>(null);
    const profilePictureRect = useElementInformation(profilePictureRef);

    return (
        <Flexbox variant="main" direction="column" gap="8">
            <Title>{user.name}</Title>
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
                    <Flexbox className="bg-primary-normal border-primary-dark border-3 h-full w-full overflow-hidden rounded-full p-2">
                        <Image
                            className="bg-background-normal border-3 rounded-full border-[inherit]"
                            source={hashem_wannous_avatar}
                            alternative={`Image of ${user.name}'s Profile.`}
                        />
                    </Flexbox>

                    <IconButton
                        className={twJoin(
                            "bottom-1/9 max-sm:[&>div:first-child]:p-2! absolute md:hidden",
                            direction == "ltr" ? "right-1/9" : "left-1/9"
                        )}
                        variant="primary"
                        icon={{ source: configure_icon }}
                        thickness={isScreenSize.sm ? "normal" : "thin"}
                    />
                </Flexbox>
                <Button
                    className={twJoin(
                        "absolute bottom-0 z-[1] translate-y-1/2 max-md:hidden",
                        direction == "ltr" ? "right-[6vw]" : "left-[6vw]"
                    )}
                    thickness="thick"
                    variant="primary"
                >
                    Edit Profile
                </Button>
                <Image
                    className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    source={minecraft_wallpaper}
                    alternative={`Image of ${user.name}'s Background.`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>

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
                    {user.name}
                </Typography>
                <Typography
                    className={twJoin(
                        direction == "rtl" ? "text-end" : "",
                        "text-primary-normal overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-xl font-bold max-md:text-center max-md:text-lg"
                    )}
                    dir="ltr"
                    variant="h2"
                >
                    @{user.username}
                </Typography>
            </Flexbox>
        </Flexbox>
    );
};
