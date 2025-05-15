import { RequestHandler, Request, Response } from "express";
import * as kitchenRepository from "../repositories/kitchen.repository";

// GET ALL KITCHENS
export const getAllKitchens: RequestHandler = async (req, res) => {
    try {
        const kitchens = await kitchenRepository.getAllKitchens(); // Fetching all kitchens from the repository
        res.json(kitchens); // Returning the list of kitchens in the response
    } catch (error) {
        res.json(500).json({ error : "Error while fetching for kitchens" }); // Handling any errors that occur
    }
};