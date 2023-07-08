import { Router } from "express";
import QosidahController from "../app/controllers/qosidah.controller";

const router = Router();
const qosidahController = new QosidahController();

router.post("/", qosidahController.create);
router.get("/", qosidahController.getAll);
router.get("/:id", qosidahController.getById);
router.put("/:id", qosidahController.update);
router.put("/:id/published", qosidahController.updatePublished);
router.delete("/:id", qosidahController.delete);

export default router;
