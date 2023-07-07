import { Router } from "express";
import KeywordQosidahController from "../modules/keyword_qosidah/keyword_qosidah.controller";

const router = Router();
const keywordQosidahController = new KeywordQosidahController();

router.post("/", keywordQosidahController.create);
router.get("/", keywordQosidahController.getAll);
router.get("/:id", keywordQosidahController.getById);
router.put("/:id", keywordQosidahController.update);
router.delete("/:id", keywordQosidahController.delete);

export default router;
