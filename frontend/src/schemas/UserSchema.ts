import { z } from "zod";
import { SignupStepSchemas } from "./SignupSchema";

export const UserSchema = z.intersection(
    SignupStepSchemas["personal-information"],
    z.object({
        avatar: z.string().optional(),
        "personal-image": z.string().optional(),
        "day-streak": z
            .number({ required_error: "required" })
            .nonnegative("nonnegative")
            .int("integer"),
    })
);

export const DetailedUserSchema = z.intersection(
    UserSchema,
    z.object({
        banner: z.string().optional(),
        specialization: z.string().optional(),
        city: z.string({ required_error: "required" }),
        about: z.string({ required_error: "required" }).default(""),
        followees: z
            .number({ required_error: "required" })
            .nonnegative("nonnegative")
            .int("integer"),
        followers: z
            .number({ required_error: "required" })
            .nonnegative("nonnegative")
            .int("integer"),
        "finished-courses": z
            .array(z.string({ required_error: "required" }), {
                required_error: "required",
            })
            .default([]),
        "enrolled-courses": z
            .array(z.string({ required_error: "required" }), {
                required_error: "required",
            })
            .default([]),
        "bookmarked-courses": z
            .array(z.string({ required_error: "required" }), {
                required_error: "required",
            })
            .default([]),
    })
);

export type UserDTO = z.infer<typeof UserSchema>;
export type DetailedUserDTO = z.infer<typeof DetailedUserSchema>;
