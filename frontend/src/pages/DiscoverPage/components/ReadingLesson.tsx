import { FC } from "react";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";

export type ReadingLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.reading };
};

export const ReadingLesson: FC<ReadingLessonProps> = ({}) => {
    return <></>;
};
