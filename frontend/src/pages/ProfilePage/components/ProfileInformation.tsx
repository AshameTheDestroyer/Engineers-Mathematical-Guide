import { FC, Fragment } from "react";
import { Icon } from "@/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { Gender } from "@/schemas/SignupSchema";
import { twJoin, twMerge } from "tailwind-merge";
import { useClipboard } from "@/hooks/useClipboard";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Separator } from "@/components/Separator/Separator";
import { Typography } from "@/components/Typography/Typography";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import user_icon from "@icons/user.svg";
import fire_icon from "@icons/fire.svg";
import phone_icon from "@icons/phone.svg";
import email_icon from "@icons/email.svg";
import location_icon from "@icons/location.svg";
import electricity_icon from "@icons/electricity.svg";
import progress_arrow_icon from "@icons/progress_arrow.svg";
import graduation_cap_icon from "@/assets/icons/graduation_cap.svg";

import locales from "@localization/profile_page.json";

export type ProfileInformationProps = {
    user: DetailedUserDTO;
    profilePictureRect: DOMRect;
};

export const ProfileInformation: FC<ProfileInformationProps> = ({
    user,
    profilePictureRect,
}) => {
    const Navigate = useNavigate();
    const { isDarkThemed } = useThemeMode();
    const { isScreenSize } = useScreenSize();
    const { CopyToClipboard } = useClipboard();
    const { direction, language, GetGenderedLocale } = useLocalization();

    const followersText =
        Intl.NumberFormat(language == "ar" ? "ar-UA" : "en-US", {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1,
        }).format(user.followers.length) +
        " " +
        GetGenderedLocale(locales.information.followers, language, user.gender);

    const followeesText =
        Intl.NumberFormat(language == "ar" ? "ar-UA" : "en-US", {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1,
        }).format(user.followees.length) +
        " " +
        GetGenderedLocale(locales.information.followees, language, user.gender);

    const experienceText =
        Intl.NumberFormat(language == "ar" ? "ar-UA" : "en-US").format(
            user.xp
        ) +
        " " +
        GetGenderedLocale(locales.information.xp, language, user.gender);

    const informationData = [
        ...(user.specialization == null
            ? []
            : [
                  {
                      className: "bg-primary-normal",
                      icon: graduation_cap_icon,
                      text: user.specialization.toTitleCase("ai"),
                      onClick: () =>
                          Navigate(
                              DISCOVER_ROUTES.base.routes.learningTrackID.MapVariable(
                                  user.specialization!
                              )
                          ),
                  },
              ]),
        {
            className: twJoin(
                isDarkThemed ? "bg-tertiary-light" : "bg-tertiary-normal",
                direction == "ltr" ? "text-start" : "text-end",
                "[&>.typography]:[direction:ltr]"
            ),
            icon: email_icon,
            text: user.email,
            onClick: () => CopyToClipboard(user.email),
        },
        {
            icon: location_icon,
            text: `${user.city} - ${user.country}`,
            onClick: () => CopyToClipboard(`${user.city} - ${user.country}`),
        },
        {
            className:
                direction == "rtl" &&
                "[&>.typography]:[direction:ltr] [&>.typography]:text-end",
            icon: phone_icon,
            text: user["phone-number"],
            onClick: () => CopyToClipboard(user["phone-number"]),
        },
    ];

    return (
        <Flexbox
            className="max-xl:md:mt-20"
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
                    className="max-md:[&>:not(hr):not(:last-child)]:flex-0 gap-4 max-md:-mx-8 max-md:place-content-center max-md:gap-1.5 max-sm:text-sm [&>:not(hr)]:h-12"
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
                                        "max-sm:[&>svg]:h-6 max-sm:[&>svg]:w-6",
                                        information.className
                                    )}
                                    source={information.icon}
                                />
                                <Typography
                                    className="whitespace-nowrap"
                                    variant="p"
                                >
                                    {information.text}
                                </Typography>
                            </Flexbox>
                        </Fragment>
                    ))}
                </Flexbox>

                <Flexbox
                    className={twJoin(
                        "bg-secondary-normal place-self-end rounded-full px-6 py-2 font-bold text-white max-md:place-self-center",
                        direction == "ltr"
                            ? "rounded-br-xl rounded-tl-xl md:ml-auto"
                            : "rounded-bl-xl rounded-tr-xl md:mr-auto"
                    )}
                    gap="2"
                    placeItems="center"
                    placeContent="space-between"
                >
                    <Icon source={fire_icon} />
                    <Typography className="text-nowrap" variant="p">
                        {user["day-streak"]}{" "}
                        {GetGenderedLocale(
                            locales.information.streak,
                            language,
                            user.gender
                        )}
                    </Typography>
                </Flexbox>
            </Flexbox>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 [&>div]:h-12">
                {informationData.map((informationDatum, i) => (
                    <Flexbox
                        key={i}
                        className={twMerge(
                            isDarkThemed
                                ? "bg-foreground-light"
                                : "bg-background-dark-active",
                            "cursor-pointer rounded-full p-2 px-5 pr-7 font-bold text-white transition duration-200 [&:is(:hover,:focus-within)]:scale-105",
                            informationDatum.className
                        )}
                        gap="3"
                        tabIndex={0}
                        alignItems="center"
                        onClick={informationDatum.onClick}
                    >
                        <Icon source={informationDatum.icon} />
                        <Typography
                            className="grow overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap"
                            variant="p"
                        >
                            {informationDatum.text}
                        </Typography>
                    </Flexbox>
                ))}
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
                    gender={user.gender as Gender}
                >
                    {locales.information.biography}
                </Locale>
                <Typography className="text-justify" variant="p" dir="ltr">
                    {user.biography}
                </Typography>
            </Flexbox>
        </Flexbox>
    );
};
