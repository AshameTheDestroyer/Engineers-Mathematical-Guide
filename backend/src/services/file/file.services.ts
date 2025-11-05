import { Handler } from "express";
import { connection, mongo } from "mongoose";
import { PostFile as PostFile_ } from "src/utils/PostFile";
import { DeleteFileByID as DeleteFileByID_ } from "src/utils/DeleteFileByID";

export const GetFile: Handler = async (request, response) => {
    try {
        const { id } = request.params;

        const bucket = new mongo.GridFSBucket(connection.db, {
            bucketName: "uploads",
        });

        const downloadStream = bucket.openDownloadStream(
            new mongo.ObjectId(id)
        );

        downloadStream.on("data", (chunk) => response.write(chunk));
        downloadStream.on("error", () =>
            response.status(404).send("File isn't found.")
        );
        downloadStream.on("end", () => response.end());
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const PostFile: Handler = async (request, response) => {
    try {
        if (request.file == null) {
            return response
                .status(400)
                .json({ message: "No file was uploaded." });
        }

        const result = await PostFile_(request.file, connection.db);
        response.status(201).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const DeleteFileByID: Handler = async (request, response) => {
    try {
        const { id } = request.params;

        await DeleteFileByID_(id, connection.db)
            .then(() =>
                response.status(204).send({ message: "File has been deleted." })
            )
            .catch(
                (error) => (
                    console.log(error),
                    response.status(404).send({ message: "File isn't found." })
                )
            );
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};
