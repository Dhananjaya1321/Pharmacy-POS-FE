import axios from 'axios';
import {base_url} from "../config/apiConfig";

const shopAPIController = {
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
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${base_url}/user`);
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

export default shopAPIController;
