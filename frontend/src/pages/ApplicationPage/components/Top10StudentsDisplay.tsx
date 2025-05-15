import { FC, useMemo } from "react";
import { Icon } from "@/components/Icon/Icon";
import { useMockQuery } from "@/hooks/useMockQuery";
import { DetailedCourseDTO } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";

import user_icon from "@icons/user.svg";

import students_dummy_data from "../students.dummy.json";
import { RankingBadge } from "./RankingBadge";

export type Top10StudentsDisplayProps = Pick<
    DetailedCourseDTO,
    "top-10-students"
>;

export const Top10StudentsDisplay: FC<Top10StudentsDisplayProps> = ({
    "top-10-students": top10Students,
}) => {
    const { data } = useMockQuery({
        usesSuspense: true,
        queryKey: ["students"],
        dummyData: students_dummy_data,
    });

    const students = useMemo(
        () =>
            top10Students.map((student) => ({
                ...student,
                ...data.find((datum) => datum.username == student.username)!,
            })),
        [data, top10Students]
    );

    return (
        <section>
            <Typography className="text-lg font-bold" variant="h2">
                Top 10 Students
            </Typography>
            <ol className="flex flex-col gap-4">
                {students.map((student, i) => (
                    <li key={i} className="flex">
                        <RankingBadge rank={i + 1} student={student} />
                    </li>
                ))}
            </ol>
        </section>
    );
};
