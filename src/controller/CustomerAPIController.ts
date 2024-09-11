import axios from 'axios';
import {base_url} from "../config/apiConfig";

const customerAPIController = {
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
    getAllCustomers: async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/customer`,{
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

export default customerAPIController;
