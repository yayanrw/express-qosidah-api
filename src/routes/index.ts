import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import keywordQosidahRoutes from "./keyword_qosidah.routes";
import qosidahRoutes from "./qosidah.routes";
import qosidahDetailRoutes from "./qosidah_detail.routes";
import { wrapResponse } from "../core/utils/wrapResponse";
import HttpStatusCode from "../core/enum/http-status-code";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

router.use("", authRoutes);
router.use("/users", [authMiddleware, adminMiddleware], userRoutes);
router.use("/keyword-qosidahs", authMiddleware, keywordQosidahRoutes);
router.use("/qosidahs", authMiddleware, qosidahRoutes);
router.use("/qosidah-details", authMiddleware, qosidahDetailRoutes);

// not found page
router.get("*", function (req, res) {
  wrapResponse({
    res,
    error: "NOT_FOUND",
    message: "Route not found",
    data: null,
    statusCode: HttpStatusCode.NOT_FOUND,
  });
});

export default router;
