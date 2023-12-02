import { UploadedFile } from "express-fileupload";
import logger from "../startup/logger";

export default {
  upload: (file: UploadedFile, folder: string) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "")}`;
    const filePath = `${__dirname}/../../public/uploads/${folder}/${fileName}`;

    file.mv(filePath, (err) => {
      if (err) {
        logger.error(err);
        return null;
      }
    });
    return fileName;
  },
};
