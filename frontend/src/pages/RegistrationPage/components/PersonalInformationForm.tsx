import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Select } from "@/components/Select/Select";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    GenderEnum,
    SignupStepsDTO,
    SignupStepSchemas,
} from "../pages/SignupPage";

import locales from "@localization/signup_page.json";

export type PersonalInformationFormProps = {
    SubmitData: (data: SignupStepsDTO["personal-information"]) => void;
};

export const PersonalInformationForm: FC<PersonalInformationFormProps> = ({
    SubmitData,
}) => {
    const { GetLocale, GetErrorLocale, language } = useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(SignupStepSchemas["personal-information"]);

    return (
        <Form
            className="[&>main]:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] [&>main]:gap-x-4"
            onSubmit={handleSubmit(SubmitData)}
            title={
                <Locale variant="h1" className="text-xl font-bold">
                    {locales.title["personal-information"]}
                </Locale>
            }
            buttons={
                <>
                    <Button type="reset" onClick={(_e) => reset()}>
                        <Locale>{locales.buttons.clear}</Locale>
                    </Button>
                    <Button variant="primary" type="submit">
                        <Locale>{locales.buttons.finish}</Locale>
                    </Button>
                </>
            }
            lastOptions={
                <RichText
                    variant="p"
                    ExtractedTextRenders={(text) => (
                        <Link
                            className="text-primary-normal underline"
                            to="/registration/signup?step=credentials"
                        >
                            {text}
                        </Link>
                    )}
                >
                    {GetLocale(
                        locales["last-option"]["personal-information"],
                        language
                    )}
                </RichText>
            }
        >
            <Input
                required
                autoFocus
                autoComplete="off"
                {...register("username")}
                label={<Locale>{locales.inputs.username.label}</Locale>}
                errorMessage={GetErrorLocale(
                    errors.username?.message,
                    locales.inputs.username.errors,
                    language
                )}
                placeholder={GetLocale(
                    locales.inputs.username.placeholder,
                    language
                )}
            />
            <Input
                required
                autoComplete="off"
                {...register("name")}
                label={<Locale>{locales.inputs.name.label}</Locale>}
                errorMessage={GetErrorLocale(
                    errors.name?.message,
                    locales.inputs.name.errors,
                    language
                )}
                placeholder={GetLocale(
                    locales.inputs.name.placeholder,
                    language
                )}
            />
            <Input
                autoComplete="off"
                {...register("surname")}
                label={<Locale>{locales.inputs.surname.label}</Locale>}
                errorMessage={GetErrorLocale(
                    errors.surname?.message,
                    locales.inputs.surname.errors,
                    language
                )}
                placeholder={GetLocale(
                    locales.inputs.surname.placeholder,
                    language
                )}
            />
            <Input
                required
                autoComplete="off"
                {...register("phone-number")}
                label={<Locale>{locales.inputs["phone-number"].label}</Locale>}
                errorMessage={GetErrorLocale(
                    errors["phone-number"]?.message,
                    locales.inputs["phone-number"].errors,
                    language
                )}
                placeholder={GetLocale(
                    locales.inputs["phone-number"].placeholder,
                    language
                )}
            />
            <Select
                required
                {...register("gender")}
                options={Object.getEnumValues(GenderEnum)}
                label={<Locale>{locales.inputs.gender.label}</Locale>}
                rendersOptions={(option) =>
                    GetLocale(locales.inputs.gender.values[option], language)
                }
                errorMessage={GetErrorLocale(
                    errors.gender?.message,
                    locales.inputs.gender.errors,
                    language
                )}
            />
            <Input
                required
                autoComplete="off"
                {...register("country")}
                label={<Locale>{locales.inputs.country.label}</Locale>}
                errorMessage={GetErrorLocale(
                    errors.country?.message,
                    locales.inputs.country.errors,
                    language
                )}
                placeholder={GetLocale(
                    locales.inputs.country.placeholder,
                    language
                )}
            />
        </Form>
    );
};
