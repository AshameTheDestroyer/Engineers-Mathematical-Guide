interface PromiseConstructor {
    /** Creates a Promise that resolves the provided data after waiting for a given time. */
    wait<T>(time: number, data: T): Promise<T>;
}

Promise.wait = function <T>(time: number, data: T): Promise<T> {
    return new Promise<T>((resolve) => setTimeout(() => resolve(data), time));
};
