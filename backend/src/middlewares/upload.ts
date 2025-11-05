import multer from "multer";

const storage = multer.memoryStorage();
export const Upload = multer({ storage });
