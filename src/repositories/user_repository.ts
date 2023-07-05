import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(userData: User): Promise<User> {
    return this.prisma.user.create({ data: userData });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, userData: User): Promise<User | null> {
    return this.prisma.user.update({ where: { id }, data: userData });
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.prisma.user.delete({ where: { id } });
  }
}

export default UserRepository;
