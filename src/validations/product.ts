import { check } from 'express-validator';

export const productValidate = [
    check('productTitle').notEmpty().withMessage('Product title is required'),
    check('productDescription').notEmpty().withMessage('Product description is required'),
    check('productImages').isArray({ min: 1 }).withMessage('At least one product image is required'),
    check('brand').notEmpty().withMessage('Brand is required'),
    check('price').isNumeric().withMessage('Price must be a valid number'),
    check('discount').isNumeric().withMessage('Discount must be a valid number'),
    check('mrp').isNumeric().withMessage('MRP must be a valid number'),
    check('userId').notEmpty().withMessage('User ID is required'),
]