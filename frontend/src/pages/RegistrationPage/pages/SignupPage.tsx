import { z } from "zod";
import { FC } from "react";
import { Link } from "react-router-dom";
import HTTPInstance from "@/services/HTTPInstance";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../../../components/Input/Input";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/signup_page.json";

export const SignupSchema = z
    .object({
        email: z
            .string({ required_error: "Email is required." })
            .email("Email should be written as 'example@gmail.com'."),
        password: z
            .string({ required_error: "Password is required." })
            .min(4, "Password should consist of more than 4 characters.")
            .max(20, "Password should not exceed 20 characters."),
        "confirm-password": z.string({
            required_error: "You have to confirm previous password.",
        }),
        "terms-and-conditions": z.boolean({
            required_error: "Agreement is required.",
        }),
    })
    .refine((data) => data.password == data["confirm-password"], {
        message: "Passwords must match.",
        path: ["confirm-password"],
    })
    .refine((data) => data["terms-and-conditions"], {
        message: "You have to agree to our terms and conditions.",
        path: ["terms-and-conditions"],
    });

export type SignupDTO = z.infer<typeof SignupSchema>;

export const SignupPage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(SignupSchema);

    const { mutateAsync } = useMutation({
        mutationKey: ["signup"],
        mutationFn: (
            data: Omit<SignupDTO, "terms-and-conditions" | "confirm-password">
        ) => HTTPInstance.post<{ token: string }>("/auth/signup", data),
    });

    function SubmitData(data: SignupDTO) {
        const { email, password } = data;
        mutateAsync({ email, password }).then((result) =>
            console.log(result.data.token)
        );
    }

    return (
        <form
            className="flex h-full w-full flex-col gap-8"
            onSubmit={handleSubmit(SubmitData)}
        >
            <Locale variant="h1" className="text-xl font-bold">
                {locales.title}
            </Locale>
            <main className="flex grow flex-col place-content-center gap-6">
                <Input
                    required
                    type="email"
                    autoComplete="off"
                    {...register("email")}
                    errorMessage={errors["email"]?.message}
                    label={<Locale>{locales.inputs.email.label}</Locale>}
                    placeholder={GetLocale(
                        locales.inputs.email.placeholder,
                        language
                    )}
                />
                <PasswordInput
                    required
                    autoComplete="off"
                    {...register("password")}
                    errorMessage={errors["password"]?.message}
                    label={<Locale>{locales.inputs.password.label}</Locale>}
                    placeholder={GetLocale(
                        locales.inputs.password.placeholder,
                        language
                    )}
                />
                <PasswordInput
                    required
                    autoComplete="off"
                    {...register("confirm-password")}
                    errorMessage={errors["confirm-password"]?.message}
                    placeholder={GetLocale(
                        locales.inputs["confirm-password"].placeholder,
                        language
                    )}
                    label={
                        <Locale>
                            {locales.inputs["confirm-password"].label}
                        </Locale>
                    }
                />
                <Checkbox
                    required
                    {...register("terms-and-conditions")}
                    errorMessage={errors["terms-and-conditions"]?.message}
                    label={
                        <RichText
                            ExtractedTextRenders={(text) => (
                                <Link
                                    className="text-secondary-normal underline"
                                    to="/registration/terms-and-conditions"
                                >
                                    {text}
                                </Link>
                            )}
                        >
                            {GetLocale(
                                locales.inputs["terms-and-conditions"],
                                language
                            )}
                        </RichText>
                    }
                />
            </main>
            <ButtonBox
                className="[&>button]:grow"
                direction={direction == "ltr" ? "row" : "reverse-row"}
            >
                <Button
                    type="reset"
                    onClick={(_e) => reset({ "terms-and-conditions": false })}
                >
                    <Locale>{locales.buttons.clear}</Locale>
                </Button>
                <Button variant="primary" type="submit">
                    <Locale>{locales.buttons.signup}</Locale>
                </Button>
            </ButtonBox>
            <RichText
                variant="p"
                ExtractedTextRenders={(text) => (
                    <Link
                        className="text-primary-normal underline"
                        to="/registration/login"
                    >
                        {text}
                    </Link>
                )}
            >
                {GetLocale(locales["last-option"], language)}
            </RichText>
        </form>
    );
};
