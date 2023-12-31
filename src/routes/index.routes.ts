import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import keywordQosidahRoutes from "./keyword_qosidah.routes";
import qosidahRoutes from "./qosidah.routes";
import qosidahDetailRoutes from "./qosidah_detail.routes";
import { wrapResponse } from "../core/utils/wrapResponse";
import HttpStatusCode from "../core/enum/http-status-code";
import { Request, Response } from "express";

const router = Router();

router.use("", authRoutes);
router.use("/users", userRoutes);
router.use("/keyword-qosidahs", keywordQosidahRoutes);
router.use("/qosidahs", qosidahRoutes);
router.use("/qosidah-details", qosidahDetailRoutes);

// not found page
router.get("*", function (req: Request, res: Response) {
  wrapResponse({
    res,
    error: "NOT_FOUND",
    message: "Route not found",
    data: null,
    statusCode: HttpStatusCode.NOT_FOUND,
  });
});

export default router;
