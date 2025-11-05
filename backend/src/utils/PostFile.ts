import { mongo } from "mongoose";

export async function PostFile(
    file: Express.Multer.File,
    db: mongo.Db,
    bucketName: string = "uploads"
): Promise<{ fileID: any; message: string }> {
    return new Promise((resolve, reject) => {
        const { originalname, mimetype, buffer } = file;
        const bucket = new mongo.GridFSBucket(db, { bucketName });
        const uploadStream = bucket.openUploadStream(originalname, {
            contentType: mimetype,
        });

        uploadStream.end(buffer);

        uploadStream.on("finish", () =>
            resolve({
                fileID: uploadStream.id,
                message: "File uploaded successfully!",
            })
        );

        uploadStream.on("error", (error) => reject(error));
    });
}
