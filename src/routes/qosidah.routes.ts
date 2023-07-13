import { Router } from "express";
import QosidahController from "../app/controllers/qosidah.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const router = Router();
const qosidahController = new QosidahController();

router.post("/", [authMiddleware, adminMiddleware], qosidahController.create);
router.get("/", [authMiddleware, cacheMiddleware], qosidahController.getAll);
router.get("/populate", [authMiddleware], qosidahController.populate);
router.get(
  "/:id",
  [authMiddleware, cacheMiddleware],
  qosidahController.getById
);
router.put("/:id", [authMiddleware, adminMiddleware], qosidahController.update);
router.put(
  "/:id/published",
  [authMiddleware, adminMiddleware],
  qosidahController.updatePublished
);
router.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  qosidahController.delete
);

export default router;
