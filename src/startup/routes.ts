import { Express } from "express";
import index from "../routes/index";
import adminRoutes from "../routes/admin.routes";

export default function (app: Express) {
  app.use("/api", index);
  app.use("/api/admin", adminRoutes);
}
