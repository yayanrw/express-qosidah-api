import { KeywordQosidah } from "@prisma/client";
import { ConflictError, NotFoundError } from "../../core/utils/exceptions";
import { keywordQosidahValidation } from "../validations/keyword_qosidah.validation";
import { keywordQosidahRepository } from "../instance/repositories";
import { validate } from "../../core/utils/base.validation";
import { Request } from "express";
import { storeCache } from "../../core/utils/redis.helper";

export default class KeywordQosidahService {
  getAll = async (req: Request): Promise<KeywordQosidah[]> => {
    const keywordQosidahs = keywordQosidahRepository.getAll();
    await storeCache(req.originalUrl, keywordQosidahs);
    return keywordQosidahs;
  };

  getById = async (id: string): Promise<KeywordQosidah | null> => {
    const user = await keywordQosidahRepository.getById(id);
    if (!user) {
      throw new NotFoundError("Keyword Qosidah not found");
    }
    return user;
  };

  create = async (data: KeywordQosidah): Promise<KeywordQosidah> => {
    const value = validate(keywordQosidahValidation, data);

    const isExist = await keywordQosidahRepository.getByKeyword(data.keyword);

    if (isExist) {
      throw new ConflictError("Keyword Qosidah already exists");
    }

    const user = await keywordQosidahRepository.create(value);
    return user;
  };

  update = async (
    id: string,
    updateData: KeywordQosidah
  ): Promise<KeywordQosidah | null> => {
    const value = validate(keywordQosidahValidation, updateData);

    const isExist = await keywordQosidahRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Keyword Qosidah not found");
    }

    if (isExist.keyword != updateData.keyword) {
      const isExist = await keywordQosidahRepository.getByKeyword(
        updateData.keyword
      );

      if (isExist) {
        throw new ConflictError("Keyword Qosidah already exists");
      }
    }

    const user = await keywordQosidahRepository.update(id, value);
    return user;
  };

  delete = async (id: string): Promise<void> => {
    const isExist = await keywordQosidahRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Keyword Qosidah not found");
    }
    await keywordQosidahRepository.delete(id);
  };
}
