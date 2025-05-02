type Enum = {
    readonly [k: string]: string | number;
    readonly [nu: number]: string;
};

type EnumValue = string | number;
type ExtractEnumValue<T extends EnumValue> = `${T}`;

type EnumValues<T extends string = string> = readonly [T, ...T[]];
type ExtractEnumValues<T extends Enum> = EnumValues<
    {
        [Key in keyof T]: Key;
    }[keyof T]
>;
