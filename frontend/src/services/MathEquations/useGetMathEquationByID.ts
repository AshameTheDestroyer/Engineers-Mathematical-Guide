import {
    DetailedMathEquationDTO,
    DetailedMathEquationSchema,
} from "@/schemas/MathEquationSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_math_equations_dummy_data from "@data/detailed_math_equations.dummy.json";

export const GET_MATH_EQUATION_BY_ID_KEY = "get-math-equation-by-id";

export const useGetMathEquationByID = <TUsesSuspense extends boolean = false>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedMathEquationDTO,
        DetailedMathEquationDTO | undefined
    >
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedMathEquationDTO,
        DetailedMathEquationDTO | undefined
    >({
        schema: DetailedMathEquationSchema,
        queryFn: () =>
            (
                detailed_math_equations_dummy_data as Array<DetailedMathEquationDTO>
            ).find((mathEquation) => mathEquation.id == id),
        parseFn: (data, schema) => (data != null ? schema.parse(data) : data),
        ...options,
        queryKey: [
            GET_MATH_EQUATION_BY_ID_KEY,
            id,
            ...(options?.queryKey ?? []),
        ],
    });
