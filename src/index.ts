import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import compression from "compression";
import http from "http";

import logger from "./startup/logger";
import routes from "./startup/routes";
import cors from "./startup/cors";
import socket from "./startup/socket";
import _static from "./middlewares/static";

dotenv.config();

const app = express();
app.use([express.json(), helmet(), fileUpload(), compression()]);
app.use("/images", [_static()], express.static("public/uploads/images"));
app.set("view engine", "ejs");

cors(app);
routes(app);

const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

export default server;
export { io };
