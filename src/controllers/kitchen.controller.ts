import { RequestHandler, Request, Response } from "express"; // Import types for request handlers
import * as kitchenRepository from "../repositories/kitchen.repository"; // Import kitchen repository

// GET ALL KITCHENS
export const getAllKitchens: RequestHandler = async (req, res) => {
    try {
        const kitchens = await kitchenRepository.getAllKitchens(); // Retrieve all kitchen records from the database
        res.json(kitchens); // Respond with the list of kitchens
    } catch (error) {
        res.json(500).json({ error : "Error while fetching kitchens" }); // Handle unexpected errors
    }
};

// GET KITCHEN BY ID
export const getKitchenByID: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id); // Extract and parse the kitchen ID from the URL

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid kitchen ID"}); // Validate ID format
        return;
    }

    try {
        const kitchen = await kitchenRepository.getKitchenByID(id); // Fetch the kitchen with the specified ID

        if (!kitchen) {
            res.status(404).json({ error: "Kitchen not found" }); // If kitchen doesn't exist, respond with 404
            return;
        }

        res.status(200).json(kitchen); // Respond with the found kitchen
    } catch {
        res.status(500).json({ error: "Error while fetching kitchen" }); // Handle unexpected errors
    }
};

// CREATE KITCHEN (POST)
export const createKitchen: RequestHandler = async (req, res) => {
  const { name, location, capacity, equipment, score, restaurantId } = req.body;

  // Validate required fields
  if (!name || !location || !capacity || !equipment) {
    res.status(400).json({ error: "Missing mandatory data." });
    return;
  }

  try {
    const newKitchen = await kitchenRepository.createKitchen({
      name,
      location,
      capacity,
      equipment,
      score,
      restaurantId,
    });

    res.status(201).json(newKitchen); // Return the newly created kitchen
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating kitchen" }); // Handle errors during creation
  }
};

// UPDATE KITCHEN (PUT)
export const updateKitchen: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);  // Extract the kitchen ID from the URL
    const { name, location, capacity, equipment, score, restaurantId } = req.body;

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid kitchen ID"} );
        return;
    }

    // Validate required fields
    if (!name || !location || !capacity || !equipment) {
        res.status(400).json({ error: "Missing mandatory data." });
        return;
    }

    try {
        const updated = await kitchenRepository.updateKitchen(id, {
            name,
            location,
            capacity,
            equipment,
            score,
            restaurantId,
        });

        res.status(200).json(updated); // Return the updated kitchen
    } catch {
        res.status(500).json({ error: "Error while updating kitchen" }); // Handle update errors
    }
};

// DELETE KITCHEN
export const deleteKitchen: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id); // Parse kitchen ID from URL

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid kitchen ID" });
        return;
    }

    try {
        await kitchenRepository.deleteKitchen(id); // Delete kitchen from the database
        res.status(204).send(); // Respond with 204 No Content
    } catch {
        res.status(500).json({ error: "Error while deleting kitchen" }); // Handle deletion errors
    }
};