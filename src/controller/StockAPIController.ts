import axios from 'axios';
import {base_url} from "../config/apiConfig";

const stockAPIController = {
    saveStock: async (stock: any) => {
        try {
            const response = await axios.post(
                `${base_url}/stock`,
                stock
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
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
            console.error("There was an error fetching user roles!", error);
            return [];
        }
    },
};

export default stockAPIController;
