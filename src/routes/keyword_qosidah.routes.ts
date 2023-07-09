import { Router } from "express";
import KeywordQosidahController from "../app/controllers/keyword_qosidah.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();
const keywordQosidahController = new KeywordQosidahController();

router.post("/", adminMiddleware, keywordQosidahController.create);
router.get("/", keywordQosidahController.getAll);
router.get("/:id", keywordQosidahController.getById);
router.put("/:id", adminMiddleware, keywordQosidahController.update);
router.delete("/:id", adminMiddleware, keywordQosidahController.delete);

export default router;
