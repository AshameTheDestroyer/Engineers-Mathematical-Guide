import { FC, Fragment } from "react";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { Gender } from "@/schemas/SignupSchema";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Separator } from "@/components/Separator/Separator";
import { Typography } from "@/components/Typography/Typography";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import user_icon from "@icons/user.svg";
import fire_icon from "@icons/fire.svg";
import location_icon from "@icons/location.svg";
import electricity_icon from "@icons/electricity.svg";
import progress_arrow_icon from "@icons/progress_arrow.svg";
import graduation_cap_icon from "@/assets/icons/graduation_cap.svg";

import locales from "@localization/profile_page.json";
import profile_dummy_data from "@data/profile.dummy.json";

export type ProfileInformationProps = {
    profilePictureRect: DOMRect;
};

export const ProfileInformation: FC<ProfileInformationProps> = ({
    profilePictureRect,
}) => {
    const { isDarkThemed } = useThemeMode();
    const { isScreenSize } = useScreenSize();
    const { direction, language, GetGenderedLocale } = useLocalization();

    const followersText =
        Intl.NumberFormat(language == "ar" ? "ar-UA" : "en-US", {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1,
        }).format(profile_dummy_data.followers) +
        " " +
        GetGenderedLocale(
            locales.information.followers,
            language,
            profile_dummy_data.gender as Gender
        );

    const followeesText =
        Intl.NumberFormat(language == "ar" ? "ar-UA" : "en-US", {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1,
        }).format(profile_dummy_data.followees) +
        " " +
        GetGenderedLocale(
            locales.information.followees,
            language,
            profile_dummy_data.gender as Gender
        );

    const experienceText =
        profile_dummy_data.userRating +
        " " +
        GetGenderedLocale(
            locales.information.xp,
            language,
            profile_dummy_data.gender as Gender
        );

    return (
        <Flexbox
            className="max-xl:md:mt-16"
            gap="8"
            direction="column"
            style={{
                marginRight:
                    isScreenSize.xl && direction == "rtl"
                        ? `calc(${profilePictureRect.width}px + 8rem)`
                        : "0",
                marginLeft:
                    isScreenSize.xl && direction == "ltr"
                        ? `calc(${profilePictureRect.left + profilePictureRect.width}px + 1rem)`
                        : "0",
            }}
        >
            <Flexbox className="max-xl:gap-8 max-md:flex-col max-md:place-content-center">
                <Flexbox
                    className="max-md:[&>:not(hr):not(:last-child)]:flex-0 gap-4 max-md:-mx-4 max-md:place-content-center max-md:gap-1.5 max-sm:text-sm [&>:not(hr)]:h-12"
                    wrap="wrap"
                >
                    {[
                        {
                            className: "scale-150",
                            text: followersText,
                            icon: progress_arrow_icon,
                        },
                        { icon: user_icon, text: followeesText },
                        { text: experienceText, icon: electricity_icon },
                    ].map((information, i) => (
                        <Fragment key={i}>
                            {i > 0 && (
                                <Separator
                                    className={
                                        isDarkThemed
                                            ? "border-foreground-dark"
                                            : "border-background-dark-hover"
                                    }
                                    thickness="thin"
                                    orientation="vertical"
                                />
                            )}
                            <Flexbox gap="2" placeItems="center">
                                <Icon
                                    className={twJoin(
                                        isDarkThemed
                                            ? "text-foreground-dark"
                                            : "text-background-dark-hover",
                                        information.className
                                    )}
                                    source={information.icon}
                                />
                                <Typography variant="p">
                                    {information.text}
                                </Typography>
                            </Flexbox>
                        </Fragment>
                    ))}
                </Flexbox>

                <Flexbox
                    className={twJoin(
                        direction == "ltr" ? "md:ml-auto" : "md:mr-auto",
                        "bg-secondary-normal place-self-end rounded-full px-6 py-2 font-bold text-white max-md:place-self-center",
                        direction == "ltr"
                            ? "rounded-br-xl rounded-tl-xl"
                            : "rounded-bl-xl rounded-tr-xl"
                    )}
                    gap="2"
                    placeItems="center"
                    placeContent="space-between"
                >
                    <Icon source={fire_icon} />
                    <Typography className="text-nowrap" variant="p">
                        {profile_dummy_data.dayStreak}{" "}
                        {GetGenderedLocale(
                            locales.information.streak,
                            language,
                            profile_dummy_data.gender as Gender
                        )}
                    </Typography>
                </Flexbox>
            </Flexbox>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 [&>div]:h-12">
                <Flexbox
                    className="bg-primary-normal rounded-full p-2 px-5 pr-7 font-bold text-white"
                    gap="3"
                    alignItems="center"
                >
                    <Icon className="absolute" source={graduation_cap_icon} />
                    <Typography
                        className="grow overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-center"
                        variant="p"
                    >
                        {profile_dummy_data.specialization}
                    </Typography>
                </Flexbox>
                <Flexbox
                    className={twJoin(
                        isDarkThemed
                            ? "bg-tertiary-light"
                            : "bg-tertiary-normal",
                        "rounded-full p-2 px-5 pr-7 font-bold text-white"
                    )}
                    gap="3"
                    alignItems="center"
                >
                    <Icon className="absolute" source={location_icon} />
                    <Typography
                        className="grow overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-center"
                        variant="p"
                    >
                        {profile_dummy_data.location}
                    </Typography>
                </Flexbox>
            </div>

            <Flexbox
                className={twJoin(
                    isDarkThemed
                        ? "border-foreground-dark"
                        : "border-background-dark-hover",
                    "border-3 relative rounded-xl p-4"
                )}
            >
                <Locale
                    className={twJoin(
                        isDarkThemed
                            ? "text-foreground-dark"
                            : "text-background-dark-active",
                        "bg-background-light absolute -top-3.5 px-3 font-bold"
                    )}
                    variant="legend"
                    gender={profile_dummy_data.gender as Gender}
                >
                    {locales.information.biography}
                </Locale>
                <Typography className="text-justify" variant="p" dir="ltr">
                    {profile_dummy_data.about}
                </Typography>
            </Flexbox>
        </Flexbox>
    );
};
