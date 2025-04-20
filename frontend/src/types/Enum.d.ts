type EnumValues<T extends string = string> = readonly [T, ...T[]];

type Enum = {
    readonly [k: string]: string | number;
    readonly [nu: number]: string;
};

type ExtractEnumValues<T extends Enum> = EnumValues<T[keyof T]>;
