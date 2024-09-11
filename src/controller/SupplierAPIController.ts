import axios from 'axios';
import {base_url} from "../config/apiConfig";

const supplierAPIController = {
    saveSupplier: async (supplier: any) => {
        try {
            const response = await axios.post(
                `${base_url}/supplier`,
                supplier
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },
};

export default supplierAPIController;
