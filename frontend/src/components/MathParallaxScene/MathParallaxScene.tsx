import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { MathExpression } from "../MathExpression/MathExpression";
import { useElementInformation } from "@/hooks/useElementInformation";
import { FC, useEffect, useImperativeHandle, useRef, useState } from "react";

import math_equations from "@json/math_equations.json";

export type MathParallaxSceneProps = ChildlessComponentProps<HTMLDivElement> & {
    velocity?: Coordinates;
};

export const MathParallaxScene: FC<MathParallaxSceneProps> = ({
    id,
    ref,
    className,
    velocity = { x: -50, y: -50 },
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => sectionRef.current!);

    const mathEquationElements = Array.from(
        sectionRef.current?.children ?? []
    ) as Array<HTMLElement>;

    const { width, height } = useElementInformation(sectionRef);
    const [mathEquationPositions, setMathEquationPositions] = useState<
        Array<{ top: number; left: number }>
    >([]);

    useEffect(() => {
        setMathEquationPositions(
            math_equations.map((_) => ({
                top: ~~(Math.random() * height),
                left: ~~(Math.random() * width),
            }))
        );
    }, [width, height]);

    useEffect(() => {
        if (sectionRef.current == null) {
            return;
        }

        const intervalID = setInterval(() => {
            setMathEquationPositions((mathEquationPositions) =>
                mathEquationPositions.map(UpdateMathEquationPosition)
            );
        }, 100);

        return () => {
            clearInterval(intervalID);
        };
    }, [sectionRef.current, width, height]);

    function UpdateMathEquationPosition(
        position: (typeof mathEquationPositions)[number],
        i: number
    ) {
        const element = mathEquationElements[i];
        if (element == null) {
            return position;
        }

        const { width: elementWidth, height: elementHeight } =
            element.getBoundingClientRect();

        let top = position.top + velocity.y;
        let left = position.left + velocity.x;

        if (top > height) {
            top = -elementHeight;
        } else if (top + elementHeight < 0) {
            top = height;
        }

        if (left > width) {
            left = -elementWidth;
        } else if (left + elementWidth < 0) {
            left = width;
        }

        return { top, left };
    }

    return (
        <section
            id={id}
            ref={sectionRef}
            className={twMerge(
                "relative h-full w-full overflow-hidden",
                className
            )}
        >
            {math_equations.map((mathEquation, i) => (
                <MathExpression
                    key={mathEquation.id}
                    variant="p"
                    className="absolute"
                    style={mathEquationPositions[i]}
                >
                    {mathEquation.equation}
                </MathExpression>
            ))}
        </section>
    );
};
