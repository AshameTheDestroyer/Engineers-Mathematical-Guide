import { FC } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@/components/Typography/Typography";
import { APPLICATION_ROUTES } from "@/routes/application.routes";

export const CoursePage: FC = () => {
    const { courseID } =
        useParams<keyof typeof APPLICATION_ROUTES.base.routes>();

    return (
        <main>
            <Typography variant="h1" className="text-2xl font-bold">
                {courseID?.toTitleCase()}
            </Typography>
        </main>
    );
};
