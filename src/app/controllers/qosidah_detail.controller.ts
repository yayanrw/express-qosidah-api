import { Request, Response } from "express";
import { QosidahDetail } from "@prisma/client";
import { wrapResponse } from "../../core/utils/wrapResponse";
import HttpStatusCode from "../../core/enum/http-status-code";
import { wrapAsync } from "../../core/utils/wrapAsync";
import { qosidahDetailService } from "../common/services";

export default class QosidahDetailController {
  getAll = wrapAsync(async (req: Request, res: Response) => {
    const qosidahDetails = await qosidahDetailService.getAll();
    wrapResponse({ res, data: qosidahDetails });
  });

  getById = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const qosidahDetail = await qosidahDetailService.getById(id);
    wrapResponse({ res, data: qosidahDetail });
  });

  getByQosidahId = wrapAsync(async (req: Request, res: Response) => {
    const { qosidahId } = req.params;
    const qosidahDetails = await qosidahDetailService.getByQosidahId(qosidahId);
    wrapResponse({ res, data: qosidahDetails });
  });

  create = wrapAsync(async (req: Request, res: Response) => {
    const data: QosidahDetail = req.body;
    const qosidahDetail = await qosidahDetailService.create(data);
    wrapResponse({
      res,
      data: qosidahDetail,
      message: "Qosidah Detail created",
      statusCode: HttpStatusCode.CREATED,
    });
  });

  update = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: QosidahDetail = req.body;
    const qosidahDetail = await qosidahDetailService.update(id, updatedData);
    wrapResponse({
      res,
      data: qosidahDetail,
      message: "Qosidah Detail updated",
    });
  });

  delete = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await qosidahDetailService.delete(id);
    wrapResponse({ res, message: "Qosidah Detail deleted" });
  });
}
