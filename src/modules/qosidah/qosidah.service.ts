import { Qosidah } from "@prisma/client";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import { createQosidahSchema } from "./qosidah.schema";
import QosidahRepository from "./qosidah.repository";
import { QosidahDto } from "./qosidah.dto";
import KeywordQosidahRepository from "../keyword_qosidah/keyword_qosidah.repository";

const qosidahRepository = new QosidahRepository();
const keywordQosidahRepository = new KeywordQosidahRepository();

export default class QosidahService {
  getAll = async (published?: string): Promise<Qosidah[]> => {
    return qosidahRepository.getAll(published === "true");
  };

  getById = async (id: string): Promise<Qosidah | null> => {
    const qosidah = await qosidahRepository.getById(id);
    if (!qosidah) {
      throw new NotFoundError("Qosidah not found");
    }
    return qosidah;
  };

  create = async (data: QosidahDto): Promise<Qosidah> => {
    const { error, value } = createQosidahSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

    if (data.keyword) {
      await Promise.all(
        data.keyword.map(async (keyword) => {
          const isExist = await keywordQosidahRepository.getById(keyword);

          if (!isExist) {
            throw new ValidationError("Keyword not found");
          }
        })
      );
    }

    const qosidah = await qosidahRepository.create({
      qosidah: value,
      keywordIds: value.keyword,
      detailQosidah: value.qosidahDetail,
    });
    return qosidah;
  };

  update = async (id: string, updateData: Qosidah): Promise<Qosidah | null> => {
    const isExist = await qosidahRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Qosidah not found");
    }

    const { error, value } = createQosidahSchema.validate(updateData);

    if (error) {
      throw new ValidationError(error.message);
    }

    const qosidah = await qosidahRepository.update(id, value);
    return qosidah;
  };

  delete = async (id: string): Promise<void> => {
    const isExist = await qosidahRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Qosidah not found");
    }
    await qosidahRepository.delete(id);
  };
}
