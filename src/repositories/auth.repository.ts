import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to fetch user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Error fetching user by email");
  }
};