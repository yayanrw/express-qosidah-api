import { Router } from "express";
import QosidahController from "../app/controllers/qosidah.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();
const qosidahController = new QosidahController();

router.post("/", adminMiddleware, qosidahController.create);
router.get("/", qosidahController.getAll);
router.get("/:id", qosidahController.getById);
router.put("/:id", adminMiddleware, qosidahController.update);
router.put(
  "/:id/published",
  adminMiddleware,
  qosidahController.updatePublished
);
router.delete("/:id", adminMiddleware, qosidahController.delete);

export default router;
