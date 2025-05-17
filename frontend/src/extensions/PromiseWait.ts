interface PromiseConstructor {
    /** Creates a Promise that resolves the provided data after waiting for a given time. */
    wait<T>(data: T, time: number): Promise<T>;
}

Promise.wait = function <T>(data: T, time: number): Promise<T> {
    return new Promise<T>((resolve) => setTimeout(() => resolve(data), time));
};
