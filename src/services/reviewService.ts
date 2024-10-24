import { Review } from "../models/review";



export const reviewCreation = async (reviewData: any): Promise<any> => {
    try {
        const review = await Review.create(reviewData);
        return review.dataValues;
    } catch (error) {
        console.error('Error during product creation:', error);
        throw new Error("Review creation failed. Please try again.");
    }
};

export const reviewUpdation = async (reviewData: any, whereQuery: any): Promise<any> => {
    try {
        const review = await Review.update(reviewData, { where: whereQuery });
        return review;
    } catch (error) {
        throw new Error("Review update failed. Please try again.");
    }
};

export const getReviewByQuery = async (query: Record<string, any>): Promise<Review | null> => {
    try {
        // Validate that a query is provided
        if (!query || Object.keys(query).length === 0) {
            throw new Error("Query object is empty. Please provide valid search criteria.");
        }

        // Find the product using dynamic query
        const review = await Review.findOne({ where: query });

        if (!review) {
            return null;
        }

        return review;
    } catch (error) {
        throw new Error('Failed to fetch review. Please try again.');
    }
};

export const deleteReviewById = async (id: string): Promise<boolean> => {
    try {
        const review = await Review.findByPk(id);

        if (!review) {
            return false;
        }

        // Delete the review-+
        await review.destroy({ force: true });
        return true;
    } catch (error) {
        console.error('Error deleting review by ID:', error);
        throw new Error('Failed to delete review. Please try again.');
    }
};
