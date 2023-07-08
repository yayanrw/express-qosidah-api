import { Qosidah } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

export default class QosidahRepository {
  getAll = async (published?: boolean): Promise<Qosidah[]> => {
    let query: {
      where?: {
        published: boolean;
      };
      include: {
        keyword: boolean;
      };
    } = {
      include: {
        keyword: true,
      },
    };

    if (published !== undefined) {
      query = {
        ...query,
        where: {
          published: published,
        },
      };
    }

    const qosidahs = await prisma.qosidah.findMany(query);
    return qosidahs;
  };

  getById = async (id: string): Promise<Qosidah | null> => {
    const qosidah = await prisma.qosidah.findUnique({
      where: {
        id,
      },
      include: {
        qosidahDetail: true,
        keyword: true,
      },
    });
    return qosidah;
  };

  create = async (data: Qosidah): Promise<Qosidah> => {
    const qosidah = await prisma.qosidah.create({
      data: data,
    });
    return qosidah;
  };

  update = async (
    id: string,
    updatedData: Qosidah
  ): Promise<Qosidah | null> => {
    const qosidah = await prisma.qosidah.update({
      where: {
        id,
      },
      data: updatedData,
    });
    return qosidah;
  };

  delete = async (id: string): Promise<void> => {
    await prisma.qosidah.delete({
      where: {
        id,
      },
    });
  };
}
