import { Router } from "express";
import QosidahDetailController from "../app/controllers/qosidah_detail.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();
const qosidahDetailController = new QosidahDetailController();

router.post("/", adminMiddleware, qosidahDetailController.create);
router.get("/", qosidahDetailController.getAll);
router.get("/:id", qosidahDetailController.getById);
router.put("/:id", adminMiddleware, qosidahDetailController.update);
router.delete("/:id", adminMiddleware, qosidahDetailController.delete);

export default router;
