import express, { Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import {
  currentUserMiddleware,
  requireAuthMiddleware,
  NotAuthorizedError,
} from "../../common/src";

const router = express.Router();

router.get(
  "/api/admin/users",
  currentUserMiddleware,
  requireAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.currentUser?.isAdmin) {
        throw new NotAuthorizedError("You are not authorized to access this route");
      }

      const users = await User.find({}).select("-password").sort({ createdAt: -1 });

      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

export { router as listUsersRouter };
