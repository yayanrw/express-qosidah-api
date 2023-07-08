import { Request, Response } from "express";
import { Qosidah } from "@prisma/client";
import { wrapResponse } from "../../core/utils/wrapResponse";
import HttpStatusCode from "../../core/enum/http-status-code";
import { wrapAsync } from "../../core/utils/wrapAsync";
import QosidahService from "./qosidah.service";

const qosidahService = new QosidahService();

export default class QosidahController {
  getAll = wrapAsync(async (req: Request, res: Response) => {
    const { published } = req.query;
    console.log(req.query);

    const qosidahs = await qosidahService.getAll(published?.toString());
    wrapResponse({ res, data: qosidahs });
  });

  getById = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const qosidah = await qosidahService.getById(id);
    wrapResponse({ res, data: qosidah });
  });

  create = wrapAsync(async (req: Request, res: Response) => {
    const data: Qosidah = req.body;
    const qosidah = await qosidahService.create(data);
    wrapResponse({
      res,
      data: qosidah,
      message: "Qosidah created",
      statusCode: HttpStatusCode.CREATED,
    });
  });

  update = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: Qosidah = req.body;
    const qosidah = await qosidahService.update(id, updatedData);
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
