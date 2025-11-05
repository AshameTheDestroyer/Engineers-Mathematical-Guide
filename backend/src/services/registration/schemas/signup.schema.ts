import z from "zod";
import { GenderEnum } from "src/services/user";

export const SignupSchema = z
    .object({
        email: z.email("required"),
        password: z.string("required").min(8, "minimum").max(20, "maximum"),
        username: z
            .string("required")
            .regex(/^[a-zA-Z0-9\_]+$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum"),
        name: z
            .string("required")
            .regex(/^[a-zA-Zأ-ي0-9]+(\ [a-zA-Zأ-ي0-9]+)?$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum"),
        surname: z
            .string()
            .regex(/^[a-zA-Zأ-ي0-9]+(\ [a-zA-Zأ-ي0-9]+)?$/, "pattern")
            .min(2, "minimum")
            .max(20, "maximum")
            .optional(),
        gender: z.enum(GenderEnum, "required"),
        country: z.string("required").nonempty("empty"),
        "phone-number": z
            .string("required")
            .regex(
                /^\+*(\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}([\s.-]?\d{3})?[\s.-]?\d{3,4}$/,
                "pattern"
            )
            .min(8, "minimum")
            .max(18, "maximum"),
    })
    .refine((data) => data.password == data["confirm-password"], {
        message: "match",
        path: ["confirm-password"],
    })
    .refine((data) => data["terms-and-conditions"], {
        message: "agreement",
        path: ["terms-and-conditions"],
    });

export type SignupDTO = z.infer<typeof SignupSchema>;
