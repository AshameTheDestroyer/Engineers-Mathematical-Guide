import React, { useState } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { RichText } from "@/components/RichText/RichText";
import { Typography } from "@/components/Typography/Typography";
import { QuestionDTO, QuestionTypeEnum } from "@/schemas/QuestionSchema";
import { MathExpression } from "@/components/MathExpression/MathExpression";

export type QuestionProps = QuestionDTO & {
    index: number;
};

export const QuestionContainer: React.FC<QuestionProps> = ({
    type,
    index,
    title,
    points,
    options,
}) => {
    const [answer, setAnswer] = useState<number>();
    const [answers, setAnswers] = useState<Array<number>>([]);

    return (
        <Flexbox gap="8" direction="column">
            <Flexbox className="sm:gap-4" placeContent="space-between">
                <RichText
                    variant="h3"
                    className="font-bold sm:text-lg"
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
                    {`${index}. ${title}`}
                </RichText>

                <Typography
                    className="bg-tertiary-normal text-tertiary-light place-self-start text-nowrap rounded-full px-4 py-2 font-bold"
                    variant="span"
                >
                    {points} point{points != 1 ? "s" : ""}
                </Typography>
            </Flexbox>

            <Flexbox
                key={`${answer}-${answers.length}`}
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
                                ? answer == i
                                : answers.includes(i)
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
                                ? setAnswer(i)
                                : setAnswers((answers) =>
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
