import { z } from "zod";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { RichText } from "@/components/RichText/RichText";
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
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupDTO>({
        resolver: (values) => {
            const { data, error } = SignupSchema.safeParse(values);
            console.log(error);
            return {
                values: data!,
                errors: Object.entries(
                    error?.formErrors.fieldErrors ?? {}
                )?.reduce(
                    (accumulator, [error, message]) => ({
                        ...accumulator,
                        [error]: {
                            message: message[0],
                        },
                    }),
                    {}
                ),
            };
        },
    });

    const registeredEmail = register("email");
    const registeredPassword = register("password");
    const registeredConfirmPassword = register("confirm-password");
    const registeredTermsAndConditions = register("terms-and-conditions");

    return (
        <form
            className="flex h-full w-full flex-col gap-8"
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <Locale variant="h1" className="text-xl font-bold">
                {locales.title}
            </Locale>
            <main className="flex grow flex-col place-content-center gap-6">
                <Input
                    type="email"
                    {...registeredEmail}
                    onChange={(e) => (
                        registeredEmail.onChange(e),
                        setValue("email", e.target.value)
                    )}
                    autoComplete="off"
                    errorMessage={errors["email"]?.message}
                    label={<Locale>{locales.inputs.email.label}</Locale>}
                    placeholder={GetLocale(
                        locales.inputs.email.placeholder,
                        language
                    )}
                />
                <PasswordInput
                    {...registeredPassword}
                    onChange={(e) => (
                        registeredPassword.onChange(e),
                        setValue("password", e.target.value)
                    )}
                    autoComplete="off"
                    errorMessage={errors["password"]?.message}
                    label={<Locale>{locales.inputs.password.label}</Locale>}
                    placeholder={GetLocale(
                        locales.inputs.password.placeholder,
                        language
                    )}
                />
                <PasswordInput
                    {...registeredConfirmPassword}
                    onChange={(e) => (
                        registeredConfirmPassword.onChange(e),
                        setValue("confirm-password", e.target.value)
                    )}
                    autoComplete="off"
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
                    {...registeredTermsAndConditions}
                    onChange={(e) => (
                        registeredTermsAndConditions.onChange(e),
                        setValue("terms-and-conditions", e.target.checked)
                    )}
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
