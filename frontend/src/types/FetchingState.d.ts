type FetchingState = {
    reset: () => void;
    isError?: boolean;
    isPending?: boolean;
    isSuccess?: boolean;
};
