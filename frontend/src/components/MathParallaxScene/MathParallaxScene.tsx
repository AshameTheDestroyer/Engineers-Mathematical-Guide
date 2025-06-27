import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { MathExpression } from "../MathExpression/MathExpression";
import { useElementInformation } from "@/hooks/useElementInformation";
import {
    FC,
    useRef,
    useState,
    useEffect,
    CSSProperties,
    useImperativeHandle,
} from "react";

import "./math_parallax_scene.css";

import math_equations from "@json/math_equations.json";

export type MathParallaxSceneProps = ChildlessComponentProps<HTMLDivElement>;

export const MathParallaxScene: FC<MathParallaxSceneProps> = ({
    id,
    ref,
    className,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => sectionRef.current!);

    const { width, height } = useElementInformation(sectionRef);
    const [mathEquationStyles, setMathEquationStyles] = useState(
        [] as Array<CSSProperties>
    );

    useEffect(() => {
        setMathEquationStyles(
            math_equations.map((_) => ({
                top: ~~(Math.random() * height * 2),
                left: ~~(Math.random() * width * 2),
                scale: Math.random() * 0.25 + 1,
            }))
        );
    }, [width, height]);

    const EquationContainer = ({
        id,
        style,
        className,
    }: ChildlessComponentProps & { style?: CSSProperties }) => (
        <div
            id={id}
            style={style}
            className={twMerge("absolute inset-0", className)}
        >
            {math_equations.map((mathEquation, i) => (
                <MathExpression
                    key={mathEquation.id}
                    variant="p"
                    className="absolute"
                    style={mathEquationStyles[i]}
                >
                    {mathEquation.equation}
                </MathExpression>
            ))}
        </div>
    );

    return (
        <section
            id={id}
            ref={sectionRef}
            className={twMerge(
                "math-parallax-scene relative h-full w-full overflow-hidden",
                className
            )}
        >
            {new Array(4).fill(null).map((_, i) => (
                <EquationContainer
                    key={i}
                    style={{
                        animationName: `math-equation-movement${i + 1}`,
                    }}
                />
            ))}
        </section>
    );
};
