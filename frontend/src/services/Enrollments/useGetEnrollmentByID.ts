import { QueryClient } from "@tanstack/react-query";
import { EnrollmentDTO, EnrollmentSchema } from "@/schemas/EnrollmentSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import enrollments_dummy_data from "@data/enrollments.dummy.json";

export const GET_ENROLLMENT_BY_ID_KEY = "get-enrollment-by-id";

export const useGetEnrollmentByID = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = EnrollmentDTO | undefined,
>(
    courseID: string | undefined,
    username: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        EnrollmentDTO,
        EnrollmentDTO | undefined,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        EnrollmentDTO,
        EnrollmentDTO | undefined,
        TTransformFnData
    >(
        {
            schema: EnrollmentSchema,
            queryFn: () =>
                enrollments_dummy_data.find(
                    (enrollment) =>
                        enrollment.course == courseID &&
                        enrollment.username == username
                ),
            ...options,
            queryKey: [
                GET_ENROLLMENT_BY_ID_KEY,
                courseID,
                username,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
