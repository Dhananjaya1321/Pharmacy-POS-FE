import axios from 'axios';
import {base_url} from "../config/apiConfig";

const shopAPIController = {
    updateShopData: async (shopData: any) => {
        try {
            const response = await axios.post(
                `${base_url}/shop`,
                shopData
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },
    getShopData: async () => {
        try {
            const response = await axios.get(`${base_url}/shop`);
            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },
};

export default shopAPIController;
