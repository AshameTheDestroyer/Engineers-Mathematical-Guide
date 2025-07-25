import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { MathEquationCard } from "./MathEquationCard";
import { MathEquationDTO } from "@/schemas/MathEquationSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type MathEquationsDisplayProps =
    ChildlessComponentProps<HTMLDivElement> &
        Either<
            {
                isSkeleton?: false;
                mathEquations: Array<MathEquationDTO>;
            },
            {
                isSkeleton: true;
                mathEquations: Array<Partial<MathEquationDTO> | undefined>;
            }
        >;

export const MathEquationsDisplay: FC<MathEquationsDisplayProps> = ({
    id,
    ref,
    className,
    isSkeleton,
    mathEquations,
}) => {
    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "grid grow grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8",
                className
            )}
        >
            {mathEquations.map((mathEquation, i) => (
                <MathEquationCard
                    key={isSkeleton ? i : mathEquation!.id}
                    className="aspect-square"
                    isSkeleton={isSkeleton}
                    mathEquation={mathEquation as MathEquationDTO}
                />
            ))}
        </div>
    );
};
