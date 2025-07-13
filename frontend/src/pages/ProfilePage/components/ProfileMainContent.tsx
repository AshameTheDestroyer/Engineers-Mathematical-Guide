import { FC, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { ProfileAvatar } from "./ProfileAvatar";
import { Image } from "@/components/Image/Image";
import { Title } from "@/components/Title/Title";
import { useClipboard } from "@/hooks/useClipboard";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Separator } from "@/components/Separator/Separator";
import { Typography } from "@/components/Typography/Typography";
import { IconButton } from "@/components/IconButton/IconButton";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useGetCoursesByIDs } from "@/services/Courses/useGetCoursesByIDs";
import { CourseWithUserRatingDisplay } from "./CourseWithUserRatingDisplay";
import { CoursesDisplay } from "@/pages/ApplicationPage/components/CoursesDisplay";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import flag_icon from "@icons/flag.svg";
import user_icon from "@icons/user.svg";
import fire_icon from "@icons/fire.svg";
import configure_icon from "@icons/cog.svg";
import location_icon from "@icons/location.svg";
import electricity_icon from "@icons/electricity.svg";
import graduation_cap_icon from "@/assets/icons/graduation_cap.svg";

import profile_dummy_data from "@data/profile.dummy.json";

export const ProfileMainContent: FC = () => {
    const { isScreenSize } = useScreenSize();
    const { CopyToClipboard } = useClipboard();
    const { direction, language } = useLocalization();

    const profilePictureRef = useRef<HTMLDivElement>(null);
    const profilePictureRect = useElementInformation(profilePictureRef);

    const { data: finishedCourses } = useGetCoursesByIDs(
        profile_dummy_data.finishedCourses,
        {
            usesSuspense: true,
        }
    );

    const { data: enrolledCourses } = useGetCoursesByIDs(
        profile_dummy_data.enrolledCourses,
        {
            usesSuspense: true,
        }
    );

    const { data: bookmarkedCourses } = useGetCoursesByIDs(
        profile_dummy_data.bookmarkedCourses,
        {
            usesSuspense: true,
        }
    );

    return (
        <Flexbox variant="main" direction="column" gap="8">
            <Title>{profile_dummy_data.name}</Title>
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
                    <ProfileAvatar className="h-full w-full" />
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
                    source={profile_dummy_data.banner}
                    alternative={`Image of ${profile_dummy_data.name}'s Background.`}
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

                <Flexbox
                    className="max-md:[&>:not(hr):not(:last-child)]:flex-0 max-md:place-content-center [&>:not(hr)]:h-12"
                    gap="4"
                    wrap="wrap"
                >
                    <Flexbox gap="2" placeItems="center">
                        <Icon source={flag_icon} />
                        <Typography variant="p">
                            {Intl.NumberFormat(
                                language == "ar" ? "ar-UA" : "en-US",
                                {
                                    notation: "compact",
                                    compactDisplay: "short",
                                    maximumFractionDigits: 1,
                                }
                            ).format(profile_dummy_data.followers)}{" "}
                            Followers
                        </Typography>
                    </Flexbox>
                    <Separator
                        className="border-background-dark-hover"
                        thickness="thin"
                        orientation="vertical"
                    />

                    <Flexbox gap="2" placeItems="center">
                        <Icon source={user_icon} />
                        <Typography variant="p">
                            {Intl.NumberFormat(
                                language == "ar" ? "ar-UA" : "en-US",
                                {
                                    notation: "compact",
                                    compactDisplay: "short",
                                    maximumFractionDigits: 1,
                                }
                            ).format(profile_dummy_data.followees)}{" "}
                            Followees
                        </Typography>
                    </Flexbox>
                    <Separator
                        className="border-background-dark-hover"
                        thickness="thin"
                        orientation="vertical"
                    />

                    <Flexbox gap="2" placeItems="center">
                        <Icon source={electricity_icon} />
                        <Typography variant="p">
                            {profile_dummy_data.userRating} XP
                        </Typography>
                    </Flexbox>

                    <Flexbox
                        className="max-md:min-w-full max-md:flex-1 md:ml-auto"
                        placeContent="center"
                    >
                        <Flexbox
                            className="bg-secondary-normal rounded-full rounded-br-xl rounded-tl-xl px-6 py-2 font-bold text-white"
                            gap="2"
                            placeItems="center"
                            placeContent="space-between"
                        >
                            <Icon source={fire_icon} />
                            <Typography className="text-nowrap" variant="p">
                                {profile_dummy_data.dayStreak} Days
                            </Typography>
                        </Flexbox>
                    </Flexbox>
                </Flexbox>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <Flexbox
                        className="bg-primary-normal rounded-full p-2 px-5 pr-7 font-bold text-white"
                        gap="3"
                        alignItems="center"
                    >
                        <Icon source={graduation_cap_icon} />
                        <Typography
                            className="overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap"
                            variant="p"
                        >
                            {profile_dummy_data.specialization}
                        </Typography>
                    </Flexbox>
                    <Flexbox
                        className="bg-tertiary-normal rounded-full p-2 px-5 pr-7 font-bold text-white"
                        gap="3"
                        alignItems="center"
                    >
                        <Icon source={location_icon} />
                        <Typography
                            className="overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap"
                            variant="p"
                        >
                            {profile_dummy_data.location}
                        </Typography>
                    </Flexbox>
                </div>
            </Flexbox>

            <Flexbox className="border-3 border-background-dark-hover relative rounded-xl p-4">
                <Typography
                    className="bg-background-light text-background-dark-active absolute -top-3.5 px-3 font-bold"
                    variant="legend"
                >
                    Biography
                </Typography>
                <Typography className="text-justify" variant="p">
                    {profile_dummy_data.about}
                </Typography>
            </Flexbox>

            <Flexbox gap="6" direction="column">
                <Typography variant="h2" className="text-xl font-bold">
                    Finished Courses (
                    {profile_dummy_data.finishedCourses.length})
                </Typography>
                <CourseWithUserRatingDisplay
                    items
                    courses={finishedCourses}
                    studentRatingName={profile_dummy_data.name}
                />
            </Flexbox>

            <Separator
                className="border-background-dark-hover"
                thickness="thick"
                orientation="horizontal"
            />
            <Flexbox gap="6" direction="column">
                <Typography variant="h2" className="text-xl font-bold">
                    Enrolled Courses (
                    {profile_dummy_data.enrolledCourses.length})
                </Typography>
                <CoursesDisplay courses={enrolledCourses} />
            </Flexbox>

            <Separator
                className="border-background-dark-hover"
                thickness="thick"
                orientation="horizontal"
            />
            <Flexbox gap="6" direction="column">
                <Typography variant="h2" className="text-xl font-bold">
                    Bookmarked Courses (
                    {profile_dummy_data.bookmarkedCourses.length})
                </Typography>
                <CoursesDisplay courses={bookmarkedCourses} />
            </Flexbox>
        </Flexbox>
    );
};
