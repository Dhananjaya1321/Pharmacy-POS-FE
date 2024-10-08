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
            return false;
        }
    },
    getShopData: async () => {
        try {
            const response = await axios.get(`${base_url}/shop`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
};

export default shopAPIController;
