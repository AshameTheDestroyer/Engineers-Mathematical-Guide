import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useThemeMode } from "../ThemeModeProvider/ThemeModeProvider";
import { useGetMathEquations } from "@/services/MathEquations/useGetMathEquations";
import { InteractiveMathExpression } from "../InteractiveMathExpression/InteractiveMathExpression";
import {
    BlurredContainer,
    BlurredContainerProps,
} from "../BlurredContainer/BlurredContainer";
import {
    FC,
    useRef,
    useState,
    useEffect,
    CSSProperties,
    useImperativeHandle,
} from "react";

import "./math_parallax_scene.css";

export type MathParallaxSceneProps = ChildlessComponentProps<HTMLDivElement> & {
    sparseness?: number;
    duration?: `${number}${"s" | "ms"}`;
    direction?: { x?: "left" | "right"; y?: "top" | "bottom" };
} & Omit<BlurredContainerProps, "children">;

export const MathParallaxScene: FC<MathParallaxSceneProps> = ({
    id,
    ref,
    className,
    blurPercentage,
    sparseness = 1.5,
    duration = "25s",
    blurType = "rectangular",
    direction = { x: "left", y: "top" },
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => sectionRef.current!);

    const { isDarkThemed } = useThemeMode();

    const { width, height } = useElementInformation(sectionRef);
    const [mathEquationStyles, setMathEquationStyles] = useState(
        [] as Array<CSSProperties>
    );

    const { data: mathEquations } = useGetMathEquations(undefined, {
        usesSuspense: true,
    });

    const style = {
        "--duration": duration,
        "--y": direction.y == "top" ? 1 : direction.y == "bottom" ? -1 : 0,
        "--x": direction.x == "left" ? 1 : direction.x == "right" ? -1 : 0,
    } as CSSProperties;

    useEffect(() => {
        setMathEquationStyles(
            mathEquations.map((_) =>
                width == 0 && height == 0
                    ? { opacity: 0 }
                    : {
                          opacity: 1,
                          scale: Math.random() * 0.25 + 1,
                          top: ~~(Math.random() * height * sparseness),
                          left: ~~(Math.random() * width * sparseness),
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
            {mathEquations.map((mathEquation, i) => (
                <InteractiveMathExpression
                    key={mathEquation.id}
                    className="z-1 absolute"
                    style={{ opacity: 0, ...mathEquationStyles[i] }}
                    information={mathEquation}
                >
                    {mathEquation.equation}
                </InteractiveMathExpression>
            ))}
        </div>
    );

    return (
        <BlurredContainer
            id={id}
            style={style}
            ref={sectionRef}
            className={twMerge(
                "math-parallax-scene relative h-full w-full overflow-hidden",
                !isDarkThemed && "text-background-darker",
                className
            )}
            variant="section"
            blurType={blurType}
            blurPercentage={blurPercentage}
        >
            {new Array(4).fill(null).map((_, i) => (
                <EquationContainer
                    key={i}
                    style={{
                        animationName: `math-equation-movement${i + 1}`,
                    }}
                />
            ))}
        </BlurredContainer>
    );
};
