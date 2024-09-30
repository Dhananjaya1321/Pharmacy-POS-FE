import axios from 'axios';
import {base_url} from "../config/apiConfig";

const stockAPIController = {
    saveStock: async (stock: any) => {
        try {
            const response = await axios.post(
                `${base_url}/stock`,
                stock
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
    getAllStocks: async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/stock`,{
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
    deleteStock:async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/stock/${id}`);
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
                    message: backendMessage || "An error occurred while deleting the stock.",
                };
            }
            return null;
        }
    },
};

export default stockAPIController;
