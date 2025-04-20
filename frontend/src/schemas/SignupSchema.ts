import { z } from "zod";
import { InferNested } from "@/types/Zod.InferNested";

export enum GenderEnum {
    male = "male",
    female = "female",
}

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
            .regex(/^[a-zA-Zأ-ي0-9]+(\ [a-zA-Zأ-ي0-9]+)?$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum"),
        surname: z
            .string()
            .regex(/^[a-zA-Zأ-ي0-9]+(\ [a-zA-Zأ-ي0-9]+)?$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum")
            .optional(),
        gender: z.nativeEnum(GenderEnum, {
            errorMap: () => ({ message: "required" }),
        }),
        country: z.string({ required_error: "required" }).nonempty("empty"),
        "phone-number": z
            .string({ required_error: "required" })
            .regex(
                /^\+*(\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}([\s.-]?\d{3})?[\s.-]?\d{3,4}$/,
                "pattern"
            )
            .min(8, "minimum")
            .max(18, "maximum"),
    }),
};

export const SignupSchema = z.intersection(
    SignupStepSchemas.credentials,
    SignupStepSchemas["personal-information"]
);

export type SignupDTO = z.infer<typeof SignupSchema>;
export type SignupStepsDTO = InferNested<typeof SignupStepSchemas>;
