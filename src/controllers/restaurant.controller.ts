import { RequestHandler } from "express";  // Import types for request handlers
import * as restaurantRepository from "../repositories/restaurant.repository";  // Import restaurant repository

// GET ALL RESTAURANTS
export const getAllRestaurants: RequestHandler = async (req, res) => {
  try {
    const restaurants = await restaurantRepository.getAllRestaurants();  // Fetch all restaurants
    res.json(restaurants);  // Return restaurants list
  } catch {
    res.status(500).json({ error: "Error while searching for restaurants" });  // Handle errors
  }
};

// GET RESTAURANT BY ID
export const getRestaurantByID: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);  // Parse restaurant ID from params

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid restaurant ID" });  // Validate ID
    return;
  }

  try {
    const restaurant = await restaurantRepository.getRestaurantByID(id);  // Fetch restaurant by ID

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant not found" });  // Handle not found
      return;
    }

    res.status(200).json(restaurant);  // Return restaurant data
  } catch {
    res.status(500).json({ error: "Error while fetching restaurant" });  // Handle errors
  }
};

// CREATE RESTAURANT (POST)
export const createRestaurant: RequestHandler = async (req, res) => {
  const { name, email, password, score, cnpj } = req.body;  // Extract data from request body

  if (!name || !email || !password || !cnpj) {
    res.status(400).json({ error: "Missing mandatory data." });  // Validate mandatory fields
    return;
  }

  try {
    const newRestaurant = await restaurantRepository.createRestaurant({
      name,
      email,
      password,
      score,
      cnpj,
      userRole: 'RESTAURANT',
    });  // Create new restaurant

    res.status(201).json(newRestaurant);  // Return created restaurant
  } catch {
    res.status(500).json({ error: "Error while creating restaurant" });  // Handle errors
  }
};

// UPDATE RESTAURANT (PUT)
export const updateRestaurant: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);  // Parse restaurant ID
  const { name, email, password, score, cnpj } = req.body;  // Extract update data

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid restaurant ID" });  // Validate ID
    return;
  }

  if (!name || !email || !password || !cnpj) {
    res.status(400).json({ error: "Missing mandatory data." });  // Validate mandatory fields
    return;
  }

  try {
    const updated = await restaurantRepository.updateRestaurant(id, {
      name,
      email,
      password,
      score,
      cnpj,
      userRole: 'RESTAURANT',
    });  // Update restaurant data

    res.status(200).json(updated);  // Return updated restaurant
  } catch {
    res.status(500).json({ error: "Error while updating restaurant" });  // Handle errors
  }
};

// DELETE RESTAURANT
export const deleteRestaurant: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);  // Parse restaurant ID

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid restaurant ID" });  // Validate ID
    return;
  }

  try {
    await restaurantRepository.deleteRestaurant(id);  // Delete restaurant by ID
    res.status(204).send();  // Return 204 No Content on success
  } catch {
    res.status(500).json({ error: "Error while deleting restaurant" });  // Handle errors
  }
};