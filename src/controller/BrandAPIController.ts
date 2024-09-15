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
    getAllBrands: async (page?: number, size?: number) => {
        try {
            const response = await axios.get(`${base_url}/brand`,{
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
    deleteBrand:async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/brand/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Error deleting brand');
                return null;
            }
        } catch (error) {
            console.error("There was an error deleting the brand!", error);
            return null;
        }
    },
};

export default brandAPIController;
