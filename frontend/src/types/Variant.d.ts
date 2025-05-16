type Variant =
    | "epic"
    | "error"
    | "success"
    | "default"
    | "primary"
    | "warning"
    | "secondary"
    | "information";

type VariantClassNames = Record<Variant, Record<string, string>>;
