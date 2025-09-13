import mongoose, { InferSchemaType } from "mongoose";

export const UserSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        banner: { type: String },
        surname: { type: String },
        biography: { type: String },
        xp: { type: Number, default: 0 },
        "personal-image": { type: String },
        name: { type: String, required: true },
        flag: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        "day-streak": { type: Number, default: 0 },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        "phone-number": { type: String, required: true, unique: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        gender: { type: String, enum: ["male", "female"], required: true },

        _loginToken: String,
        _resetToken: String,
        _resetTokenExpirationDate: Number,
    },
    {
        autoIndex: false,
        timestamps: true,
    }
);

UserSchema.index({ email: "text", "phone-number": "text", username: "text" });

export const UserModel = mongoose.model("User", UserSchema);

UserModel.createIndexes();

export type UserProps = Omit<InferSchemaType<typeof UserSchema>, `_${string}`>;
