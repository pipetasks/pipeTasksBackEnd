import { Router, NextFunction, Request, Response } from "express";
import { validateToken } from "../../Controller/token/validateToken";
import { getTaskController } from "../../Controller/task/getTask/getTaskController";
import { saveTaskRoute } from "./saveTask/saveTaskRoute";
import { updateTaskRoute } from "./updateTask/updateTaskRoute";
import { finishTaskController } from "../../Controller/task/finishTask/finishTaskController";
const router = Router();

router.use(validateToken);


router.get("/get/:limit", getTaskController);

router.use("/create", saveTaskRoute);

router.use("/update", updateTaskRoute);

router.use("/finish", finishTaskController);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((err: Error, _req: Request, res: Response, _next: NextFunction ) => {
  
  return res.status(500).json({ errors: err.message });
});

export default router;
