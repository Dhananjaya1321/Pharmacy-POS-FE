import axios from 'axios';
import {base_url} from "../config/apiConfig";

const shopAPIController = {
    saveShop: async (brand: any) => {
        try {
            const response = await axios.post(
                `${base_url}/shop`,
                brand
            );
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },
    checkHasAccount: async () => {
        try {
            const response = await axios.get(`${base_url}/shop/check-has-account`);
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
