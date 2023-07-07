import { Router } from "express";
import userRoutes from "./user.routes";
import keywordQosidahRoutes from "./keyword_qosidah.routes";
import { wrapResponse } from "../core/utils/wrapResponse";
import HttpStatusCode from "../core/enum/http-status-code";

const router = Router();

router.use("/users", userRoutes);
router.use("/keyword-qosidah", keywordQosidahRoutes);

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
