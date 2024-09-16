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
    deleteCustomer:async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/customer/${id}`);
            if (response.status === 200) {
                return response.data;
            } else  {
                return null;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendMessage = error.response?.data?.message;
                return {
                    state: "BAD_REQUEST",
                    message: backendMessage || "An error occurred while deleting the brand.",
                };
            }
            console.error("Error deleting brand:", error);
            return null;
        }
    },
};

export default customerAPIController;
