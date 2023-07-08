import { KeywordQosidah } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

export default class KeywordQosidahRepository {
  getAll = async (): Promise<KeywordQosidah[]> => {
    const keywordQosidahs = await prisma.keywordQosidah.findMany();
    return keywordQosidahs;
  };

  getById = async (id: string): Promise<KeywordQosidah | null> => {
    const keywordQosidah = await prisma.keywordQosidah.findUnique({
      where: {
        id,
      },
    });
    return keywordQosidah;
  };

  getByKeyword = async (keyword: string): Promise<KeywordQosidah | null> => {
    const keywordQosidah = await prisma.keywordQosidah.findUnique({
      where: {
        keyword,
      },
    });
    return keywordQosidah;
  };

  create = async (data: KeywordQosidah): Promise<KeywordQosidah> => {
    const keywordQosidah = await prisma.keywordQosidah.create({
      data: data,
    });
    return keywordQosidah;
  };

  update = async (
    id: string,
    updatedData: KeywordQosidah
  ): Promise<KeywordQosidah | null> => {
    const keywordQosidah = await prisma.keywordQosidah.update({
      where: {
        id,
      },
      data: updatedData,
    });
    return keywordQosidah;
  };

  delete = async (id: string): Promise<void> => {
    await prisma.keywordQosidah.delete({
      where: {
        id,
      },
    });
  };
}
