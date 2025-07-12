import { FC, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { ProfileAvatar } from "./ProfileAvatar";
import { Image } from "@/components/Image/Image";
import { Title } from "@/components/Title/Title";
import { useClipboard } from "@/hooks/useClipboard";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { IconButton } from "@/components/IconButton/IconButton";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import graduation_cap from "@/assets/icons/graduation_cap.svg";
import configure_icon from "@icons/cog.svg";
import location from "@icons/location.svg";
import profile_dummy_data from "@data/profile.dummy.json";
import fire from "@icons/fire.svg";
import user from "@icons/user.svg";
import electricity from "@icons/electricity.svg";
import flag from "@icons/flag.svg";
import { Icon } from "@/components/Icon/Icon";
import { useGetCoursesByIDs } from "@/services/Courses/useGetCoursesByIDs";
import { CourseWithUserRatingDisplay } from "./CourseWithUserRatingDisplay";
import { CoursesDisplay } from "@/pages/ApplicationPage/components/CoursesDisplay";

export const ProfileMainContent: FC = () => {
    const { direction, language, GetLocale } = useLocalization();
    const { isScreenSize } = useScreenSize();
    const { CopyToClipboard } = useClipboard();

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

    // const { data: ratedCourses } = useGetCoursesByIDs(
    //     profile_dummy_data.ratedCourses.map((item) => item.id),
    //     {
    //         usesSuspense: true,
    //     }
    // );

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
                <Flexbox
                    placeItems="center"
                    justifyContent="space-between"
                    wrap="wrap"
                >
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
                    <div className="bg-gray-dark-hover h-8 w-[0.3px]"></div>
                    <Flexbox gap="2" placeItems="center">
                        <Icon source={flag} />
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
                    <div className="bg-gray-dark-hover h-8 w-[0.3px]"></div>

                    <Flexbox gap="2" placeItems="center">
                        <Icon source={user} />
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
                    <div className="bg-gray-dark-hover h-8 w-[0.3px]"></div>

                    <Flexbox className="bg-secondary-normal border-secondary-normal-active border-3 text-sakura-foreground-dark rounded-full rounded-br-xl rounded-tl-xl p-2 px-4 font-bold">
                        <Icon source={electricity} />
                        <Typography variant="p">
                            {profile_dummy_data.userRating}xp
                        </Typography>
                    </Flexbox>

                    <div className="bg-gray-dark-hover h-8 w-[0.3px]"></div>

                    <Flexbox gap="2" placeItems="center">
                        <Icon source={fire} />
                        <Typography variant="p">
                            Days Streak {profile_dummy_data.dayStreak}
                        </Typography>
                    </Flexbox>
                </Flexbox>

                <Flexbox gap="2" placeItems="center">
                    <Flexbox gap="6" alignItems="center" placeContent="center">
                        <Flexbox
                            gap="3"
                            alignItems="center"
                            className="bg-lagoon-background-darker rounded-full p-2 px-5 pr-7 font-bold text-white"
                        >
                            <Icon source={graduation_cap} />
                            <Typography variant="p">
                                {profile_dummy_data.specialization}
                            </Typography>
                        </Flexbox>
                        <Flexbox
                            gap="3"
                            alignItems="center"
                            className="bg-crimson-background-darker rounded-full p-2 px-5 pr-7 font-bold text-white"
                        >
                            <Icon source={location} />
                            <Typography variant="p">
                                {profile_dummy_data.location}
                            </Typography>
                        </Flexbox>
                    </Flexbox>
                </Flexbox>
                <Typography
                    variant="p"
                    className="border-gray-dark text-wrap border-4 bg-gradient-to-r from-blue-500 to-purple-500 p-5 text-justify"
                >
                    {profile_dummy_data.about}
                </Typography>
            </Flexbox>
            <Flexbox gap="6" direction="column">
                <Typography variant="h2" className="text-xl font-bold">
                    Finished Courses (
                    {profile_dummy_data.finishedCourses.length})
                </Typography>
                <CourseWithUserRatingDisplay
                    courses={finishedCourses}
                    studentRatingName={profile_dummy_data.name}
                    items={profile_dummy_data.userRating}
                />
            </Flexbox>
            <div className="my-5 h-[0.3px] w-full bg-gray-400"></div>
            <Flexbox gap="6" direction="column">
                <Typography variant="h2" className="text-xl font-bold">
                    Enrolled Courses (
                    {profile_dummy_data.enrolledCourses.length})
                </Typography>
                <CoursesDisplay
                    courses={enrolledCourses}
                    studentRatingName={profile_dummy_data.name}
                    items={profile_dummy_data.userRating}
                />
            </Flexbox>
            <div className="h-[0.3px] w-full bg-gray-400"></div>

            {/* <Line
                orientation="horizontal"
                height="h-1"
                width="3/4"
                color="bg-green-500"
                styleType="double"
            /> */}
            <Flexbox gap="6" direction="column">
                <Typography variant="h2" className="text-xl font-bold">
                    Bookmarked Courses (
                    {profile_dummy_data.bookmarkedCourses.length})
                </Typography>
                <CoursesDisplay
                    courses={bookmarkedCourses}
                    studentRatingName={profile_dummy_data.name}
                    items={profile_dummy_data.userRating}
                />
            </Flexbox>
            {/* <div className="h-1 w-full rounded-2xl bg-gray-400"></div>
                <Flexbox gap="4" direction="column">
                    <Typography variant="h2" className="text-xl">
                        Ratings
                    </Typography>
                    <CoursesDisplay courses={ratedCourses} />
                </Flexbox> */}
        </Flexbox>
    );
};
