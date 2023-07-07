import { QosidahDetail } from "@prisma/client";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import { qosidahDetailSchema } from "./qosidah_detail.schema";
import QosidahDetailRepository from "./qosidah_detail.repository";

const qosidahDetailRepository = new QosidahDetailRepository();

export default class QosidahDetailService {
  getAll = async (): Promise<QosidahDetail[]> => {
    return qosidahDetailRepository.getAll();
  };

  getById = async (id: string): Promise<QosidahDetail | null> => {
    const user = await qosidahDetailRepository.getById(id);
    if (!user) {
      throw new NotFoundError("Qosidah Detail not found");
    }
    return user;
  };

  create = async (data: QosidahDetail): Promise<QosidahDetail> => {
    const { error, value } = qosidahDetailSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await qosidahDetailRepository.create(value);
    return user;
  };

  update = async (
    id: string,
    updateData: QosidahDetail
  ): Promise<QosidahDetail | null> => {
    const isExist = await qosidahDetailRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Qosidah Detail not found");
    }

    const { error, value } = qosidahDetailSchema.validate(updateData);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await qosidahDetailRepository.update(id, value);
    return user;
  };

  delete = async (id: string): Promise<void> => {
    const isExist = await qosidahDetailRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Qosidah Detail not found");
    }
    await qosidahDetailRepository.delete(id);
  };
}
