import { FC, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { QuestionContainer } from "./QuestionContainer";
import { Typography } from "@/components/Typography/Typography";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import arrow_icon from "@icons/arrow.svg";
import warning_icon from "@icons/warning.svg";

export type ExaminationLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

export const ExaminationLesson: FC<ExaminationLessonProps> = ({ lesson }) => {
    const [tab, setTab] = useState<number>();

    return (
        <div className="p-[inherit] max-sm:w-full sm:absolute sm:inset-0 sm:overflow-auto">
            {tab == null ? (
                <SearchResultDisplay
                    className="sm:-translate-1/2 sm:absolute sm:left-1/2 sm:top-1/2"
                    iconType="custom"
                    title="Before You Start"
                    iconProps={{ source: warning_icon }}
                    paragraph={`You will have only **${lesson.time} minutes** to solve this exam,
                    so there'll be a timer that begins clocking down once you
                    hit the start button. We advise that you study the module very well before you
                    start the exam, because once you start it, you will only
                    have **${lesson.attempts} attempts** to finish the exam.`}
                    buttons={
                        <Button thickness="thick" onClick={(_e) => setTab(0)}>
                            Proceed
                        </Button>
                    }
                />
            ) : (
                <Flexbox
                    className="h-full w-full sm:p-4"
                    gap="8"
                    direction="column"
                >
                    <QuestionContainer
                        key={tab}
                        index={tab + 1}
                        {...lesson.questions[tab]}
                    />
                    <Flexbox className="mt-auto" placeContent="space-between">
                        <Button
                            className="min-w-[calc(8ch+1rem)]"
                            disabled={tab == 0}
                            icon={{
                                placement: "left",
                                source: arrow_icon,
                                className: "rotate-270",
                            }}
                            onClick={(_e) => setTab((tab) => tab! - 1)}
                        >
                            Previous
                        </Button>
                        <Typography
                            className="bg-tertiary-normal text-tertiary-light min-w-[calc(3ch+2rem)] place-self-start text-nowrap rounded-full px-4 py-2 text-center font-bold"
                            variant="p"
                        >
                            {tab + 1}
                        </Typography>
                        <Button
                            className="min-w-[calc(8ch+1rem)]"
                            disabled={tab == lesson.questions.length - 1}
                            icon={{
                                placement: "right",
                                source: arrow_icon,
                                className: "rotate-90",
                            }}
                            onClick={(_e) => setTab((tab) => tab! + 1)}
                        >
                            Next
                        </Button>
                    </Flexbox>
                </Flexbox>
            )}
        </div>
    );
};
