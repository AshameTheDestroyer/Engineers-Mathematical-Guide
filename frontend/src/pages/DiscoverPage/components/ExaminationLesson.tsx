import { FC } from "react";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";

export type ExaminationLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

export const ExaminationLesson: FC<ExaminationLessonProps> = ({}) => {
    return <></>;
};
