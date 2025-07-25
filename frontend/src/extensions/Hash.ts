interface String {
    /** Generates a deterministic 64-bit-like hash value for the string. */
    hash(): number;
}

String.prototype.hash = function (): number {
    const text = this as string;
    let hash = 0;

    if (text.length == 0) return 0;

    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = (hash * 31 + char) | 0;
    }

    hash = Math.abs(hash) >>> 0;

    const extendedHash = (hash * 2 ** 32) % Number.MAX_SAFE_INTEGER;

    return Math.floor(extendedHash);
};
