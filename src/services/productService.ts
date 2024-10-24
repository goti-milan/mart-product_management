import { Product } from "../models/product"




export const productCreation = async (productData: any): Promise<any> => {
    try {
        const product = await Product.create(productData);
        return product?.dataValues;

    } catch (error) {
        throw new Error("Product creation failed. Please try again.");
    }
};

export const productUpdation = async (productData: any, whereQuery: any): Promise<any> => {
    try {

        const updatedProduct = await Product.update(productData, { where: whereQuery });

        return updatedProduct;
    } catch (error) {
        console.error('Error during product update:', error);
        throw new Error("Product update failed. Please try again.");
    }
};

export const getProductByQuery = async (query: Record<string, any>): Promise<Product | null> => {
    try {
        // Validate that a query is provided
        if (!query || Object.keys(query).length === 0) {
            throw new Error("Query object is empty. Please provide valid search criteria.");
        }

        // Find the product using dynamic query
        const product = await Product.findOne({ where: query });

        if (!product) {
            return null;
        }

        return product;
    } catch (error) {
        console.error('Error fetching product by query:', error);
        throw new Error('Failed to fetch product. Please try again.');
    }
};


export const deleteProductById = async (id: string): Promise<boolean> => {
    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return false;
        }

        // Delete the product-+
        await product.destroy({ force: true });
        return true;
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw new Error('Failed to delete product. Please try again.');
    }
};
