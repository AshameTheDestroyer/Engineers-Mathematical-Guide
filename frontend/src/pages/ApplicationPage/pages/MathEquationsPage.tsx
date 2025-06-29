import { z } from "zod";
import { queryClient } from "@/contexts";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { IconButton } from "@/components/IconButton/IconButton";
import { Typography } from "@/components/Typography/Typography";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { MathEquationsDisplay } from "../components/MathEquationsDisplay";
import { MathParallaxScene } from "@/components/MathParallaxScene/MathParallaxScene";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";
import {
    useGetMathEquations,
    GET_MATH_EQUATIONS_KEY,
} from "@/services/MathEquations/useGetMathEquations";

import function_icon from "@icons/function.svg";
import card_view_icon from "@icons/card_view.svg";

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

    const [searchQuery, setSearchQuery] = useState(queryParams.query);
    const debouncedSearchQuery = useDebounce(searchQuery);

    const {
        refetch,
        isError,
        isLoading,
        data: mathEquations,
    } = useGetMathEquations(debouncedSearchQuery, {
        enabled: queryParams.mode == MathEquationsModeEnum.cards,
    });

    const skeletonArray = new Array(10).fill(null);

    useEffect(() => {
        setQueryParams((queryParams) => ({
            ...queryParams,
            query: debouncedSearchQuery.trimAll(),
        }));

        queryClient.invalidateQueries({
            queryKey: [GET_MATH_EQUATIONS_KEY],
        });
    }, [debouncedSearchQuery]);

    return (
        <Flexbox
            gap="8"
            variant="main"
            direction="column"
            className="flex-grow"
        >
            <Flexbox
                rowGap="4"
                columnGap="8"
                variant="header"
                placeItems="center"
                placeContent="space-between"
                className="max-sm:flex-wrap"
            >
                <Flexbox gap="4">
                    <Typography variant="h1" className="text-2xl font-bold">
                        Math Equations
                    </Typography>
                    <IconButton
                        className="my-auto"
                        icon={{
                            source:
                                queryParams.mode ==
                                MathEquationsModeEnum.parallax
                                    ? card_view_icon
                                    : function_icon,
                            className:
                                queryParams.mode ==
                                MathEquationsModeEnum.parallax
                                    ? "[&_svg]:scale-125"
                                    : "",
                        }}
                        onClick={(_e) =>
                            setQueryParams((queryParams) => ({
                                ...queryParams,
                                mode:
                                    queryParams.mode ==
                                    MathEquationsModeEnum.parallax
                                        ? MathEquationsModeEnum.cards
                                        : MathEquationsModeEnum.parallax,
                            }))
                        }
                    />
                </Flexbox>

                {queryParams.mode == MathEquationsModeEnum.cards && (
                    <Input
                        className="max-sm:grow"
                        name="query"
                        type="search"
                        label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                )}
            </Flexbox>

            {queryParams.mode == MathEquationsModeEnum.cards ? (
                <Flexbox className="grow" variant="main">
                    {isLoading || mathEquations == null ? (
                        <MathEquationsDisplay
                            isSkeleton
                            mathEquations={skeletonArray}
                        />
                    ) : isError ? (
                        <SearchResultDisplay
                            className="grow"
                            title="Error!"
                            iconType="error"
                            paragraph="An error occurred while fetching math equations, try refetching."
                            buttons={
                                <Button onClick={(_e) => refetch()}>
                                    Refetch Math Equations
                                </Button>
                            }
                        />
                    ) : mathEquations.length == 0 ? (
                        <SearchResultDisplay
                            className="grow"
                            iconType="search-off"
                            title="No Courses Found"
                            paragraph={`The term **${debouncedSearchQuery}** was not found, try searching for another thing.`}
                            buttons={
                                <Button onClick={(_e) => setSearchQuery("")}>
                                    Clear Search
                                </Button>
                            }
                        />
                    ) : (
                        <MathEquationsDisplay mathEquations={mathEquations} />
                    )}
                </Flexbox>
            ) : (
                <MathParallaxScene className="grow max-lg:h-[calc(100vh-var(--spacing-page)*4)]" />
            )}
        </Flexbox>
    );
};
