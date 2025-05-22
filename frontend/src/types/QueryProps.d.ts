type QueryProps<T> = {
    data: T;
    isError?: boolean;
    refetch: () => void;
    isLoading?: boolean;
    isSuccess?: boolean;
};
