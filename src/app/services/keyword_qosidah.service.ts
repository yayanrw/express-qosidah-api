import { KeywordQosidah } from "@prisma/client";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import { keywordQosidahSchema } from "../validations/keyword_qosidah.schema";
import KeywordQosidahRepository from "../repositories/keyword_qosidah.repository";

const keywordQosidahRepository = new KeywordQosidahRepository();

export default class KeywordQosidahService {
  getAll = async (): Promise<KeywordQosidah[]> => {
    return keywordQosidahRepository.getAll();
  };

  getById = async (id: string): Promise<KeywordQosidah | null> => {
    const user = await keywordQosidahRepository.getById(id);
    if (!user) {
      throw new NotFoundError("Keyword Qosidah not found");
    }
    return user;
  };

  create = async (data: KeywordQosidah): Promise<KeywordQosidah> => {
    const { error, value } = keywordQosidahSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

    const isExist = await keywordQosidahRepository.getByKeyword(data.keyword);

    if (isExist) {
      throw new ValidationError("Keyword Qosidah already exists");
    }

    const user = await keywordQosidahRepository.create(value);
    return user;
  };

  update = async (
    id: string,
    updateData: KeywordQosidah
  ): Promise<KeywordQosidah | null> => {
    const { error, value } = keywordQosidahSchema.validate(updateData);

    if (error) {
      throw new ValidationError(error.message);
    }

    const isExist = await keywordQosidahRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Keyword Qosidah not found");
    }

    if (isExist.keyword != updateData.keyword) {
      const isExist = await keywordQosidahRepository.getByKeyword(
        updateData.keyword
      );

      if (isExist) {
        throw new ValidationError("Keyword Qosidah already exists");
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
