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
    getAllSuppliers: async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/supplier`,{
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

export default supplierAPIController;
