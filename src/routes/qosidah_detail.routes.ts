import { Router } from "express";
import QosidahDetailController from "../app/controllers/qosidah_detail.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const qosidahDetailController = new QosidahDetailController();

router.post(
  "/",
  [authMiddleware, adminMiddleware],
  qosidahDetailController.create
);
router.get("/", [authMiddleware], qosidahDetailController.getAll);
router.get("/:id", [authMiddleware], qosidahDetailController.getById);
router.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  qosidahDetailController.update
);
router.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  qosidahDetailController.delete
);

export default router;
