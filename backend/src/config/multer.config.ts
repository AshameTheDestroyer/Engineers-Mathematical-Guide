import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req:any, file:any, callback:any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only JPG, JPEG, and PNG files are allowed!'), false);
    }
    return callback(null, true);
  },
  storage: diskStorage({
    destination: './uploads', // Upload directory
    filename: (req:Request, file:any, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};
