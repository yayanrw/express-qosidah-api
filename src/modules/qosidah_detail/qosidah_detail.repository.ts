import { QosidahDetail } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

export default class QosidahDetailRepository {
  getAll = async (): Promise<QosidahDetail[]> => {
    const qosidahDetails = await prisma.qosidahDetail.findMany();
    return qosidahDetails;
  };

  getById = async (id: string): Promise<QosidahDetail | null> => {
    const qosidahDetail = await prisma.qosidahDetail.findUnique({
      where: {
        id,
      },
    });
    return qosidahDetail;
  };

  getByQosidahId = async (
    qosidahId: string
  ): Promise<QosidahDetail[] | null> => {
    const qosidahDetail = await prisma.qosidahDetail.findMany({
      where: {
        qosidahId,
      },
    });
    return qosidahDetail;
  };

  create = async (data: QosidahDetail): Promise<QosidahDetail> => {
    const qosidahDetail = await prisma.qosidahDetail.create({
      data: data,
    });
    return qosidahDetail;
  };

  update = async (
    id: string,
    updatedData: QosidahDetail
  ): Promise<QosidahDetail | null> => {
    const qosidahDetail = await prisma.qosidahDetail.update({
      where: {
        id,
      },
      data: updatedData,
    });
    return qosidahDetail;
  };

  delete = async (id: string): Promise<void> => {
    await prisma.qosidahDetail.delete({
      where: {
        id,
      },
    });
  };
}
