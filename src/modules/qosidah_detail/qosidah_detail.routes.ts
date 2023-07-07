import { Router } from "express";
import QosidahDetailController from "./qosidah_detail.controller";

const router = Router();
const qosidahDetailController = new QosidahDetailController();

router.post("/", qosidahDetailController.create);
router.get("/", qosidahDetailController.getAll);
router.get("/:id", qosidahDetailController.getById);
router.put("/:id", qosidahDetailController.update);
router.delete("/:id", qosidahDetailController.delete);

export default router;
