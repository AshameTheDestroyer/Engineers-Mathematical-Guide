import { FC } from "react";
import { useParams } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { useGetLessonByID } from "@/services/Lessons/useGetLessonByID";

export const LessonPage: FC = () => {
    const { courseID, moduleID, lessonID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { data: lesson } = useGetLessonByID(courseID, moduleID, lessonID, {
        usesSuspense: true,
    });

    return <Flexbox>{lesson?.title ?? "d"}</Flexbox>;
};
