import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  createUser = async (userData: User): Promise<User> => {
    return this.prisma.user.create({ data: userData });
  };

  getUsers = async (): Promise<User[]> => {
    return this.prisma.user.findMany();
  };

  getUserById = async (id: string): Promise<User | null> => {
    return this.prisma.user.findUnique({ where: { id } });
  };

  updateUser = async (id: string, userData: User): Promise<User | null> => {
    return this.prisma.user.update({ where: { id }, data: userData });
  };

  deleteUser = async (id: string): Promise<User | null> => {
    return this.prisma.user.delete({ where: { id } });
  };
}

export default UserRepository;
