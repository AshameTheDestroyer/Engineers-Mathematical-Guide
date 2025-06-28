import { z } from "zod";
import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { MathParallaxScene } from "@/components/MathParallaxScene/MathParallaxScene";

export enum MathEquationsModeEnum {
    cards = "cards",
    parallax = "parallax",
}

export type MathEquationsMode = ExtractEnumValue<MathEquationsModeEnum>;

export const MathEquationsQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
    mode: z
        .nativeEnum(MathEquationsModeEnum)
        .optional()
        .default(MathEquationsModeEnum.parallax),
});

export const MathEquationsPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        MathEquationsQueryParamsSchema
    );

    return (
        <Flexbox
            gap="8"
            variant="main"
            direction="column"
            className="flex-grow"
        >
            <MathParallaxScene
                className={twJoin(
                    "flex-grow duration-300",
                    queryParams.mode != MathEquationsModeEnum.parallax &&
                        "pointer-events-none opacity-0"
                )}
            />

            <Button
                className="mx-auto w-full max-w-64"
                onClick={(_e) =>
                    setQueryParams((queryParams) => ({
                        ...queryParams,
                        mode:
                            queryParams?.mode == MathEquationsModeEnum.parallax
                                ? MathEquationsModeEnum.cards
                                : MathEquationsModeEnum.parallax,
                    }))
                }
            >
                {queryParams.mode == MathEquationsModeEnum.parallax
                    ? "Show Cards"
                    : "Toggle Parallax"}
            </Button>
        </Flexbox>
    );
};
