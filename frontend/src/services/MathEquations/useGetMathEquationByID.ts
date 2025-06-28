import {
    MathEquationDTO,
    MathEquationSchema,
} from "@/schemas/MathEquationSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import math_equations_dummy_data from "@data/math_equations.dummy.json";

export const GET_MATH_EQUATION_BY_ID_KEY = "get-math-equation-by-id";

export const useGetMathEquationByID = <TUsesSuspense extends boolean = false>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        MathEquationDTO,
        MathEquationDTO | undefined
    >
) =>
    useSchematicQuery<
        TUsesSuspense,
        MathEquationDTO,
        MathEquationDTO | undefined
    >({
        schema: MathEquationSchema,
        queryFn: () =>
            (math_equations_dummy_data as Array<MathEquationDTO>).find(
                (mathEquation) => mathEquation.id == id
            ),
        parseFn: (data, schema) => (data != null ? schema.parse(data) : data),
        ...options,
        queryKey: [
            GET_MATH_EQUATION_BY_ID_KEY,
            id,
            ...(options?.queryKey ?? []),
        ],
    });
