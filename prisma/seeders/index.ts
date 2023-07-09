import { User } from "@prisma/client";
import UserRepository from "../../src/app/repositories/user.repository";
import prisma from "../../src/core/config/prisma.config";
import bcrypt from "bcrypt";

const seedUsers = async (): Promise<void> => {
  try {
    const userRepository = new UserRepository();
    const hashPassword = await bcrypt.hash("Bismillah.", 10);

    const user = {
      email: "yayanraw@gmail.com",
      name: "Yayan",
      role: "Admin",
      password: hashPassword,
    };
    await userRepository.create(user as User);
    await console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedUsers();
