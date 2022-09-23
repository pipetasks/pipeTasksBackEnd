import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Router
import routerCadastry from "./Routes/cadastry/cadastry";
import routerAuth from "./Routes/auth/auth";
import routerLogin from "./Routes/login/login";
import taskRouter from "./Routes/task/index";
import { routerDeleteAccount } from "./Routes/deleteAccount/deleteAccountRoute";
import { routerSetNewPasswordPassword } from "./Routes/setNewPassword/setNewPassword";

// Connect DB
import connectDevDB from "../db/connect";
import connectTestDB from "./helper/test/connect";
import { routerResetPassword } from "./Routes/resetPassword/resetPasswordRoute";


if (process.env.NODE_ENV === "test" || process.env.ENVIROMENT === "production") {
  connectTestDB(process.env.DB_USER!, process.env.DB_PASS!);
} else {
  console.log("Dev DB");
  connectDevDB();
}

const app = express();

// Connect database

if (process.env.NODE_ENV !== "test") {
  app.listen(3000);
}

app.use(express.json());

// Routes

app.use("/", routerCadastry);

app.use("/", routerAuth);

app.use("/", routerLogin);

app.use("/", routerDeleteAccount);

app.use("/", routerResetPassword);

app.use("/", routerSetNewPasswordPassword);

app.use("/task", taskRouter);

export default app;