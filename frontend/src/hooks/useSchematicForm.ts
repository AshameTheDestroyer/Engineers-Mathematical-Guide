import { ZodSchema } from "zod";
import { FieldValues, useForm } from "react-hook-form";

export const useSchematicForm = <T extends FieldValues>(
    schema: ZodSchema<T>,
    props?: Omit<Parameters<typeof useForm<T>>[0] & {}, "resolver">
) => {
    const { register: _register, ...formProps } = useForm<T>({
        ...props,
        resolver: (values) => {
            const { data, error, success } = schema.safeParse(values);
            return {
                values: success ? data : {},
                errors: Object.entries(
                    error?.formErrors.fieldErrors ?? {}
                )?.reduce(
                    (accumulator, [error, messages]) => ({
                        ...accumulator,
                        [error]: {
                            message: (messages as any)?.[0],
                        },
                    }),
                    {}
                ),
            };
        },
    });

    const register: typeof _register = (name, options) => {
        const { onChange: _onChange, ...registerProps } = _register(
            name,
            options
        );

        const onChange: typeof _onChange = (e) => {
            const result = _onChange(e);
            const value = formProps.getValues()[name];
            formProps.setValue(
                name,
                e.target[typeof value == "boolean" ? "checked" : "value"]
            );
            return result;
        };

        return { onChange, ...registerProps };
    };

    return { register, ...formProps };
};
