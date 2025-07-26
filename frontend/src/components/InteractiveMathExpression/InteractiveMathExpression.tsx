import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { MathEquationDTO } from "@/schemas/MathEquationSchema";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { FC, useEffect, useImperativeHandle, useRef } from "react";
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
    information,
    ...props
}) => {
    const Navigate = useNavigate();

    const mathExpressionRef = useRef<HTMLParagraphElement>(null);
    useImperativeHandle(ref, () => mathExpressionRef.current!);

    useEffect(() => {
        if (mathExpressionRef.current == null) {
            return;
        }

        const mathJaxContainer = mathExpressionRef.current.querySelector("span")
            ?.firstElementChild as HTMLElement;

        if (mathJaxContainer != null) {
            mathJaxContainer.tabIndex = -1;
        }
    }, [mathExpressionRef.current]);

    return (
        <MathExpression
            id={id}
            ref={mathExpressionRef}
            className={twMerge(
                "hover:bg-primary-normal cursor-pointer rounded-2xl p-2 duration-200 hover:z-10 hover:text-white hover:shadow-2xl",
                className
            )}
            variant="p"
            role="button"
            onClick={(_e) =>
                Navigate(
                    DISCOVER_ROUTES.base.routes.mathEquationID.MapVariable(
                        information.id
                    )
                )
            }
            {...props}
        >
            {children}
        </MathExpression>
    );
};
