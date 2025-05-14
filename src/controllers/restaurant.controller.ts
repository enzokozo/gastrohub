import { RequestHandler, Request, Response } from "express";  // Importing types for request and response handlers
import * as restaurantRepository from "../repositories/restaurant.repository";  // Importing repository functions for restaurant data handling

// GET ALL RESTAURANTS
export const getAllRestaurants: RequestHandler = async (req, res) => {
  try {
    const restaurants = await restaurantRepository.getAllRestaurants();  // Fetching all restaurants from the repository
    res.json(restaurants);  // Returning the list of restaurants in the response
  } catch (error) {
    res.status(500).json({ error: "Error while searching for restaurants" });  // Handling any errors that occur
  }
};

// GET RESTAURANT BY ID
export const getRestaurantByID: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);  // Extracting the restaurant ID from the URL params (only id) and converting it to an integer

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid restaurant ID" });  // Handling case where ID is not a valid number
    return;
  }

  try {
    const restaurant = await restaurantRepository.getRestaurantByID(id);  // Fetching the restaurant by ID from the repository

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant not found" });  // If the restaurant is not found, return 404
      return;
    }

    res.status(200).json(restaurant);  // Returning the restaurant details
  } catch (error) {
    res.status(500).json({ error: "Error while fetching restaurant" });  // Handling any errors that occur
  }
};

// CREATE RESTAURANT (POST)
export const createRestaurant: RequestHandler = async (req, res) => {
  const { name, email, password, score, cnpj } = req.body;  // Destructuring the request body to get restaurant details

  if (!name || !email || !password || !cnpj) {
    res.status(400).json({ error: "Missing mandatory data." });  // Checking if mandatory data is missing
    return;
  }

  try {
    const newRestaurant = await restaurantRepository.createRestaurant({
      name,
      email,
      password,
      score,
      cnpj,
    });  // Creating a new restaurant by calling the repository function

    res.status(201).json(newRestaurant);  // Returning the newly created restaurant with status 201
  } catch (error) {
    res.status(500).json({ error: "Error while creating restaurant" });  // Handling any errors that occur
  }
};

// UPDATE RESTAURANT (PUT)
export const updateRestaurant: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);  // Extracting the restaurant ID from the URL params (only id) and converting it to an integer
  const { name, email, password, score, cnpj } = req.body;  // Extracting data from the request body

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid restaurant ID" });  // Handling invalid ID
    return;
  }

  if (!name || !email || !password || !cnpj) {
    res.status(400).json({ error: "Missing mandatory data." });  // Checking if mandatory data is missing
    return;
  }

  try {
    const updated = await restaurantRepository.updateRestaurant(id, {
      name,
      email,
      password,
      score,
      cnpj,
    });  // Calling the repository function to update the restaurant

    res.status(200).json(updated);  // Returning the updated restaurant
  } catch (error) {
    res.status(500).json({ error: "Error while updating restaurant" });  // Handling any errors that occur
  }
};

// DELETE RESTAURANT
export const deleteRestaurant: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);  // Extracting the restaurant ID from the URL params and converting it to an integer

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid restaurant ID" });  // Handling invalid ID
    return;
  }

  try {
    await restaurantRepository.deleteRestaurant(id);  // Calling the repository function to delete the restaurant
    res.status(204).send();  // Returning a 204 status code indicating the deletion was successful with no content
  } catch (error) {
    res.status(500).json({ error: "Error while deleting restaurant" });  // Handling any errors that occur
  }
};
