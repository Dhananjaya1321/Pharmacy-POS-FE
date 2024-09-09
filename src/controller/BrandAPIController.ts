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
};

export default brandAPIController;
