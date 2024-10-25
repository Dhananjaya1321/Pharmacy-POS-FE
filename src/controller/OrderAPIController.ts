import axios from 'axios';
import {base_url} from "../config/apiConfig";

const brandAPIController = {
    customerSearch: async (inputValue: string) => {
        try {
            const response = await axios.get(`${base_url}/customer/search?query=${inputValue}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    },
    itemSearch: async (inputValue: string) => {
        try {
            const response = await axios.get(`${base_url}/item/search?query=${inputValue}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    },
    getReferenceNumber: async () => {
        try {
            const response = await axios.get(`${base_url}/order/reference-number`);
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

export default brandAPIController;
