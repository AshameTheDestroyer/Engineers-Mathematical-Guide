import { FC } from "react";
import { useMockQuery } from "@/hooks/useMockQuery";
import { CourseCard } from "../components/CourseCard";
import { Typography } from "@/components/Typography/Typography";

import dummy_data from "./dummy_data.json";

export const CoursesPage: FC = () => {
    const { data } = useMockQuery({
        usesSuspense: true,
        dummyData: dummy_data,
    });

    return (
        <main>
            <header>
                <Typography variant="h1" className="text-2xl font-bold">
                    Courses
                </Typography>
            </header>
            <main>
                <CourseCard course={data} />
            </main>
        </main>
    );
};
