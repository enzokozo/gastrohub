import { PrismaClient } from "@prisma/client";

// Initialize Prisma client to interact with the database
const prisma = new PrismaClient();

// Function to fetch all restaurants from the database
export const getAllRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      user: true,  // Including user data related to each restaurant
    },
  });

  // Mapping the output to merge user data directly at the restaurant level
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
    userRole: restaurant.user.userRole,  // Including the user's role
    cnpj: restaurant.cnpj,  // Including the restaurant's CNPJ
    name: restaurant.user.name,  // Including the user's name
    email: restaurant.user.email,  // Including the user's email
    score: restaurant.user.score,  // Including the user's score
  }));
};

// Function to fetch a restaurant by its unique ID
export const getRestaurantByID = async (id: number) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },  // Searching for a unique restaurant by ID
    include: { user: true },  // Including related user data
  });

  // If no restaurant is found, return null
  if (!restaurant) return null;

  // Return a structured object with restaurant and user information
  return {
    id: restaurant.id,
    userRole: restaurant.user.userRole,
    cnpj: restaurant.cnpj,
    name: restaurant.user.name,
    email: restaurant.user.email,
    score: restaurant.user.score,
  };
};

// Interface for creating a new restaurant (data input validation)
interface CreateRestaurantInput {
  name: string;
  email: string;
  password: string;
  score?: number;
  cnpj: string;
}

// Function to create a new restaurant and associated user
export const createRestaurant = async (data: CreateRestaurantInput) => {
  return await prisma.restaurant.create({
    data: {
      // Creating a new user and associating it with the restaurant
      user: {
        create: {
          name: data.name,
          email: data.email,
          password: data.password,
          userRole: "RESTAURANT",  // Assigning the role "RESTAURANT"
          score: data.score ?? 0,  // Default score is set to 0 if not provided
        },
      },
      cnpj: data.cnpj,  // Setting the CNPJ (restaurant's unique identifier)
    },
  });
};

// Function to update an existing restaurant's details
export const updateRestaurant = async (id: number, data: CreateRestaurantInput) => {
  return await prisma.restaurant.update({
    where: {
      id: id,  // Identifying the restaurant to update by its ID
    },
    data: {
      cnpj: data.cnpj,  // Updating the CNPJ of the restaurant
      user: {
        update: {
          name: data.name,  // Updating the user's name
          email: data.email,  // Updating the user's email
          password: data.password,  // Updating the user's password
          score: data.score ?? 0,  // Updating the score, defaulting to 0 if not provided
        },
      },
    },
  });
};

// Function to delete a restaurant by its ID
export const deleteRestaurant = async (id: number) => {
  return await prisma.restaurant.delete({
    where: {
      id: id,  // Identifying the restaurant to delete by its ID
    },
  });
};
