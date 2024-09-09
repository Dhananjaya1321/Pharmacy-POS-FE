import axios from 'axios';
import {base_url} from "../config/apiConfig";

const unitAPIController = {
    saveUnit: async (unit: any) => {
        try {
            const response = await axios.post(
                `${base_url}/unit`,
                unit
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },
};

export default unitAPIController;
