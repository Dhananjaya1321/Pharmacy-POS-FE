import axios from 'axios';
import {base_url} from "../config/apiConfig";

const userAPIController = {
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
            return [];
        }
    },
    saveUser: async (userData: any) => {
        try {
            const response = await axios.post(
                `${base_url}/user`,
                userData
            );
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return null;
        }
    },
    getAllUserById: async (id: number) => {
        try {
            const response = await axios.get(`${base_url}/user/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    getUserCount: async () => {
        try {
            const response = await axios.get(`${base_url}/user/count`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    checkLogin: async (emailOrUsername: string, password: string) => {
        try {
            // Sending a GET request with the params
            const response = await axios.get(`${base_url}/user/check-login`, {
                params: {
                    emailOrUsername: emailOrUsername,
                    password: password,
                },
            });

            // Check if the response status is 200 OK
            if (response.status === 200) {
                // Check if the response contains a valid 'OK' state
                if (response.data && response.data.state === "OK") {
                    return response.data;
                } else {
                    // Return the error message when the state is not "OK"
                    return { error: response.data.message };
                }
            } else {
                return { error: "Unexpected response status: " + response.status };
            }
        } catch (err) {
            // Type guard to safely access error response data
            if (axios.isAxiosError(err)) {
                // The request was made, but the server responded with a status code not in the range of 2xx
                return { error: err.response?.data.message || "Login failed. Please try again." };
            } else {
                // Any other type of error
                return { error: "An unexpected error occurred during login." };
            }
        }
    },
    deleteUser: async (id: number) => {
        try {
            const response = await axios.delete(`${base_url}/user/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendMessage = error.response?.data?.message;
                return {
                    state: "BAD_REQUEST",
                    message: backendMessage || "An error occurred while deleting the user.",
                };
            }
            return null;
        }
    },
    checkEmailAndSendOTP: async (emailOrUsername: string) => {
        try {
            // Sending a GET request with the params
            const response = await axios.get(`${base_url}/user/check-email-and-send-otp`, {
                params: {
                    emailOrUsername: emailOrUsername
                },
            });

            // Check if the response status is 200 OK
            if (response.status === 200) {
                // Check if the response contains a valid 'OK' state
                if (response.data && response.data.state === "OK") {
                    return response.data;
                } else {
                    // Return the error message when the state is not "OK"
                    return { error: response.data.message };
                }
            } else {
                return { error: "Unexpected response status: " + response.status };
            }
        } catch (err) {
            // Type guard to safely access error response data
            if (axios.isAxiosError(err)) {
                // The request was made, but the server responded with a status code not in the range of 2xx
                return { error: err.response?.data.message || "OTP send failed. Please try again." };
            } else {
                // Any other type of error
                return { error: "An unexpected error occurred during OTP send." };
            }
        }
    },
    updatePassword: async (newPassword:string, email:string) => {
        try {
            const response = await axios.post(
                `${base_url}/user/update-password`,
                null, // No body needed, since using query parameters
                { params: { email: email, newPassword: newPassword } }
            );
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },
};

export default userAPIController;
