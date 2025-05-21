export function CreateFilterFunction<T extends Record<string, any>>(
    searchQuery: string | undefined,
    keyFilters: Partial<Record<keyof T, (datum: T, term: string) => boolean>>
) {
    return function (datum: T) {
        const searchQuery_ = searchQuery?.trimAll();
        if (searchQuery_ == null || searchQuery_ == "") {
            return true;
        }

        const terms = searchQuery_.toLowerCase().split(" ");
        const predicates = Object.values(keyFilters);

        return terms.some((term) =>
            predicates.some((predicate) => predicate?.(datum, term))
        );
    };
}
