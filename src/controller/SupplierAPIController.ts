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
            return [];
        }
    },
    getSuppliersCount: async () => {
        try {
            const response = await axios.get(`${base_url}/supplier/count`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    deleteSupplier:async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/supplier/${id}`);
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
                    message: backendMessage || "An error occurred while deleting the supplier.",
                };
            }
            return null;
        }
    },
};

export default supplierAPIController;
