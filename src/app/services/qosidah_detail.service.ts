import { QosidahDetail } from "@prisma/client";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../core/utils/exceptions";
import { qosidahDetailValidation } from "../validations/qosidah_detail.validation";
import {
  qosidahDetailRepository,
  qosidahRepository,
} from "../instance/repositories";
import { validate } from "../../core/utils/base.validation";

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

  getByQosidahId = async (
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
    const value = validate(qosidahDetailValidation, data);

    const isQosidahExist = await qosidahRepository.getById(data.qosidahId);

    if (!isQosidahExist) {
      throw new ValidationError("Qosidah not found");
    }

    const isQosidahOrderExist =
      await qosidahDetailRepository.getByQosidahIdAndOrder(
        data.order,
        data.qosidahId
      );

    if (isQosidahOrderExist) {
      throw new ConflictError("Qosidah Detail is already exist");
    }

    const qosidahDetail = await qosidahDetailRepository.create(value);
    return qosidahDetail;
  };

  update = async (
    id: string,
    updateData: QosidahDetail
  ): Promise<QosidahDetail | null> => {
    const value = validate(qosidahDetailValidation, updateData);

    const isExist = await qosidahDetailRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("Qosidah Detail not found");
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
