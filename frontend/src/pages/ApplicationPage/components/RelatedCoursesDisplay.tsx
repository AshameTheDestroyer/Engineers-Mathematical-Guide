import { FC } from "react";
import { CoursesDisplay } from "./CoursesDisplay";
import { CourseDTO } from "@/schemas/CourseSchema";
import { Button } from "@/components/Button/Button";
import {
    SearchResultDisplay,
    SearchResultDisplayProps,
} from "@/components/SearchResultDisplay/SearchResultDisplay";

export type RelatedCoursesDisplayProps = QueryProps<
    Array<CourseDTO> | undefined
> & {
    skeletonCourses: Array<Partial<CourseDTO>>;
} & Record<
        "errorDisplay" | "searchOffDisplay",
        Pick<SearchResultDisplayProps, "title" | "paragraph">
    >;

export const RelatedCoursesDisplay: FC<RelatedCoursesDisplayProps> = ({
    isError,
    isLoading,
    isSuccess,
    errorDisplay,
    skeletonCourses,
    searchOffDisplay,
    refetch: Refetch,
    data: relatedCourses,
}) => {
    if (isLoading || relatedCourses == null) {
        return <CoursesDisplay isSkeleton courses={skeletonCourses} />;
    }

    if (isError) {
        return (
            <SearchResultDisplay
                className="place-items-start!"
                {...errorDisplay}
                iconType="error"
                buttons={
                    <Button onClick={(_e) => Refetch()}>Refetch Courses</Button>
                }
            />
        );
    }

    if (isSuccess && relatedCourses.length == 0) {
        return (
            <SearchResultDisplay
                className="place-items-start! [&>h2.typography]:text-lg [&>h2.typography]:font-normal"
                iconType="none"
                {...searchOffDisplay}
            />
        );
    }

    return <CoursesDisplay courses={relatedCourses} />;
};
