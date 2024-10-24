import { ProductDetails } from "../models/productDetails";

export const productDetailsCreation = async (productDetailsData: any): Promise<any> => {
    try {
        console.log("Creating product details:", productDetailsData);
        const productDetails = await ProductDetails.create(productDetailsData);
        return productDetails.dataValues;
    } catch (error) {
        console.error('Error during product creation:', error);
        throw new Error("Product creation failed. Please try again.");
    }
};

export const productDetailsUpdation = async (productData: any, whereQuery: any): Promise<any> => {
    try {
        const updatedProduct = await ProductDetails.update(productData, { where: whereQuery });
        console.log('updatedProduct', updatedProduct);

        return updatedProduct[0] > 0; // Return true if any rows were updated
    } catch (error) {
        console.error('Error during product update:', error);
        throw new Error("Product update failed. Please try again.");
    }
};

export const getProductDetailsByQuery = async (query: Record<string, any>): Promise<ProductDetails | null> => {
    try {
        // Validate that a query is provided
        if (!query || Object.keys(query).length === 0) {
            throw new Error("Query object is empty. Please provide valid search criteria.");
        }

        // Find the product using dynamic query
        const product = await ProductDetails.findOne({ where: query });

        return product?.dataValues || null; // Explicitly return null if no product found
    } catch (error) {
        console.error('Error fetching product by query:', error);
        throw new Error('Failed to fetch product. Please try again.');
    }
};

export const deleteProductDetailsById = async (id: string): Promise<boolean> => {
    try {
        const product = await ProductDetails.findByPk(id);

        if (!product) {
            return false; // Return false if product not found
        }

        // Delete the product
        await product.destroy({ force: true });
        return true;
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw new Error('Failed to delete product. Please try again.');
    }
};
