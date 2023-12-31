import { Request, Response } from "express";
import { wrapResponse } from "../../core/utils/wrapResponse";
import HttpStatusCode from "../../core/enum/http-status-code";
import { wrapAsync } from "../../core/utils/wrapAsync";
import QosidahDto from "../dtos/qosidah.dto";
import { PaginationParams } from "../../core/utils/pagination.helper";
import { qosidahService } from "../instance/services";

export default class QosidahController {
  getAll = wrapAsync(async (req: Request, res: Response) => {
    const { published } = req.query;

    const qosidahs = await qosidahService.getAll(req, published?.toString());
    wrapResponse({ res, data: qosidahs });
  });

  populate = wrapAsync(async (req: Request, res: Response) => {
    const paginationParams: PaginationParams = req.query;

    const qosidahs = await qosidahService.populate(paginationParams);

    wrapResponse({ res, data: qosidahs });
  });

  getById = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const qosidah = await qosidahService.getById(req, id);
    wrapResponse({ res, data: qosidah });
  });

  create = wrapAsync(async (req: Request, res: Response) => {
    const data: QosidahDto = req.body;

    const qosidah = await qosidahService.create(req.user.id, data);

    wrapResponse({
      res,
      data: qosidah,
      message: "Qosidah created",
      statusCode: HttpStatusCode.CREATED,
    });
  });

  update = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: QosidahDto = req.body;
    const qosidah = await qosidahService.update(id, updatedData);
    wrapResponse({
      res,
      data: qosidah,
      message: "Qosidah updated",
    });
  });

  updatePublished = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { published } = req.body;
    const qosidah = await qosidahService.updatePublished(id, published);
    wrapResponse({
      res,
      data: qosidah,
      message: "Qosidah updated",
    });
  });

  delete = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await qosidahService.delete(id);
    wrapResponse({ res, message: "Qosidah deleted" });
  });
}
