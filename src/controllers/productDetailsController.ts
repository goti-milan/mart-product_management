import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { generateResponse } from '../utils/responseGenerator';
import { deleteProductDetailsById, getProductDetailsByQuery, productDetailsCreation, productDetailsUpdation } from '../services/productDetailsService';
import { handleError } from '../utils/errorHandler';


export const productDetailsRegistration = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    // Check validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(generateResponse(false, 'Validation failed', errors.array()));
    }

    const newProductDetails = { ...req.body, productId: id };

    try {
        // Create the product in the database         
        const productDetails = await productDetailsCreation(newProductDetails);

        // Return success response with product details
        return res.status(201).json(generateResponse(true, 'Product details added successfully', { productDetails }));
    } catch (error) {
        return handleError(res, error);
    }
});

export const productDetailsUpdate = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {

        // Update the product in the database
        const productDetails = await productDetailsUpdation(req.body, { id });

        if (!productDetails) { // Sequelize returns an array where the first element is the number of affected rows
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

export const getProductDetails = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        // Fetch product using service
        const product = await getProductDetailsByQuery({ id });

        if (!product) {
            return res.status(404).json(generateResponse(false, 'Product not found'));
        }

        return res.status(200).json(generateResponse(true, 'Product fetched successfully', { product }));
    } catch (error) {
        console.error('Error fetching product:', error);
        return handleError(res, error);
    }
});

export const deleteProductDetails = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        // Delete product using service
        const deleted = await deleteProductDetailsById(id);

        if (!deleted) {
            return res.status(404).json(generateResponse(false, 'Product not found or already deleted'));
        }

        return res.status(200).json(generateResponse(true, 'Product deleted successfully'));
    } catch (error) {
        console.error('Error deleting product:', error);
        return handleError(res, error);
    }
});
