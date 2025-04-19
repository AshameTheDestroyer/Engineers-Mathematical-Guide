import { z } from "zod";
import { FC } from "react";
import { LoginForm } from "./LoginForm";

export const LoginSchema = z.object({
    email: z.string({ required_error: "required" }).email("pattern"),
    password: z
        .string({ required_error: "required" })
        .min(4, "minimum")
        .max(20, "maximum"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export const LoginPage: FC = () => {
    function SubmitData(data: LoginDTO) {
        console.log(data);
    }

    return <LoginForm SubmitData={SubmitData} />;
};
