import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerConfig = (
  limit: number = 2 * 1024 * 1024,
  dest = 'admin',
): MulterOptions => {
  return {
    storage: diskStorage({
      destination: join('.', 'bucket', 'uploads', dest),
      filename: (req, file, cb) => {
        const randomName =
          new Date().getTime() +
          '-' +
          Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    limits: {
      fileSize: limit,
    },
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(
          new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
  };
};

export const multerPDFConfig = (dest = 'inquiry'): MulterOptions => {
  return {
    storage: diskStorage({
      destination: join('.', 'bucket', 'uploads', dest),
      filename: (req, file, cb) => {
        const randomName =
          new Date().getTime() +
          '-' +
          Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(pdf)$/)) {
        cb(null, true);
      } else {
        cb(
          new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
  };
};
