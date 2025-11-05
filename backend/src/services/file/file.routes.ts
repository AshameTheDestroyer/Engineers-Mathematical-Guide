import { Router } from "express";
import { Upload } from "src/middlewares/upload";
import { DeleteFileByID, GetFile, PostFile } from "./file.services";

export const FILES_ROUTE = "/files";
export const FileRouter = Router();

FileRouter.get(`${FILES_ROUTE}/:id`, GetFile);
FileRouter.post(FILES_ROUTE, Upload.single("file"), PostFile);
FileRouter.delete(`${FILES_ROUTE}/:id`, DeleteFileByID);
