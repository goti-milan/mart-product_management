import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { generateResponse } from "../utils/responseGenerator";
import asyncHandler from 'express-async-handler';
import { deleteReviewById, getReviewByQuery, reviewCreation, reviewUpdation } from "../services/reviewService";


export const createReview = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const newReviewData = { ...req.body, orderId: id };

        // Create the product in the database         
        const review = await reviewCreation(newReviewData);

        // Return success response with product details
        return res.status(201).json(generateResponse(true, 'Review added successfully', { review }));
    } catch (error) {
        // Handle and log the error
        console.error('Error during product registration:', error);
        return handleError(res, error);
    }
});

export const updateReview = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Update the product in the database
        const review = await reviewUpdation(req.body, { id });

        if (!review[0]) { // Sequelize returns an array where the first element is the number of affected rows
            return res.status(404).json(generateResponse(false, 'Review not found or no changes made'));
        }

        // Respond with success and updated product details
        return res.status(200).json(generateResponse(true, 'Review updated successfully', { id }));
    } catch (error) {
        // Centralized error handling with detailed logging
        console.error('Error during product update:', error);
        return handleError(res, error);
    }
});

// Controller for fetching a single product by ID
export const getReview = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Fetch product using service
        const review = await getReviewByQuery({ id });

        if (!review) {
            return res.status(404).json(generateResponse(false, 'Review not found'));
        }

        return res.status(200).json(generateResponse(true, 'Review fetched successfully', { review }));
    } catch (error) {
        console.error('Error fetching review:', error);
        return handleError(res, error);
    }
});

// Controller for deleting a product by ID
export const deleteReview = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Delete product using service
        const deleted = await deleteReviewById(id);

        if (!deleted) {
            return res.status(404).json(generateResponse(false, 'Review not found or already deleted'));
        }

        return res.status(200).json(generateResponse(true, 'Review deleted successfully'));
    } catch (error) {
        console.error('Error deleting review:', error);
        return handleError(res, error);
    }
});