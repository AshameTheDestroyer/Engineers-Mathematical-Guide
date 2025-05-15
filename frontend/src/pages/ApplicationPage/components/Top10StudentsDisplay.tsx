import { FC, useMemo } from "react";
import { Icon } from "@/components/Icon/Icon";
import { useMockQuery } from "@/hooks/useMockQuery";
import { DetailedCourseDTO } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";

import user_icon from "@icons/user.svg";

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
            <ol className="flex flex-col gap-4">
                {students.map((student, i) => (
                    <li key={i} className="flex">
                        <Typography
                            className="max-sm:text-md flex aspect-square place-content-center place-items-center text-lg max-sm:-ml-8 max-sm:-mr-2"
                            variant="i"
                        >
                            #{i + 1}
                        </Typography>
                        <button className="bg-background-normal-hover active:bg-background-dark [&:where(:hover,:focus-within)]:bg-background-normal-active group relative flex grow cursor-pointer place-content-evenly gap-4 overflow-hidden rounded-full p-2 transition duration-200">
                            <div className="bg-background-light -m-0.5 aspect-square rounded-[inherit] p-2 transition duration-200">
                                {
                                    // TODO: Add avatars.
                                    // student.avatar != null ? (
                                    //     <Image
                                    //         className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                                    //         source={course.image}
                                    //         alternative={`Image of ${course.title} Course.`}
                                    //     />
                                    // ) : (
                                    <Icon
                                        className="text-background-normal-hover group-active:text-background-dark group-[&:where(:hover,:focus-within)]:text-background-normal-active h-full w-full transition duration-200 [&>svg]:h-full [&>svg]:w-full"
                                        source={user_icon}
                                    />
                                    // )
                                }
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <Typography
                                    className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold"
                                    variant="strong"
                                >
                                    {`${student.name} ${student.surname}`}
                                </Typography>
                                <Typography
                                    className="overflow-hidden text-ellipsis whitespace-nowrap text-start"
                                    variant="p"
                                >
                                    @{student.username}
                                </Typography>
                            </div>
                            <Typography
                                className="ml-auto mr-2 flex aspect-square place-content-center place-items-center text-lg font-bold"
                                variant="em"
                            >
                                {Math.round(student.grade)}%
                            </Typography>
                        </button>
                    </li>
                ))}
            </ol>
        </section>
    );
};
