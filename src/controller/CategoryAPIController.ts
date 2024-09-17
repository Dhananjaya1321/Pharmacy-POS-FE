import axios from 'axios';
import {base_url} from "../config/apiConfig";

const categoryAPIController = {
    saveCategory: async (category: any) => {
        try {
            const response = await axios.post(
                `${base_url}/category`,
                category
            );
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },
    getAllCategories:  async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/category`,{
                params: {
                    page: page,
                    size: size,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    },
    getCategoryCount: async () => {
        try {
            const response = await axios.get(`${base_url}/category/count`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    deleteCategory:async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/category/${id}`);
            if (response.status === 200) {
                return response.data;
            } else  {
                return null;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendMessage = error.response?.data?.message;
                return {
                    state: "BAD_REQUEST",
                    message: backendMessage || "An error occurred while deleting the category.",
                };
            }
            return null;
        }
    },
};

export default categoryAPIController;
