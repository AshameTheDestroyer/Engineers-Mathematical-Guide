import { z } from "zod";

export const EnvironmentVariablesSchema = z.object({
    BACKEND_API_URL: z.string().url(),
    ENVIRONMENT: z.enum(["development", "production"]),
});

export type EnvironmentVariablesDTO = z.infer<
    typeof EnvironmentVariablesSchema
>;

const rawEnvironmentVariables = import.meta.env;
const environmentVariables = Object.fromEntries(
    Object.entries(rawEnvironmentVariables).map(([key, value]) => [
        key.replace("VITE_", ""),
        value,
    ])
);

export const EnvironmentVariables =
    EnvironmentVariablesSchema.parse(environmentVariables);
