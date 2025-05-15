import {Prisma, PrismaClient} from "@prisma/client";

// Initialize Prisma client to interact with the database
const prisma = new PrismaClient();

// Function to fetch all kitchens from the database
export const getAllKitchens = async() => {
    const kitchens = await prisma.kitchen.findMany();

    return kitchens;
};

// Function to fetch a kitchen by its unique ID
export const getKitchenByID = async(id: number) => {
    const kitchen = await prisma.kitchen.findFirst({
        where: {
            id,
        },
    });

    // Return null if no kitchen is found
    if (!kitchen) return null;

    // Return kitchen data
    return {
        id: kitchen.id,
        name: kitchen.name,
        location: kitchen.location,
        capacity: kitchen.capacity,
        equipment: kitchen.equipment,
        score: kitchen.score,
        restaurantId: kitchen.restaurantId,
    };
};

// Interface for creating a new kitchen
interface CreateKitchenInput {
  name: string;
  location: string;
  capacity: number;
  equipment: string[];
  score?: number;
  restaurantId?: number | null;
}

// Function to create a new kitchen
export const createKitchen = async (data: CreateKitchenInput) => {
  return await prisma.kitchen.create({
    data: {
      name: data.name,
      location: data.location,
      capacity: data.capacity,
      equipment: data.equipment,
      ...(data.score !== undefined ? { score: data.score } : {}), 
      ...(data.restaurantId ? { restaurant: { connect: { id: data.restaurantId } } } : {}),
    },
  });
};

// Function to update a kitchen by its unique ID
export const updateKitchen = async (id: number, data: CreateKitchenInput) => {
  return await prisma.kitchen.update({
    where: { id },
    data: {
      name: data.name,
      location: data.location,
      capacity: data.capacity,
      equipment: data.equipment,
      ...(data.score !== undefined ? { score: data.score } : {}),
      ...(data.restaurantId ? { restaurant: { connect: { id: data.restaurantId } } } : {}),
    },
  });
};

// Function to delete a kitchen by its unique ID
export const deleteKitchen = async (id: number) => {
  const kitchen = await prisma.kitchen.findFirst({
    where: { id },
  });

  if (!kitchen) {
    throw new Error("Kitchen not found or invalid ID");   
  }

  // Delete the kitchen
  return await prisma.kitchen.delete({
    where: { id },
  });
};
