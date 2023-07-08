import { Router } from "express";
import userRoutes from "./user.routes";
import keywordQosidahRoutes from "./keyword_qosidah.routes";
import qosidahRoutes from "./qosidah.routes";
import qosidahDetailRoutes from "./qosidah_detail.routes";
import { wrapResponse } from "../core/utils/wrapResponse";
import HttpStatusCode from "../core/enum/http-status-code";

const router = Router();

router.use("/users", userRoutes);
router.use("/keyword-qosidahs", keywordQosidahRoutes);
router.use("/qosidahs", qosidahRoutes);
router.use("/qosidah-details", qosidahDetailRoutes);

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
