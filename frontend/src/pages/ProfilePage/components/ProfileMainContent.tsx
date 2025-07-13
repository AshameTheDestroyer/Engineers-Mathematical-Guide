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

import user_icon from "@icons/user.svg";
import fire_icon from "@icons/fire.svg";
import configure_icon from "@icons/cog.svg";
import location_icon from "@icons/location.svg";
import electricity_icon from "@icons/electricity.svg";
import progress_arrow_icon from "@icons/progress_arrow.svg";
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

            <ProfileBanner profilePictureRef={profilePictureRef} />
            <ProfileHeader profilePictureRect={profilePictureRect} />
            <ProfileInformation profilePictureRect={profilePictureRect} />
            </Flexbox>
        </Flexbox>
    );
};
