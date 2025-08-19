import { z } from "zod";
import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { SearchHeader } from "@/components/SearchHeader";
import { IconButton } from "@/components/IconButton/IconButton";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { MathEquationsDisplay } from "../components/MathEquationsDisplay";
import { useGetMathEquations } from "@/services/MathEquations/useGetMathEquations";
import { MathParallaxScene } from "@/components/MathParallaxScene/MathParallaxScene";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import function_icon from "@icons/function.svg";
import card_view_icon from "@icons/card_view.svg";

import locales from "@localization/math_equations_page.json";

export enum MathEquationsModeEnum {
    cards = "cards",
    parallax = "parallax",
}

export type MathEquationsMode = ExtractEnumValue<MathEquationsModeEnum>;

export const MathEquationsQueryParamsSchema = z.object({
    query: z.string().optional().default(""),
    mode: z
        .nativeEnum(MathEquationsModeEnum, {
            errorMap: () => ({ message: "required" }),
        })
        .optional()
        .default(MathEquationsModeEnum.parallax),
});

export const MathEquationsPage: FC = () => {
    const { language, GetLocale } = useLocalization();

    const {
        queryParams,
        searchQuery,
        setSearchQuery,
        setQueryParams,
        debouncedSearchQuery,
    } = useSchematicSearch(MathEquationsQueryParamsSchema);

    const {
        refetch,
        isError,
        isLoading,
        data: mathEquations,
    } = useGetMathEquations(debouncedSearchQuery, {
        enabled: queryParams.mode == MathEquationsModeEnum.cards,
    });

    const skeletonArray = new Array(10).fill(null);

    return (
        <Flexbox
            gap="8"
            variant="main"
            direction="column"
            className="flex-grow"
        >
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title={GetLocale(locales.title, language)}
                inputLabel={GetLocale(locales.inputs.search.label, language)}
                withoutSearchInput={
                    queryParams.mode != MathEquationsModeEnum.cards
                }
                buttons={
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
                }
            />

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
                            iconType="error"
                            title={GetLocale(
                                locales.display.error.title,
                                language
                            )}
                            paragraph={GetLocale(
                                locales.display.error.paragraph,
                                language
                            )}
                            buttons={
                                <Button onClick={(_e) => refetch()}>
                                    <Locale>
                                        {locales.display.error.button}
                                    </Locale>
                                </Button>
                            }
                        />
                    ) : mathEquations.length == 0 ? (
                        <SearchResultDisplay
                            className="grow"
                            iconType="empty"
                            title={GetLocale(
                                locales.display.empty.title,
                                language
                            )}
                            paragraph={GetLocale(
                                locales.display.empty.paragraph,
                                language
                            ).replace(
                                /\*\*([^\*]+)\*\*/,
                                `**"${debouncedSearchQuery}"**`
                            )}
                            buttons={
                                <Button onClick={(_e) => setSearchQuery("")}>
                                    <Locale>
                                        {locales.display.empty.button}
                                    </Locale>
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
