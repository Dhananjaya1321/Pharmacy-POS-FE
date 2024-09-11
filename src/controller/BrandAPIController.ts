import axios from 'axios';
import {base_url} from "../config/apiConfig";

const brandAPIController = {
    saveUnit: async (brand: any) => {
        try {
            const response = await axios.post(
                `${base_url}/brand`,
                brand
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },
    getAllBrands: async () => {
        try {
            const response = await axios.get(`${base_url}/brand`);
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

export default brandAPIController;
