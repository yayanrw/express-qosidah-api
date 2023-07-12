import { Request, Response } from "express";
import { KeywordQosidah } from "@prisma/client";
import { wrapResponse } from "../../core/utils/wrapResponse";
import HttpStatusCode from "../../core/enum/http-status-code";
import { wrapAsync } from "../../core/utils/wrapAsync";
import { keywordQosidahService } from "../common/services";
export default class KeywordQosidahController {
  getAll = wrapAsync(async (req: Request, res: Response) => {
    const keywordQosidahs = await keywordQosidahService.getAll();
    wrapResponse({ res, data: keywordQosidahs });
  });

  getById = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const keywordQosidah = await keywordQosidahService.getById(id);
    wrapResponse({ res, data: keywordQosidah });
  });

  create = wrapAsync(async (req: Request, res: Response) => {
    const data: KeywordQosidah = req.body;
    const keywordQosidah = await keywordQosidahService.create(data);
    wrapResponse({
      res,
      data: keywordQosidah,
      message: "Keyword Qosidah created",
      statusCode: HttpStatusCode.CREATED,
    });
  });

  update = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: KeywordQosidah = req.body;
    const keywordQosidah = await keywordQosidahService.update(id, updatedData);
    wrapResponse({
      res,
      data: keywordQosidah,
      message: "Keyword Qosidah updated",
    });
  });

  delete = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await keywordQosidahService.delete(id);
    wrapResponse({ res, message: "Keyword Qosidah deleted" });
  });
}
