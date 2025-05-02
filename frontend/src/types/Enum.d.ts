type EnumValue = string | number;
type EnumValues = Array<EnumValue>;
type Enum = Record<string | number, string>;
type ExtractEnumValue<T extends EnumValue> = `${T}`;
type ExtractEnumValues<T extends Enum> = [keyof T, ...(keyof T)[]];
