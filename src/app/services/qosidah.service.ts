import { Qosidah } from "@prisma/client";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import {
  createQosidahSchema,
  updatePublishedQosidahSchema,
  updateQosidahSchema,
} from "../validations/qosidah.validation";
import QosidahRepository from "../repositories/qosidah.repository";
import QosidahDto from "../dtos/qosidah.dto";
import KeywordQosidahRepository from "../repositories/keyword_qosidah.repository";
import QosidahDetailRepository from "../repositories/qosidah_detail.repository";

const qosidahRepository = new QosidahRepository();
const keywordQosidahRepository = new KeywordQosidahRepository();
const qosidahDetailRepository = new QosidahDetailRepository();

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

  create = async (authorId: string, data: QosidahDto): Promise<Qosidah> => {
    const { error, value } = createQosidahSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

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
    const { error, value } = updateQosidahSchema.validate(updateData);

    if (error) {
      throw new ValidationError(error.message);
    }

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
    const { error, value } = updatePublishedQosidahSchema.validate(published);

    if (error) {
      throw new ValidationError(error.message);
    }

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
