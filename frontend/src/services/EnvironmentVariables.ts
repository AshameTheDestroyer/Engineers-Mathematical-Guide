import { z } from "zod";

const EnvironmentVariablesSchema = z.object({
    BACKEND_API_URL: z.string().url(),
    ENVIRONMENT: z.enum(["development", "production"]),
});

const rawEnvironmentVariables = import.meta.env;
const trimmedEnvironmentVariables = Object.fromEntries(
    Object.entries(rawEnvironmentVariables).map(([key, value]) => [
        key.replace("VITE_", ""),
        value,
    ])
);

export const environmentVariables = EnvironmentVariablesSchema.parse(
    trimmedEnvironmentVariables
);
