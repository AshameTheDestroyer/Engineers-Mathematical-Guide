import { CreateFilterFunction } from "@/functions/CreateFilterFunction";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";
import {
    MathEquationDTO,
    MathEquationSchema,
} from "@/schemas/MathEquationSchema";

import math_equations_dummy_data from "@data/math_equations.dummy.json";

export const GET_MATH_EQUATIONS_KEY = "get-math-equations";

export const useGetMathEquations = <TUsesSuspense extends boolean = false>(
    searchQuery: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        MathEquationDTO,
        Array<MathEquationDTO>
    >
) =>
    useSchematicQuery<TUsesSuspense, MathEquationDTO, Array<MathEquationDTO>>({
        schema: MathEquationSchema,
        queryFn: () =>
            (math_equations_dummy_data as Array<MathEquationDTO>).filter(
                CreateFilterFunction<MathEquationDTO>(searchQuery, {
                    title: (mathEquation, term) =>
                        mathEquation.title.toLowerCase().includes(term),
                    "related-courses": (mathEquation, term) =>
                        mathEquation["related-courses"].some((relatedCourse) =>
                            relatedCourse.includes(term)
                        ),
                    discoverer: (mathEquation, term) =>
                        mathEquation.discoverer.toLowerCase().includes(term),
                    equation: (mathEquation, term) =>
                        mathEquation.equation.toLowerCase().includes(term),
                    level: (mathEquation, term) =>
                        mathEquation.level.toLowerCase().includes(term),
                })
            ),
        parseFn: (data, schema) =>
            data?.map((datum) => schema.parse(datum)) ?? [],
        ...options,
        queryKey: [
            GET_MATH_EQUATIONS_KEY,
            searchQuery,
            ...(options?.queryKey ?? []),
        ],
    });
