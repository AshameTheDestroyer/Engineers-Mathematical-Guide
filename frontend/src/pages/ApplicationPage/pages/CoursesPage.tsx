import { FC } from "react";
import { useMockQuery } from "@/hooks/useMockQuery";
import { CourseCard } from "../components/CourseCard";
import { CourseSchema } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";

import dummy_data from "./dummy_data.json";

export const CoursesPage: FC = () => {
    const { data: data_ } = useMockQuery({
        usesSuspense: true,
        dummyData: dummy_data,
        requestTime: 0,
    });

    const data = data_.map((datum) => CourseSchema.parse(datum));

    return (
        <main className="flex flex-col gap-8">
            <header>
                <Typography variant="h1" className="text-2xl font-bold">
                    Courses
                </Typography>
            </header>
            <main className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8">
                {data.map((datum) => (
                    <CourseCard
                        key={datum.id}
                        className="aspect-square"
                        course={datum}
                    />
                ))}
            </main>
        </main>
    );
};
