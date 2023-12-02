import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import compression from "compression";

dotenv.config();

const app = express();
app.use([express.json(), helmet(), fileUpload(), compression()]);
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
