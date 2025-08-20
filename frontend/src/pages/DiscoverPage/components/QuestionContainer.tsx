import { Locale } from "@/components/Locale/Locale";
import { Dispatch, FC, SetStateAction } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { RichText } from "@/components/RichText/RichText";
import { Typography } from "@/components/Typography/Typography";
import { QuestionDTO, QuestionTypeEnum } from "@/schemas/QuestionSchema";
import { MathExpression } from "@/components/MathExpression/MathExpression";

import locales from "@localization/modules_page.json";

export type QuestionContainerProps = QuestionDTO & {
    index: number;
} & Either<
        {
            type: QuestionTypeEnum.choose;
            chosenAnswer: number | undefined;
            setChosenAnswer: Dispatch<SetStateAction<number | undefined>>;
        },
        {
            type: QuestionTypeEnum.select;
            chosenAnswers: Array<number>;
            setChosenAnswers: Dispatch<SetStateAction<Array<number>>>;
        }
    >;

export const QuestionContainer: FC<QuestionContainerProps> = ({
    type,
    index,
    title,
    points,
    options,
    chosenAnswer,
    chosenAnswers,
    setChosenAnswer,
    setChosenAnswers,
}) => {
    return (
        <Flexbox gap="8" direction="column">
            <Flexbox
                className="gap-4 max-sm:gap-2"
                placeContent="space-between"
            >
                <RichText
                    variant="h3"
                    className="font-bold sm:text-lg"
                    extractor="$"
                    dir="ltr"
                    ExtractedTextRenders={(text) => (
                        <MathExpression
                            className="inline-block"
                            inline
                            variant="span"
                        >
                            {text}
                        </MathExpression>
                    )}
                >
                    {`${index}. ${title}`}
                </RichText>

                <Typography
                    className="bg-tertiary-normal text-tertiary-light place-self-start text-nowrap rounded-full px-4 py-2 font-bold"
                    variant="span"
                >
                    {points}{" "}
                    <Locale>
                        {
                            locales.lessons.examination.question.points[
                                points <= 1 ? "singular" : "plural"
                            ]
                        }
                    </Locale>
                </Typography>
            </Flexbox>

            <Flexbox
                key={`${chosenAnswer ?? -1}-${chosenAnswers?.length ?? 0}`}
                gap="4"
                direction="column"
            >
                {options.map((option, i) => (
                    <Checkbox
                        key={i}
                        className="[&>label]:bg-transparent"
                        isControlled
                        variant="default"
                        name={`answer-${i}`}
                        isRadio={type == QuestionTypeEnum.choose}
                        checked={
                            type == QuestionTypeEnum.choose
                                ? chosenAnswer == i
                                : chosenAnswers.includes(i)
                        }
                        label={
                            <RichText
                                variant="label"
                                extractor="$"
                                ExtractedTextRenders={(text) => (
                                    <MathExpression
                                        className="inline-block"
                                        inline
                                        variant="span"
                                    >
                                        {text}
                                    </MathExpression>
                                )}
                            >
                                {option}
                            </RichText>
                        }
                        onChange={(e) =>
                            type == QuestionTypeEnum.choose
                                ? setChosenAnswer(i)
                                : setChosenAnswers((answers) =>
                                      e.target.checked
                                          ? [...answers, i]
                                          : answers.filter(
                                                (answer) => answer != i
                                            )
                                  )
                        }
                    />
                ))}
            </Flexbox>
        </Flexbox>
    );
};
