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
            .number("required")
            .nonnegative("nonnegative")
            .int("integer"),
    })
);

export const DetailedUserSchema = z.intersection(
    UserSchema,
    z.object({
        city: z.string("required"),
        banner: z.string().optional(),
        biography: z.string("required"),
        role: z.enum(RoleEnum, "required"),
        specialization: z.string().optional(),
        followees: z.array(z.string("required"), "required"),
        followers: z.array(z.string("required"), "required"),
        "finished-courses": z.array(z.string("required"), "required"),
        "enrolled-courses": z.array(z.string("required"), "required"),
        "bookmarked-courses": z.array(z.string("required"), "required"),
        xp: z.number("required").nonnegative("nonnegative").int("integer"),
    })
);

export type UserDTO = z.infer<typeof UserSchema>;
export type DetailedUserDTO = z.infer<typeof DetailedUserSchema>;
