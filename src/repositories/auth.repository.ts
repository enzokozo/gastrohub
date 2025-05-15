import { PrismaClient } from "@prisma/client"; // Import PrismaClient from Prisma Client

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to fetch user by email
export const getUserByEmail = async (email: string) => {
  try {
    // Find a user in the database with the given email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching user by email:", error);
    throw new Error("Error fetching user by email");
  }
};