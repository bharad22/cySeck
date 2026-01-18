import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/request-otp", (req, res, next) =>
  authController.requestOtp(req, res, next),
);

router.post("/verify-otp", (req, res, next) =>
  authController.verifyOtp(req, res, next),
);

router.get("/profile", (req, res, next) =>
  authController.getUserProfile(req, res, next),
);

router.post("/logout", (req, res, next) =>
  authController.logout(req, res, next),
);

export default router;
