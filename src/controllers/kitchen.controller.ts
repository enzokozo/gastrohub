import { RequestHandler, Request, Response } from "express";
import * as kitchenRepository from "../repositories/kitchen.repository";

// GET ALL KITCHENS
export const getAllKitchens: RequestHandler = async (req, res) => {
    try {
        const kitchens = await kitchenRepository.getAllKitchens(); // Fetching all kitchens from the repository
        res.json(kitchens); // Returning the list of kitchens in the response
    } catch (error) {
        res.json(500).json({ error : "Error while fetching kitchens" }); // Handling any errors that occur
    }
};

// GET KITCHEN BY ID
export const getKitchenByID: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid kitchen ID"});
        return;
    }

    try {
        const kitchen = await kitchenRepository.getKitchenByID(id);

        if (!kitchen) {
            res.status(404).json({ error: "Kitchen not found" });
            return;
        }

        res.status(200).json(kitchen);
    } catch {
        res.status(500).json({ error: "Error while fetching kitchen" });
    }
};

// CREATE KITCHEN (POST)
export const createKitchen: RequestHandler = async (req, res) => {
  const { name, location, capacity, equipment, score, restaurantId } = req.body;

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

    res.status(201).json(newKitchen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating kitchen" });
  }
};

// UPDATE KITCHEN (PUT)
export const updateKitchen: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, location, capacity, equipment, score, restaurantId } = req.body;

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid kitchen ID"} );
        return;
    }

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

        res.status(200).json(updated);
    } catch {
        res.status(500).json({ error: "Error while updating kitchen" });
    }
};

// DELETE KITCHEN
export const deleteKitchen: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid kitchen ID" });
        return;
    }

    try {
        await kitchenRepository.deleteKitchen(id);
        res.status(204).send();
    } catch {
        res.status(500).json({ error: "Error while deleting kitchen" });
    }
};