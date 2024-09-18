import axios from 'axios';
import {base_url} from "../config/apiConfig";

const itemAPIController = {
    saveItem: async (stock: any) => {
        try {
            const response = await axios.post(
                `${base_url}/item`,
                stock
            );
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },
    getAllItems: async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/item`,{
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
    getItemsCountInStock: async () => {
        try {
            const response = await axios.get(`${base_url}/item/in-stock/count`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    getItemsCountOutOfStock: async () => {
        try {
            const response = await axios.get(`${base_url}/item/out-stock/count`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    deleteItem:async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/item/${id}`);
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
                    message: backendMessage || "An error occurred while deleting the item.",
                };
            }
            return null;
        }
    },
};

export default itemAPIController;
