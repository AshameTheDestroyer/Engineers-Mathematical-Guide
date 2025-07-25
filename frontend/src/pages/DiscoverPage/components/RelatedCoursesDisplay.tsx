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
    skeletonArray: Array<Partial<CourseDTO>>;
    emptyDisplay: Pick<SearchResultDisplayProps, "title" | "paragraph">;
    errorDisplay: Pick<SearchResultDisplayProps, "title" | "paragraph"> & {
        button: string;
    };
};

export const RelatedCoursesDisplay: FC<RelatedCoursesDisplayProps> = ({
    isError,
    isLoading,
    isSuccess,
    errorDisplay,
    emptyDisplay,
    skeletonArray,
    refetch: Refetch,
    data: relatedCourses,
}) => {
    if (isLoading || relatedCourses == null) {
        return <CoursesDisplay isSkeleton courses={skeletonArray} />;
    }

    if (isError) {
        return (
            <SearchResultDisplay
                className="place-items-start!"
                {...errorDisplay}
                iconType="error"
                buttons={
                    <Button onClick={(_e) => Refetch()}>
                        {errorDisplay.button}
                    </Button>
                }
            />
        );
    }

    if (isSuccess && relatedCourses.length == 0) {
        return (
            <SearchResultDisplay
                className="place-items-start! [&>h2.typography]:text-lg [&>h2.typography]:font-normal"
                iconType="none"
                {...emptyDisplay}
            />
        );
    }

    return <CoursesDisplay courses={relatedCourses} />;
};
