type FilterKeys<T, Condition> = {
    [K in keyof T]: K extends Condition ? K : never;
}[keyof T];

type PickByCondition<T, Condition> = Pick<T, FilterKeys<T, Condition>>;
type OmitByCondition<T, Condition> = Omit<T, FilterKeys<T, Condition>>;

type NonNullableKeys<T> = OmitByCondition<T, null | undefined>;