import { FC } from "react";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";

export type ExaminationLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

// export const ExaminationLesson: FC<ExaminationLessonProps> = ({}) => {
//     return <> </>;
// };

export const ExaminationLesson: FC<ExaminationLessonProps> = ({}) => {
    // const [questions, setQuestions] = useState([]);

    // useEffect(
    //     function () {
    //         async function fetchQuestion() {
    //             const res = await fetch(
    //                 "./../../../../public/data/systems_and_solutions_questions.dummy.json"
    //             );

    //             const data = await res.json();
    //             console.log(data);
    //             setQuestions(data);
    //             // console.log(questions);
    //         }

    //         fetchQuestion();
    //     },
    //     [setQuestions]
    // );

    return (
        <>
            {/* {questions.map((question) => (
                <div>{question}</div>
            ))} */}
        </>
    );
};
