import {Prisma, PrismaClient} from "@prisma/client";

// Initialize Prisma client to interact with the database
const prisma = new PrismaClient();

// Function to fetch all kitchens from the database
export const getAllKitchens = async() => {
    const kitchen = await prisma.kitchen.findMany();
};