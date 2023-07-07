import { Qosidah } from "@prisma/client";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import { createQosidahSchema } from "./qosidah.schema";
import QosidahRepository from "./qosidah.repository";

const qosidahRepository = new QosidahRepository();

export default class QosidahService {
  getAll = async (): Promise<Qosidah[]> => {
    return qosidahRepository.getAll();
  };

  getById = async (id: string): Promise<Qosidah | null> => {
    const qosidah = await qosidahRepository.getById(id);
    if (!qosidah) {
      throw new NotFoundError("Qosidah not found");
    }
    return qosidah;
  };

  create = async (data: Qosidah): Promise<Qosidah> => {
    const { error, value } = createQosidahSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

    const qosidah = await qosidahRepository.create(value);
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
