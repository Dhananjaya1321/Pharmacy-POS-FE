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
            return false;
        }
    },
    getAllUnits: async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/unit`,{
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
    deleteUnit:async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/unit/${id}`);
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
                    message: backendMessage || "An error occurred while deleting the unit.",
                };
            }
            return null;
        }
    },
};

export default unitAPIController;
