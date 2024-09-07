import axios from 'axios';
import {base_url} from "../../config/apiConfig";

const api = {
    // Function to update shop data
    updateShopData: async (shopData: any) => {
        try {
            const response = await axios.post(
                `${base_url}/shop`,
                shopData
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },

    // Function to get all user roles
    getAllUserRoles: async () => {
        try {
            const response = await axios.get(`${base_url}/role`);
            if (response.status === 200) {
                return response.data; // Assuming the API returns an array of roles
            } else {
                return [];
            }
        } catch (error) {
            console.error("There was an error fetching user roles!", error);
            return [];
        }
    },

    // Function to update shop data
    saveUser: async (userData: any) => {
        try {
            const response = await axios.post(
                `${base_url}/user`,
                userData
            );
            return response.status === 200;
        } catch (error) {
            console.error("There was an error saving the data!", error);
            return false;
        }
    },
};

export default api;
