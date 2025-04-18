import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { InferNested } from "@/types/Zod.InferNested";
import { HTTPInstance } from "@/services/HTTPInstance";
import { SignupCredentialsForm } from "./SignupCredentialsForm";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { SignupPersonalInformationForm } from "./SignupPersonalInformationForm";

export const SignupStepSchemas = {
    credentials: z
        .object({
            email: z.string({ required_error: "required" }).email("pattern"),
            password: z
                .string({ required_error: "required" })
                .min(4, "minimum")
                .max(20, "maximum"),
            "confirm-password": z.string({ required_error: "required" }),
            "terms-and-conditions": z.boolean({ required_error: "required" }),
        })
        .refine((data) => data.password == data["confirm-password"], {
            message: "match",
            path: ["confirm-password"],
        })
        .refine((data) => data["terms-and-conditions"], {
            message: "agreement",
            path: ["terms-and-conditions"],
        }),
    "personal-information": z.object({
        username: z
            .string({ required_error: "required" })
            .regex(/^[a-zA-Z0-9\_]+$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum"),
        name: z
            .string({ required_error: "required" })
            .regex(/^[a-zA-Z0-9]+$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum"),
        surname: z
            .string()
            .regex(/^[a-zA-Z0-9]+$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum")
            .optional(),
        gender: z.enum(["male", "female"], { required_error: "required" }),
        country: z.string({ required_error: "required" }).nonempty("empty"),
        "phone-number": z
            .string({ required_error: "required" })
            .regex(
                /\+(\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}([\s.-]?\d{3})?[\s.-]?\d{3,4}/g,
                "pattern"
            )
            .min(8, "minimum")
            .max(18, "maximum"),
    }),
};

export const SignupSchema = SignupStepSchemas.credentials.and(
    SignupStepSchemas["personal-information"]
);

export type SignupDTO = z.infer<typeof SignupSchema>;
export type SignupStepsDTO = InferNested<typeof SignupStepSchemas>;

export const SignupQueryParamSchema = z.object({
    step: z.enum(["credentials", "personal-information"]),
});

export type SignupQueryParamDTO = z.infer<typeof SignupQueryParamSchema>;

export const SignupPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        SignupQueryParamSchema
    );

    const [data, setData] = useState<
        WithPartial<SignupStepsDTO, keyof SignupStepsDTO>
    >({});

    const { mutateAsync } = useMutation({
        mutationKey: ["signup"],
        mutationFn: ({ "phone-number": phoneNumber, ...data }: SignupDTO) =>
            HTTPInstance.post<{ token: string }>("/auth/signup", {
                ...Object.omit(
                    data,
                    "confirm-password",
                    "terms-and-conditions"
                ),
                phoneNumber,
            }),
    });

    useEffect(() => {
        const hasSkippedCredentialsStep =
            data.credentials == null && queryParams?.step != "credentials";
        if (queryParams == null || hasSkippedCredentialsStep) {
            setQueryParams((_queryParams) => ({ step: "credentials" }));
        }
    }, [queryParams]);

    useEffect(() => {
        const { data: validatedData, success } = SignupSchema.safeParse({
            ...data.credentials,
            ...data["personal-information"],
        });

        if (!success) {
            return;
        }

        mutateAsync(validatedData)
            .then((response) => response.data)
            .then(console.log)
            .catch(console.error);
    }, [data]);

    function SubmitCredentials(credentials: SignupStepsDTO["credentials"]) {
        setData((data) => ({ ...data, credentials }));
        setQueryParams((_queryParams) => ({ step: "personal-information" }));
    }

    function SubmitPersonalInformation(
        personalInformation: SignupStepsDTO["personal-information"]
    ) {
        setData((data) => ({
            ...data,
            "personal-information": personalInformation,
        }));
    }

    switch (queryParams?.step) {
        case "credentials":
            return <SignupCredentialsForm SubmitData={SubmitCredentials} />;
        case "personal-information":
            return (
                <SignupPersonalInformationForm
                    SubmitData={SubmitPersonalInformation}
                />
            );
    }
};
