import { Qosidah } from "@prisma/client";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import {
  createQosidahValidation,
  updatePublishedQosidahValidation,
  updateQosidahValidation,
} from "../validations/qosidah.validation";
import {
  Pagination,
  PaginationParams,
  Paging,
  toPaging,
} from "../../core/utils/pagination.helper";
import { paginationParamsValidation } from "../validations/pagination_params.validation";
import {
  keywordQosidahRepository,
  qosidahDetailRepository,
  qosidahRepository,
} from "../instance/repositories";
import QosidahDto from "../dtos/qosidah.dto";
import { validate } from "../../core/utils/base.validation";
import { Request } from "express";
import { storeCache } from "../../core/utils/redis.helper";

export default class QosidahService {
  getAll = async (req: Request, published?: string): Promise<Qosidah[]> => {
    const qosidahs = await qosidahRepository.getAll(published === "true");
    await storeCache(req.originalUrl, qosidahs);
    return qosidahs;
  };

  populate = async (pgParams: PaginationParams): Promise<Paging<Qosidah[]>> => {
    const value = validate(paginationParamsValidation, pgParams);

    const pg = new Pagination(value);

    const qosidahs = await qosidahRepository.populate(pg.getPaginationObject());
    const totalData = await qosidahRepository.totalData(pg.filter);
    const pgResult = pg.getPaginationResult(totalData);

    return toPaging(qosidahs, pgResult);
  };

  getById = async (req: Request, id: string): Promise<Qosidah | null> => {
    const qosidah = await qosidahRepository.getById(id);

    if (!qosidah) {
      throw new NotFoundError("Qosidah not found");
    }
    await storeCache(req.originalUrl, qosidah);
    return qosidah;
  };

  create = async (authorId: string, data: QosidahDto): Promise<Qosidah> => {
    const value = validate(createQosidahValidation, data);

    if (data.keyword) {
      await Promise.all(
        data.keyword.map(async (keyword) => {
          const isExist = await keywordQosidahRepository.getById(keyword);

          if (!isExist) {
            throw new ValidationError("Keyword is not exist");
          }
        })
      );
    }

    value.authorId = authorId;
    const qosidah = await qosidahRepository.create({
      qosidah: value,
      keywordIds: value.keyword,
      detailQosidah: value.qosidahDetail,
    });
    return qosidah;
  };

  update = async (
    id: string,
    updateData: QosidahDto
  ): Promise<Qosidah | null> => {
    const value = validate(updateQosidahValidation, updateData);

    if (updateData.keyword) {
      await Promise.all(
        updateData.keyword.map(async (keyword) => {
          const isExist = await keywordQosidahRepository.getById(keyword);

          if (!isExist) {
            throw new ValidationError("Keyword is not exist");
          }
        })
      );
    }

    const qosidah = await qosidahRepository.update(id, {
      qosidah: value,
      keywordIds: value.keyword,
    });

    return qosidah;
  };

  updatePublished = async (
    id: string,
    published: boolean
  ): Promise<Qosidah | null> => {
    const value = validate(updatePublishedQosidahValidation, published);

    const qosidah = await qosidahRepository.updatePublished(id, value);

    return qosidah;
  };

  delete = async (id: string): Promise<void> => {
    const isExist = await qosidahRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Qosidah not found");
    }

    await qosidahDetailRepository.deleteByQosidahId(id);
    await qosidahRepository.delete(id);
  };
}
