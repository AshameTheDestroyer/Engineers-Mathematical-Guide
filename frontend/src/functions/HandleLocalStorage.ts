const LOCAL_STORAGE_KEY: string = "chess";
export default LOCAL_STORAGE_KEY;

export function GetFromLocalStorage<T>(key: string): T | undefined {
    try {
        return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY}-${key}`) ?? "") as T;
    } catch {
        return undefined;
    }
}

export function SetInLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}-${key}`, JSON.stringify(value));
}

export function DeepCopy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
}