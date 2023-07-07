import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  createUser = async (user: User): Promise<User> => {
    return this.prisma.user.create({ data: user });
  };

  getUsers = async (): Promise<User[]> => {
    return this.prisma.user.findMany();
  };

  getUserById = async (id: string): Promise<User | null> => {
    return this.prisma.user.findUnique({ where: { id } });
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    return this.prisma.user.findUnique({ where: { email } });
  };

  updateUser = async (id: string, user: User): Promise<User | null> => {
    return this.prisma.user.update({ where: { id }, data: user });
  };

  deleteUser = async (id: string): Promise<User | null> => {
    return this.prisma.user.delete({ where: { id } });
  };
}

export default UserRepository;
