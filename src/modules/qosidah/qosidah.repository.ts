import { Qosidah, QosidahDetail } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

export default class QosidahRepository {
  getAll = async (published?: boolean): Promise<Qosidah[]> => {
    let query: {
      where?: {
        published: boolean;
      };
      include: {
        keyword: {
          select: {
            id: true;
            keyword: true;
          };
        };
      };
    } = {
      include: {
        keyword: {
          select: {
            id: true,
            keyword: true,
          },
        },
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
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        qosidahDetail: {
          select: {
            id: true,
            order: true,
            lyrics: true,
            lyricsLatin: true,
            lyricsTranslate: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        keyword: {
          select: {
            id: true,
            keyword: true,
          },
          orderBy: {
            keyword: "asc",
          },
        },
      },
    });
    return qosidah;
  };

  create = async ({
    qosidah,
    keywordIds,
    detailQosidah,
  }: {
    qosidah: Qosidah;
    keywordIds?: string[];
    detailQosidah?: QosidahDetail[];
  }): Promise<Qosidah> => {
    const createQosidah = await prisma.qosidah.create({
      data: {
        ...qosidah,
        keyword: {
          connect: keywordIds
            ? keywordIds.map((keywordId) => ({ id: keywordId }))
            : [],
        },
        qosidahDetail: {
          create: detailQosidah,
        },
      },
    });
    return createQosidah;
  };

  update = async (
    id: string,
    {
      qosidah,
      keywordIds,
    }: {
      qosidah: Qosidah;
      keywordIds?: string[];
    }
  ): Promise<Qosidah> => {
    const updateQosidah = await prisma.qosidah.update({
      where: { id },
      data: {
        ...qosidah,
        keyword: {
          set: keywordIds
            ? keywordIds.map((keywordId) => ({ id: keywordId }))
            : [],
        },
      },
    });

    return updateQosidah;
  };

  delete = async (id: string): Promise<void> => {
    await prisma.qosidah.delete({
      where: {
        id,
      },
    });
  };
}
