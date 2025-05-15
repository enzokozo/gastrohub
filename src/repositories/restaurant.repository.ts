import { PrismaClient } from "@prisma/client";  // Importing PrismaClient to interact with the database

// Initialize Prisma client to interact with the database
const prisma = new PrismaClient();

// Function to fetch all restaurants from the database
export const getAllRestaurants = async () => {
  const restaurants = await prisma.user.findMany({
    where: {
      userRole: 'RESTAURANT',
    },
    select: {
      id: true,
      name: true,
      email: true,
      userRole: true,
      score: true,
      cnpj: true,
    },
  });

  return restaurants;
};

// Function to fetch a restaurant by its unique ID
export const getRestaurantByID = async (id: number) => {
  const restaurant = await prisma.user.findFirst({
    where: {
      id,
      userRole: 'RESTAURANT',
    },
  });

  // Return null if no restaurant is found
  if (!restaurant) return null;

  // Return restaurant data
  return {
    id: restaurant.id,
    userRole: restaurant.userRole,
    cnpj: restaurant.cnpj,
    name: restaurant.name,
    email: restaurant.email,
    score: restaurant.score,
  };
};

// Interface for creating a new restaurant user
interface CreateRestaurantInput {
  name: string;
  email: string;
  password: string;
  score?: number;
  cnpj: string;
  userRole: 'RESTAURANT';
}

// Function to create a new restaurant user
export const createRestaurant = async (data: CreateRestaurantInput) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      userRole: 'RESTAURANT',
      score: data.score ?? 0,
      cnpj: data.cnpj,
    },
  });
};

// Function to update an existing restaurant's details
export const updateRestaurant = async (id: number, data: CreateRestaurantInput) => {
  return await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      score: data.score ?? 0,
      cnpj: data.cnpj,
    },
  });
};

// Function to delete a restaurant by its ID
export const deleteRestaurant = async (id: number) => {
  // Check if user is a restaurant
  const restaurant = await prisma.user.findFirst({
    where: {
      id,
      userRole: 'RESTAURANT',
    },
  });

  if (!restaurant) {
    throw new Error('Restaurant not found or invalid ID.');
  }

  // Delete the restaurant user
  return await prisma.user.delete({
    where: { id },
  });
};