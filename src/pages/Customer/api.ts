import axios from 'axios';
import {base_url} from "../../config/apiConfig";

const api = {
    saveCustomer: async (customer: any) => {
        try {
            const response = await axios.post(
                `${base_url}/customer`,
                customer
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },
};

export default api;
