import mongoose from "mongoose";
import userSchema from "./schemas/userSchema.js";
import productSchema from "./schemas/productSchema.js";
import orderSchema from "./schemas/orderSchema.js";
import employeeSchema from "./schemas/employeeSchema.js";

export const usersCollection = mongoose.model("users", userSchema);

export const productsCollection = mongoose.model("products", productSchema);

export const ordersCollection = mongoose.model("orders", orderSchema);

export const employeesCollection = mongoose.model("employees", employeeSchema)