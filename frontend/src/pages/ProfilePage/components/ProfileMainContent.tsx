import { FC, Fragment, useRef } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileBanner } from "./ProfileBanner";
import { Gender } from "@/schemas/SignupSchema";
import { Title } from "@/components/Title/Title";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { ProfileInformation } from "./ProfileInformation";
import { Separator } from "@/components/Separator/Separator";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useGetCoursesByIDs } from "@/services/Courses/useGetCoursesByIDs";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { RelatedCoursesDisplay } from "@/pages/ApplicationPage/components/RelatedCoursesDisplay";

import locales from "@localization/profile_page.json";

export type ProfileMainContentProps = {
    user: DetailedUserDTO;
};

export const ProfileMainContent: FC<ProfileMainContentProps> = ({ user }) => {
    const { language, GetLocale, GetGenderedLocale } = useLocalization();

    const profilePictureRef = useRef<HTMLDivElement>(null);
    const profilePictureRect = useElementInformation(profilePictureRef);

    const finishedCoursesQuery = useGetCoursesByIDs(user["finished-courses"]);
    const enrolledCoursesQuery = useGetCoursesByIDs(user["enrolled-courses"]);
    const bookmarkedCoursesQuery = useGetCoursesByIDs(
        user["bookmarked-courses"]
    );

    const skeletonArray = new Array(5).fill(null);

    const relatedCourses = [
        {
            query: finishedCoursesQuery,
            locales: locales["related-courses"].finished,
        },
        {
            query: enrolledCoursesQuery,
            locales: locales["related-courses"].enrolled,
        },
        {
            query: bookmarkedCoursesQuery,
            locales: locales["related-courses"].bookmarked,
        },
    ];

    const RenderedRelatedCourses = (
        coursesData: (typeof relatedCourses)[number]
    ) => {
        const errorLocales = locales["related-courses-error"];
        return (
            <Flexbox className="lg:col-span-2" gap="4" direction="column">
                <Locale
                    className="text-lg font-bold"
                    variant="h2"
                    gender={user.gender as Gender}
                >
                    {coursesData.locales.title}
                </Locale>
                <RelatedCoursesDisplay
                    {...coursesData.query}
                    skeletonArray={skeletonArray}
                    errorDisplay={{
                        title: GetLocale(errorLocales.title, language),
                        button: GetLocale(errorLocales.button, language),
                        paragraph: GetLocale(errorLocales.paragraph, language),
                    }}
                    emptyDisplay={{
                        title: GetLocale(
                            coursesData.locales.empty.title,
                            language
                        ),
                        paragraph: GetGenderedLocale(
                            coursesData.locales.empty.paragraph,
                            language,
                            user.gender
                        ).replace(/\*\*([^\*]+)\*\*/, `**"${user.name}"**`),
                    }}
                />
            </Flexbox>
        );
    };

    return (
        <Flexbox variant="main" direction="column" gap="8">
            <Title>{`${user.name} ${user.surname}`}</Title>

            <ProfileBanner user={user} profilePictureRef={profilePictureRef} />
            <ProfileHeader
                user={user}
                profilePictureRect={profilePictureRect}
            />
            <ProfileInformation
                user={user}
                profilePictureRect={profilePictureRect}
            />

            <Flexbox className="lg:col-span-2" direction="column" gap="4">
                {relatedCourses.map((coursesData, i) => (
                    <Fragment key={i}>
                        {i > 0 && (
                            <Separator
                                className="border-background-dark-hover"
                                thickness="thick"
                                orientation="horizontal"
                            />
                        )}
                        <RenderedRelatedCourses {...coursesData} />
                    </Fragment>
                ))}
            </Flexbox>
        </Flexbox>
    );
};
