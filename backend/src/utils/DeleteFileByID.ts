import { mongo } from "mongoose";

export async function DeleteFileByID(
    id: string,
    db: mongo.Db,
    options?: { suppressError?: boolean }
) {
    const bucket = new mongo.GridFSBucket(db, {
        bucketName: "uploads",
    });

    try {
        await bucket.delete(new mongo.ObjectId(id));
    } catch (error) {
        if (!options?.suppressError) {
            throw error;
        }
    }
}
