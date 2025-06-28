import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { MathEquationDTO } from "@/schemas/MathEquationSchema";
import {
    MathExpression,
    MathExpressionProps,
} from "../MathExpression/MathExpression";

export type InteractiveMathExpressionProps = Omit<
    MathExpressionProps,
    "variant"
> & {
    information: Omit<MathEquationDTO, "equation">;
};

export const InteractiveMathExpression: FC<InteractiveMathExpressionProps> = ({
    id,
    ref,
    children,
    className,
    ...props
}) => {
    const Navigate = useNavigate();

    return (
        <MathExpression
            id={id}
            ref={ref}
            className={twMerge(
                "hover:bg-primary-normal cursor-pointer rounded-2xl p-2 duration-200 hover:z-10 hover:text-white hover:shadow-2xl",
                className
            )}
            variant="p"
            onClick={(_e) => Navigate("")}
            {...props}
        >
            {children}
        </MathExpression>
    );
};
