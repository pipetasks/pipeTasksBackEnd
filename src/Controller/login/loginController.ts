import type { NextFunction } from "express";
import { validationResult } from "express-validator";
import { loginModel } from "../../Models/user/login/loginModel";
import type { LoginRequestType, LoginResponseType } from "../../interface/login/loginInterface";
import { DecodeToken } from "../../helper/jsonwt/tokenValidate";

export const bodyValidation = (req: LoginRequestType, res: LoginResponseType, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

export const validateToken = (req: LoginRequestType & { id: string }, res: LoginResponseType, next: NextFunction) => {
  const tokenInHeader = req.headers.authorization!;

  const { id, errors, status } = new DecodeToken(tokenInHeader).decode();

  if (status === 200 && id) {
    req.id = id;
    return next();
  } else {
    return res.status(status).json({ errors: errors });
  }
};

export const loginController = async (req: LoginRequestType & { id: string }, res: LoginResponseType) => {

  try {

    const User = await new loginModel(req.id).findUser();

    if (User) {
      const objectResponse = {
        data: {
          id: User!._id, name: User!.name, surname: User!.surname, email: User!.email, created: User!.created
        }
      };
      return res.status(200).json(objectResponse);
    } else {
      throw new Error("Bad request");
    }
  } catch (err) {

    return res.status(500).json({ errors: "Internal asasserver errors" });
  }
};