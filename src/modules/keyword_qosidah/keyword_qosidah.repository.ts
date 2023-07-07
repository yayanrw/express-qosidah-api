import { KeywordQosidah } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

export default class KeywordQosidahRepository {
  getAll = async (): Promise<KeywordQosidah[]> => {
    const users = await prisma.keywordQosidah.findMany();
    return users;
  };

  getById = async (id: string): Promise<KeywordQosidah | null> => {
    const user = await prisma.keywordQosidah.findUnique({
      where: {
        id,
      },
    });
    return user;
  };

  getByKeyword = async (keyword: string): Promise<KeywordQosidah | null> => {
    const user = await prisma.keywordQosidah.findUnique({
      where: {
        keyword,
      },
    });
    return user;
  };

  create = async (data: KeywordQosidah): Promise<KeywordQosidah> => {
    const user = await prisma.keywordQosidah.create({
      data: data,
    });
    return user;
  };

  update = async (
    id: string,
    updatedData: KeywordQosidah
  ): Promise<KeywordQosidah | null> => {
    const user = await prisma.keywordQosidah.update({
      where: {
        id,
      },
      data: updatedData,
    });
    return user;
  };

  delete = async (id: string): Promise<void> => {
    await prisma.keywordQosidah.delete({
      where: {
        id,
      },
    });
  };
}
