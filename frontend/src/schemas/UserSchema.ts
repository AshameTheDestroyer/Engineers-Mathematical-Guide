import { z } from "zod";
import { ZodIntersectMany } from "@/functions/Zod.IntersectMany";
import { SignupCredentialsSchema, SignupStepSchemas } from "./SignupSchema";

export enum RoleEnum {
    user = "user",
    admin = "admin",
}

export type Role = ExtractEnumValue<RoleEnum>;

export const UserSchema = ZodIntersectMany(
    SignupStepSchemas["personal-information"],
    SignupCredentialsSchema.pick({ email: true }),
    z.object({
        flag: z.string(),
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
        biography: z.string({ required_error: "required" }),
        role: z.nativeEnum(RoleEnum, {
            errorMap: () => ({ message: "required" }),
        }),
        xp: z
            .number({ required_error: "required" })
            .nonnegative("nonnegative")
            .int("integer"),
        followees: z.array(z.string({ required_error: "required" }), {
            required_error: "required",
        }),
        followers: z.array(z.string({ required_error: "required" }), {
            required_error: "required",
        }),
        "finished-courses": z.array(z.string({ required_error: "required" }), {
            required_error: "required",
        }),
        "enrolled-courses": z.array(z.string({ required_error: "required" }), {
            required_error: "required",
        }),
        "bookmarked-courses": z.array(
            z.string({ required_error: "required" }),
            { required_error: "required" }
        ),
    })
);

export type UserDTO = z.infer<typeof UserSchema>;
export type DetailedUserDTO = z.infer<typeof DetailedUserSchema>;
