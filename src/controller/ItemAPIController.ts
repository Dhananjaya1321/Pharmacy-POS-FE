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
            console.error("There was an error saving the data!", error);
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
            console.error("There was an error fetching user roles!", error);
            return [];
        }
    },
};

export default itemAPIController;
