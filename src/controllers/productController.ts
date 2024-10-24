import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { generateResponse } from "../utils/responseGenerator";
import asyncHandler from 'express-async-handler';
import { deleteProductById, getProductByQuery, productCreation, productUpdation } from "../services/productService";
import { validationResult } from "express-validator";


export const productRegistration = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        // Check validation errors from express-validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(generateResponse(false, 'Validation failed', errors.array()));
        }

        // Create the product in the database         
        const product = await productCreation(req.body);

        // Log the created product for auditing
        console.log(`Product created successfully: ${product.id}`, product);

        // Return success response with product details
        return res.status(201).json(generateResponse(true, 'Product created successfully', { product }));
    } catch (error) {
        // Handle and log the error
        console.error('Error during product registration:', error);
        return handleError(res, error);
    }
});

export const productUpdate = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { discount } = req.body;
        const { id } = req.params;


        // Ensure discount is within valid range
        if (discount && discount < 0 || discount > 100) {
            return res.status(400).json(generateResponse(false, 'Discount must be between 0 and 100'));
        }

        // Update the product in the database
        const product = await productUpdation(req.body, { id });

        if (!product[0]) {
            return res.status(404).json(generateResponse(false, 'Product not found or no changes made'));
        }

        // Log the successful update
        console.log(`Product updated successfully: ${id}`);

        // Respond with success and updated product details
        return res.status(200).json(generateResponse(true, 'Product updated successfully', { id }));
    } catch (error) {
        // Centralized error handling with detailed logging
        console.error('Error during product update:', error);
        return handleError(res, error);
    }
});

// Controller for fetching a single product by ID
export const getProduct = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Fetch product using service
        const product = await getProductByQuery({ id });

        if (!product) {
            return res.status(404).json(generateResponse(false, 'Product not found'));
        }

        return res.status(200).json(generateResponse(true, 'Product fetched successfully', { product }));
    } catch (error) {
        console.error('Error fetching product:', error);
        return handleError(res, error);
    }
});

// Controller for deleting a product by ID
export const deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Delete product using service
        const deleted = await deleteProductById(id);

        if (!deleted) {
            return res.status(404).json(generateResponse(false, 'Product not found or already deleted'));
        }

        return res.status(200).json(generateResponse(true, 'Product deleted successfully'));
    } catch (error) {
        console.error('Error deleting product:', error);
        return handleError(res, error);
    }
});