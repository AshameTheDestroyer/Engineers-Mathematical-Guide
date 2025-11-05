export type EnumValue = string | number;
export type EnumValues = Array<EnumValue>;
export type Enum = Record<EnumValue, string>;
export type ExtractEnumValue<T extends EnumValue> = `${T}`;
export type ExtractEnumValues<T extends Enum> = [keyof T, ...(keyof T)[]];
