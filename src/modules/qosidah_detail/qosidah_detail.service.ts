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
    const qosidahDetail = await qosidahDetailRepository.getById(id);
    if (!qosidahDetail) {
      throw new NotFoundError("Qosidah Detail not found");
    }
    return qosidahDetail;
  };

  getByQosudahId = async (
    qosidahId: string
  ): Promise<QosidahDetail[] | null> => {
    const qosidahDetails = await qosidahDetailRepository.getByQosidahId(
      qosidahId
    );
    if (!qosidahDetails) {
      throw new NotFoundError("Qosidah Detail not found");
    }
    return qosidahDetails;
  };

  create = async (data: QosidahDetail): Promise<QosidahDetail> => {
    const { error, value } = qosidahDetailSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

    const qosidahDetail = await qosidahDetailRepository.create(value);
    return qosidahDetail;
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

    const qosidahDetail = await qosidahDetailRepository.update(id, value);
    return qosidahDetail;
  };

  delete = async (id: string): Promise<void> => {
    const isExist = await qosidahDetailRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Qosidah Detail not found");
    }
    await qosidahDetailRepository.delete(id);
  };
}
