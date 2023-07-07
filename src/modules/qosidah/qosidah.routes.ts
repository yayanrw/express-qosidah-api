import { Router } from "express";
import QosidahController from "./qosidah.controller";

const router = Router();
const qosidahController = new QosidahController();

router.post("/", qosidahController.create);
router.get("/", qosidahController.getAll);
router.get("/:id", qosidahController.getById);
router.put("/:id", qosidahController.update);
router.delete("/:id", qosidahController.delete);

export default router;
