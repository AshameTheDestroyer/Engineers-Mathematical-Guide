import { FC, useState } from "react";
import { useMockQuery } from "@/hooks/useMockQuery";
import { CourseCard } from "../components/CourseCard";
import { CourseSchema } from "@/schemas/CourseSchema";
import { useExtendedQuery } from "@/hooks/useExtendedQuery";
import { Typography } from "@/components/Typography/Typography";

import dummy_data from "./dummy_data.json";
import { Modal } from "@/components/Modal/Modal";

export const CoursesPage: FC = () => {
    const { data: data_ } = useMockQuery({
        requestTime: 0,
        usesSuspense: true,
        queryKey: ["courses"],
        dummyData: dummy_data,
    });

    const data = data_.map((datum) => CourseSchema.parse(datum));

    const { data: images } = useExtendedQuery({
        usesSuspense: true,
        queryKey: ["courses-images"],
        queryFn: () =>
            Promise.all(
                data.map(
                    async (datum) =>
                        [
                            datum.id,
                            datum.image != null
                                ? (await fetch(datum.image)).url
                                : undefined,
                        ] as const
                )
            ).then((entries) => Object.fromEntries(entries)),
    });

    const [isOpen, setIsOpen] = useState(true);

    return (
        <main className="flex flex-col gap-8">
            <Modal
                className="bg-amber-950 text-white"
                hasCloseButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                text="Page Not Found"
            >
                <p>tHIS IS A MODAL</p>
            </Modal>

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
                        course={{ ...datum, image: images[datum.id] }}
                    />
                ))}
            </main>
        </main>
    );
};
