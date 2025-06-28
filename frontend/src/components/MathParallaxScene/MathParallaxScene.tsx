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

export type MathParallaxSceneProps = ChildlessComponentProps<HTMLDivElement> & {
    blurPercentage?: `${number}%`;
    blurType?: "radial" | "horizontal" | "vertical";
    direction?: { x?: "left" | "right"; y?: "top" | "bottom" };
};

export const MathParallaxScene: FC<MathParallaxSceneProps> = ({
    id,
    ref,
    className,
    blurPercentage,
    blurType = "radial",
    direction = { x: "left", y: "top" },
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => sectionRef.current!);

    const { width, height } = useElementInformation(sectionRef);
    const [mathEquationStyles, setMathEquationStyles] = useState(
        [] as Array<CSSProperties>
    );

    const style = {
        "--blur-percentage": blurPercentage,
        "--y": direction.y == "top" ? 1 : direction.y == "bottom" ? -1 : 0,
        "--x": direction.x == "left" ? 1 : direction.x == "right" ? -1 : 0,
    } as CSSProperties;

    useEffect(() => {
        setMathEquationStyles(
            math_equations.map((_) =>
                width == 0 && height == 0
                    ? { opacity: 0 }
                    : {
                          opacity: 1,
                          scale: Math.random() * 0.25 + 1,
                          top: ~~(Math.random() * height * 2),
                          left: ~~(Math.random() * width * 2),
                      }
            )
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
                    style={{
                        opacity: 0,
                        ...mathEquationStyles[i],
                    }}
                >
                    {mathEquation.equation}
                </MathExpression>
            ))}
        </div>
    );

    return (
        <section
            id={id}
            style={style}
            ref={sectionRef}
            className={twMerge(
                "math-parallax-scene relative h-full w-full overflow-hidden",
                `${blurType}-blur`,
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
