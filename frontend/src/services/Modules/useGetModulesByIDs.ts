import { QueryClient } from "@tanstack/react-query";
import { ModuleDTO, ModuleSchema } from "@/schemas/ModuleSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import modules_dummy_data from "@data/modules.dummy.json";

export const GET_MODULES_BY_IDS_KEY = "get-modules-by-ids";

export const useGetModulesByIDs = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<ModuleDTO>,
>(
    ids: Array<string>,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        ModuleDTO,
        Array<ModuleDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        ModuleDTO,
        Array<ModuleDTO>,
        TTransformFnData
    >(
        {
            schema: ModuleSchema,
            queryFn: () =>
                ids
                    .map((id) =>
                        modules_dummy_data.find((module) => module.id == id)
                    )
                    .filter((module) => module != null),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [
                GET_MODULES_BY_IDS_KEY,
                ...ids,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
