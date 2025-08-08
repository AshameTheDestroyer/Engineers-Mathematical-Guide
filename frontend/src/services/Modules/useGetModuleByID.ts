import { QueryClient } from "@tanstack/react-query";
import { ModuleDTO, ModuleSchema } from "@/schemas/ModuleSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import modules_dummy_data from "@data/modules.dummy.json";

export const GET_MODULE_BY_ID_KEY = "get-module-by-id";

export const useGetModuleByID = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = ModuleDTO | undefined,
>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        ModuleDTO,
        ModuleDTO | undefined,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        ModuleDTO,
        ModuleDTO | undefined,
        TTransformFnData
    >(
        {
            schema: ModuleSchema,
            queryFn: () => modules_dummy_data.find((module) => module.id == id),
            ...options,
            queryKey: [GET_MODULE_BY_ID_KEY, id, ...(options?.queryKey ?? [])],
        },
        queryClient
    );
