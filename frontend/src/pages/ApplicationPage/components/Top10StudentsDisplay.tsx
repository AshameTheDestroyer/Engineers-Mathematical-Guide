import { FC, useMemo } from "react";
import { useMockQuery } from "@/hooks/useMockQuery";
import { DetailedCourseDTO } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";

import students_dummy_data from "../students.dummy.json";

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
            <ol className="flex flex-col">
                {students.map((student) => (
                    <li
                        key={student.username}
                        className="flex place-content-evenly gap-4"
                    >
                        <div className="flex-1 text-center">
                            {student.name} {student.surname}
                        </div>
                        <div className="min-w-[4ch] flex-1 text-center">
                            {student.grade}%
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
};
