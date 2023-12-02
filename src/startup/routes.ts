import { Express } from "express";
import index from "../routes/index";
import adminRoutes from "../routes/admin.routes";
import authRoutes from "../routes/auth.routes";

export default function (app: Express) {
  app.use("/api", index);
  app.use("/api/admin", adminRoutes);
  app.use("/api/auth", authRoutes);
}
