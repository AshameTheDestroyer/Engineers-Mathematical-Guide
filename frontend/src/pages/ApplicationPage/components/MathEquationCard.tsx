import { FC } from "react";
import { LevelTag } from "./LevelTag";
import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { useNavigate } from "react-router-dom";
import { MathEquationDTO } from "@/schemas/MathEquationSchema";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { MathExpression } from "@/components/MathExpression/MathExpression";
import { Flexbox } from "@/components/Flexbox/Flexbox";

export type MathEquationCardProps = ChildlessComponentProps<HTMLButtonElement> &
    Either<
        {
            isSkeleton?: false;
            mathEquation: MathEquationDTO;
        },
        {
            isSkeleton: true;
            mathEquation?: Partial<MathEquationDTO>;
        }
    >;

export const MathEquationCard: FC<MathEquationCardProps> = ({
    id,
    ref,
    mathEquation,
    className,
    isSkeleton,
}) => {
    const shadow = useShadow();
    const Navigate = useNavigate();

    return (
        <button
            id={id}
            ref={ref}
            className={twMerge(
                isSkeleton
                    ? "animate-pulse bg-black/50"
                    : "bg-background-normal",
                "relative isolate flex cursor-pointer flex-col overflow-hidden rounded-2xl p-8 text-start transition duration-200 [&:is(:hover,:focus-within)]:scale-105",
                className
            )}
            role="region"
            style={{ boxShadow: shadow }}
            tabIndex={isSkeleton ? -1 : 0}
            aria-label={isSkeleton ? undefined : mathEquation.title}
            onClick={(_e) =>
                !isSkeleton &&
                Navigate(
                    APPLICATION_ROUTES.base.routes.mathEquationID.MapVariable(
                        mathEquation.id
                    )
                )
            }
        >
            {!isSkeleton && (
                <MathExpression
                    className="my-auto w-full overflow-x-auto overflow-y-hidden px-1 py-2 text-lg [&>*]:mx-auto [&>*]:w-min"
                    variant="p"
                >
                    {mathEquation.equation}
                </MathExpression>
            )}
            {!isSkeleton && (
                <Flexbox direction="column" gap="2">
                    <Typography
                        variant="h4"
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-lg font-bold"
                    >
                        {mathEquation.title}
                    </Typography>
                    <Typography
                        className="overflow-hidden max-lg:max-h-12"
                        variant="p"
                    >
                        {mathEquation.description}
                    </Typography>
                </Flexbox>
            )}

            {!isSkeleton && (
                <LevelTag
                    className="absolute! text-md pr-12! pointer-events-none right-4 top-4 [&>.icon]:border-2"
                    level={mathEquation.level}
                />
            )}
        </button>
    );
};
