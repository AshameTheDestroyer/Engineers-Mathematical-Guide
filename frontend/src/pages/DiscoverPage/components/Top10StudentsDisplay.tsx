import { FC } from "react";
import { RankingBadge } from "./RankingBadge";
import { UserDTO } from "@/schemas/UserSchema";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DetailedCourseDTO } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";
import { useGetUsersByIDs } from "@/services/Users/useGetUsersByIDs";

export type Top10StudentsDisplayProps = {
    title: string;
    isSkeleton?: boolean;
} & Pick<DetailedCourseDTO, "top-10-students">;

export const Top10StudentsDisplay: FC<Top10StudentsDisplayProps> = ({
    title,
    isSkeleton,
    "top-10-students": top10Students,
}) => {
    const { data: students } = useGetUsersByIDs(
        top10Students.map((datum) => datum.username),
        {
            usesSuspense: !isSkeleton,
            transform: (data) =>
                data.map((datum) => ({
                    ...datum,
                    grade:
                        top10Students.find(
                            (student) => student.username == datum.username
                        )?.grade ?? 0,
                })),
        }
    );

    return (
        <Flexbox variant="section" direction="column" gap="8">
            <Typography className="text-lg font-bold" variant="h2">
                {title}
            </Typography>
            <ol className="space-y-4">
                {(isSkeleton ? top10Students : students!).map((student, i) => (
                    <Flexbox variant="li" key={i}>
                        <RankingBadge
                            rank={i + 1}
                            isSkeleton={isSkeleton}
                            student={student as UserDTO & { grade: number }}
                        />
                    </Flexbox>
                ))}
            </ol>
        </Flexbox>
    );
};
