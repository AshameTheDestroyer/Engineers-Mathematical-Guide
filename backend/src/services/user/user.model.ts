import { model, Schema } from "mongoose";
import { ExtractEnumValue } from "src/types/Enum";

export enum RoleEnum {
    user = "user",
    admin = "admin",
}

export type Role = ExtractEnumValue<RoleEnum>;

export enum GenderEnum {
    male = "male",
    female = "female",
}

export type Gender = ExtractEnumValue<GenderEnum>;

export const UserDBSchema = new Schema(
    {
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        "phone-number": { type: String, required: true, unique: true },

        surname: String,
        biography: String,
        name: { type: String, required: true },

        role: { type: String, enum: RoleEnum, required: true },
        gender: { type: String, enum: GenderEnum, required: true },

        avatar: String,
        banner: String,
        "personal-image": String,

        flag: String,
        city: String,
        country: { type: String, required: true },

        specialization: String,

        xp: { type: Number, default: 0 },
        "day-streak": { type: Number, default: 0 },

        followees: { type: Array<String>, default: [] },
        followers: { type: Array<String>, default: [] },
        "enrolled-courses": { type: Array<String>, default: [] },
        "finished-courses": { type: Array<String>, default: [] },
        "bookmarked-courses": { type: Array<String>, default: [] },

        _loginToken: String,
        _resetToken: String,
        _resetTokenExpirationDate: Number,
    },
    {
        autoIndex: false,
        timestamps: true,
    }
);

export const UserModel = model("User", UserDBSchema);

UserModel.createIndexes();
