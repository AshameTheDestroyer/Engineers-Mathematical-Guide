import { FC } from "react";
import { CourseCard } from "./CourseCard";
import { Icon } from "@/components/Icon/Icon";
import { QueryFunction } from "@tanstack/react-query";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { useExtendedQuery } from "@/hooks/useExtendedQuery";
import { Typography } from "@/components/Typography/Typography";
import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";
import {
    useSchematicQuery,
    UseSchematicQueryOptions,
} from "@/hooks/useSchematicQuery";

import search_off_icon from "@icons/search_off.svg";

export type CoursesDisplayProps = Either<
    {
        isSkeleton: true;
    },
    {
        isSkeleton?: boolean;
        queryFn: QueryFunction<Array<CourseDTO>>;
    } & Partial<Pick<UseSchematicQueryOptions<CourseDTO>, "queryKey">>
>;

export const CoursesDisplay: FC<CoursesDisplayProps> = ({
    queryFn,
    queryKey,
    isSkeleton,
}) => {
    const { data: courses } = useSchematicQuery({
        queryFn,
        enabled: !isSkeleton,
        schema: CourseSchema,
        usesSuspense: !isSkeleton,
        queryKey: ["courses", ...(queryKey ?? [""])],
        parseFn: (data, schema) =>
            isSkeleton ? [] : data?.map((datum) => schema.parse(datum)),
    });

    const { data: images } = useExtendedQuery({
        enabled: !isSkeleton,
        queryKey: ["courses-images", courses, ...(queryKey ?? [""])],
        queryFn: () =>
            Promise.all(
                courses!.map(
                    async (course) =>
                        [
                            course.id,
                            course.image != null
                                ? (await fetch(course.image)).url
                                : undefined,
                        ] as const
                )
            ).then((entries) => Object.fromEntries(entries)),
    });

    const coursesArray = isSkeleton ? new Array(20).fill(null) : courses!;

    if (coursesArray.length == 0) {
        return (
            <Flexbox
                gap="4"
                className="grow"
                direction="column"
                placeItems="center"
                placeContent="center"
            >
                <Icon source={search_off_icon} width={128} height={128} />
                <Typography className="text-xl font-bold" variant="h2">
                    No Course Found
                </Typography>
                <Typography variant="p">
                    Try searching for another thing.
                </Typography>
            </Flexbox>
        );
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8">
            {coursesArray.map((course, i) => (
                <CourseCard
                    key={isSkeleton ? i : course.id}
                    isSkeleton={isSkeleton}
                    className="aspect-square"
                    course={{ ...course, image: images?.[course.id] }}
                />
            ))}
        </div>
    );
};
