import { QueryClient } from "@tanstack/react-query";
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

export const useGetMathEquationByID = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = DetailedMathEquationDTO | undefined,
>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedMathEquationDTO,
        DetailedMathEquationDTO | undefined,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedMathEquationDTO,
        DetailedMathEquationDTO | undefined,
        TTransformFnData
    >(
        {
            schema: DetailedMathEquationSchema,
            queryFn: () =>
                (
                    detailed_math_equations_dummy_data as Array<DetailedMathEquationDTO>
                ).find((mathEquation) => mathEquation.id == id),
            ...options,
            queryKey: [
                GET_MATH_EQUATION_BY_ID_KEY,
                id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
