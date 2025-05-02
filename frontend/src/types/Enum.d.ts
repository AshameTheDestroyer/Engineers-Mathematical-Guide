type EnumValue = string | number;
type EnumValues = Array<EnumValue>;
type ExtractEnumValue<T extends EnumValue> = `${T}`;
type Enum = {
    [Key: string | number]: string;
};
type ExtractEnumValues<T extends Enum> = [keyof T, ...(keyof T)[]];
