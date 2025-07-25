import { FC } from "react";
import { LevelTag } from "./LevelTag";
import { twJoin, twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { useNavigate } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { MathEquationDTO } from "@/schemas/MathEquationSchema";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { MathExpression } from "@/components/MathExpression/MathExpression";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

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
    className,
    isSkeleton,
    mathEquation,
}) => {
    const shadow = useShadow();
    const Navigate = useNavigate();

    const { direction } = useLocalization();

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
                    DISCOVER_ROUTES.base.routes.mathEquationID.MapVariable(
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
                        className={twJoin(
                            direction == "rtl" && "text-end",
                            "overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-lg font-bold"
                        )}
                        dir="ltr"
                        variant="h4"
                    >
                        {mathEquation.title}
                    </Typography>
                    <Typography
                        className="overflow-hidden max-lg:max-h-12"
                        dir="ltr"
                        variant="p"
                    >
                        {mathEquation.description}
                    </Typography>
                </Flexbox>
            )}

            {!isSkeleton && (
                <LevelTag
                    className={twJoin(
                        direction == "ltr" ? "pr-12! right-4" : "pl-12! left-4",
                        "absolute! text-md pointer-events-none top-4 [&>.icon]:border-2"
                    )}
                    level={mathEquation.level}
                />
            )}
        </button>
    );
};
