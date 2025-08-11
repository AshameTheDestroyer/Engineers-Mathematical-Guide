import { FC } from "react";
import { useParams } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { useGetLessons } from "@/services/Lessons/useGetLessons";

export const ModulePage: FC = () => {
    const { courseID, moduleID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { data: lessons } = useGetLessons(courseID, moduleID, {
        usesSuspense: true,
    });

    return (
        <Flexbox direction="column" gap="4">
            {lessons.map((lesson, i) => (
                <p key={i}>{lesson.title}</p>
            ))}
        </Flexbox>
    );
};
