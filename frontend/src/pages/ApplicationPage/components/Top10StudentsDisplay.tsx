import { FC, useMemo } from "react";
import { RankingBadge } from "./RankingBadge";
import { useMockQuery } from "@/hooks/useMockQuery";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DetailedCourseDTO } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";

import users_dummy_data from "@data/users.dummy.json";

export type Top10StudentsDisplayProps = {
    title: string;
    isSkeleton?: boolean;
} & Pick<DetailedCourseDTO, "top-10-students">;

export const Top10StudentsDisplay: FC<Top10StudentsDisplayProps> = ({
    title,
    isSkeleton,
    "top-10-students": top10Students,
}) => {
    const { data } = useMockQuery({
        requestTime: 500,
        queryKey: ["students"],
        usesSuspense: !isSkeleton,
        dummyData: isSkeleton ? [] : users_dummy_data,
    });

    const students = useMemo(
        () =>
            top10Students.map((student) => ({
                ...student,
                ...(isSkeleton
                    ? { name: "" }
                    : data!.find(
                          (datum) => datum.username == student.username
                      )!),
            })),
        [data, top10Students, isSkeleton]
    );

    return (
        <Flexbox variant="section" direction="column" gap="8">
            <Typography className="text-lg font-bold" variant="h2">
                {title}
            </Typography>
            <Flexbox variant="ol" direction="column" gap="4">
                {students.map((student, i) => (
                    <Flexbox variant="li" key={i}>
                        <RankingBadge
                            rank={i + 1}
                            student={student}
                            isSkeleton={isSkeleton}
                        />
                    </Flexbox>
                ))}
            </Flexbox>
        </Flexbox>
    );
};
