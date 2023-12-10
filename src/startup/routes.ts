import { Express } from "express";
import index from "../routes/index";
import adminRoutes from "../routes/admin.routes";
import authRoutes from "../routes/auth.routes";
import categoryRoutes from "../routes/category.routes";
import sizeColorRoutes from "../routes/size&color.routes";
import productRoutes from "../routes/product.routes";
import cartRoutes from "../routes/cart.routes";
import userRoutes from "../routes/user.routes";
import orderRoutes from "../routes/order.routes";

export default function (app: Express) {
  app.use("/api", index);
  app.use("/api", sizeColorRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/orders", orderRoutes);
}
