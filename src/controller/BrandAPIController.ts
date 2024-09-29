import axios from 'axios';
import {base_url} from "../config/apiConfig";

const brandAPIController = {
    saveBrand: async (brand: any) => {
        try {
            const response = await axios.post(
                `${base_url}/brand`,
                brand
            );
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    getAllBrands: async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/brand`, {
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
    getBrandCount: async () => {
        try {
            const response = await axios.get(`${base_url}/brand/count`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    deleteBrand: async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/brand/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendMessage = error.response?.data?.message;
                return {
                    state: "BAD_REQUEST",
                    message: backendMessage || "An error occurred while deleting the brand.",
                };
            }
            return null; // Return null if some other error occurs
        }
    },
};

export default brandAPIController;
