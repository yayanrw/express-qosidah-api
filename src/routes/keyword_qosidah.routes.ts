import { Router } from "express";
import KeywordQosidahController from "../app/controllers/keyword_qosidah.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const router = Router();
const keywordQosidahController = new KeywordQosidahController();

router.post(
  "/",
  [authMiddleware, adminMiddleware],
  keywordQosidahController.create
);
router.get(
  "/",
  [authMiddleware, cacheMiddleware],
  keywordQosidahController.getAll
);
router.get("/:id", [authMiddleware], keywordQosidahController.getById);
router.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  keywordQosidahController.update
);
router.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  keywordQosidahController.delete
);

export default router;
