import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "../../component/TextField/TextFild";
import { TextArea } from "../../component/TextArea/TextArea";
import { Button } from "../../component/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import userAPIController from "../../controller/UserAPIController";
import { HiddenTextField } from "../../component/HiddenTextField/HiddenTextField";
import { ChangeEvent, useEffect, useState } from "react";
import { emailRegex, nameRegex, sriLankaMobileNumberRegex, sriLankaNicRegex } from "../../validasion/validations";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #006CAF',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};

interface UserModalProps {
    rowData: {
        id: number;
        name: string;
        contact: string;
        email: string;
        nic: string;
        role: { id: number, name: string };
        username: string;
        address: string;
    };
    onUpdateUser: (updatedUser: {
        id: number;
        name: string;
        contact: string;
        email: string;
        nic: string;
        role: { id: number, name: string };
        username: string;
        address: string;
    }) => void;
}

interface Role {
    id: number;
    name: string;
}

interface UserData {
    id: number;
    name: string;
    contact: string;
    email: string;
    nic: string;
    role: string; // Keep as string to store role ID as string
    username: string;
    address: string;
}

export default function UserModal({ rowData, onUpdateUser }: UserModalProps) {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        id: rowData?.id || 0,
        name: rowData?.name || '',
        contact: rowData?.contact || '',
        email: rowData?.email || '',
        nic: rowData?.nic || '',
        role: rowData?.role?.id.toString() || "-1", // Initialize role as string
        username: rowData?.username || '',
        address: rowData?.address || ''
    });
    const [userErrors, setUserErrors] = useState<Record<string, string>>({
        name: "",
        contact: "",
        role: "",
        nic: "",
        email: "",
        password: "",
        username: "",
        address: "",
    });
    const [userRoles, setUserRoles] = useState<Role[]>([]);

    const handleOpen = () => {
        setUserData({
            id: rowData.id,
            name: rowData.name,
            contact: rowData.contact,
            email: rowData.email,
            nic: rowData.nic,
            role: rowData.role.id.toString(), // Set role as string
            username: rowData.username,
            address: rowData.address
        });
        setUserErrors({
            name: "",
            contact: "",
            role: "",
            nic: "",
            email: "",
            username: "",
            address: "",
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Initialize error message
        let error = "";

        // Validation logic based on field name
        switch (name) {
            case "name":
                if (value.trim() === "") {
                    error = "Name is required.";
                } else if (!nameRegex.test(value.trim())) {
                    error = "Invalid name. Only letters and spaces are allowed.";
                }
                break;
            case "contact":
                if (value.trim() === "") {
                    error = "Contact number is required.";
                } else if (!sriLankaMobileNumberRegex.test(value.trim())) {
                    error = "Invalid Sri Lankan phone number.";
                }
                break;
            case "nic":
                if (value.trim() === "") {
                    error = "NIC is required.";
                } else if (!sriLankaNicRegex.test(value.trim())) {
                    error = "Invalid NIC number.";
                }
                break;
            case "email":
                if (value.trim() === "") {
                    error = "Email is required.";
                } else if (!emailRegex.test(value.trim())) {
                    error = "Invalid email address.";
                }
                break;
            case "username":
                if (value.trim() === "") {
                    error = "Username is required.";
                }
                break;
            case "address":
                if (value.trim() === "") {
                    error = "Address is required.";
                }
                break;
            default:
                break;
        }

        // Update the userErrors state
        setUserErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };


    const fetchUserRoles = async () => {
        try {
            const response = await userAPIController.getAllUserRoles();

            const roles = response.data.map((role: { id: number; name: string }) => ({
                id: role.id,
                name: role.name,
            }));

            setUserRoles(roles);
        } catch (error) {
            console.error("Failed to fetch user roles:", error);
            // Optionally set an error state here
        }
    };

    useEffect(() => {
        fetchUserRoles();
    }, []);

    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const roleId = event.target.value;
        setUserData(prevData => ({
            ...prevData,
            role: roleId // Keep role as string
        }));

        // Validate Role
        let error = "";
        if (roleId === "-1" || roleId.trim() === "") {
            error = "Role is required.";
        }

        setUserErrors((prevErrors) => ({
            ...prevErrors,
            role: error,
        }));
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (userData.name.trim() === "") {
            errors.name = "Name is required.";
        } else if (!nameRegex.test(userData.name.trim())) {
            errors.name = "Invalid name. Only letters and spaces are allowed.";
        }

        if (userData.contact.trim() === "") {
            errors.contact = "Contact number is required.";
        } else if (!sriLankaMobileNumberRegex.test(userData.contact.trim())) {
            errors.contact = "Invalid Sri Lankan phone number.";
        }

        if (userData.nic.trim() === "") {
            errors.nic = "NIC is required.";
        } else if (!sriLankaNicRegex.test(userData.nic.trim())) {
            errors.nic = "Invalid NIC number.";
        }

        if (userData.email.trim() === "") {
            errors.email = "Email is required.";
        } else if (!emailRegex.test(userData.email.trim())) {
            errors.email = "Invalid email address.";
        }

        if (userData.username.trim() === "") {
            errors.username = "Username is required.";
        }

        if (userData.address.trim() === "") {
            errors.address = "Address is required.";
        }

        if (userData.role === "-1" || userData.role.trim() === "") {
            errors.role = "Role is required.";
        }

        setUserErrors(errors);

        // Return true if no errors
        return Object.keys(errors).length === 0;
    };


    const handleUserSave = async () => {
        if (!validateForm()) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const payload = {
            ...userData,
            role: parseInt(userData.role, 10), // Convert role to number
        };

        try {
            const isSuccess = await userAPIController.saveUser(payload);
            if (isSuccess) {
                const updatedUser = await userAPIController.getAllUserById(userData.id);

                const transformedObject = {
                    ...userData,
                    role: {
                        id: updatedUser.data.role.id,
                        name: updatedUser.data.role.name,
                    },
                };

                onUpdateUser(transformedObject);
                alert("User updated successfully!");
                handleClose();
            } else {
                alert("Failed to update user.");
            }
        } catch (error) {
            console.error("Error saving user:", error);
            alert("An error occurred while updating the user.");
        }
    };


    return (
        <div>
            <button
                className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100"
                onClick={handleOpen}
            >
                <FontAwesomeIcon icon={faPen} />
            </button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <button
                        className="absolute top-[15px] right-[15px] text-red-500 hover:text-gray-700 p-2 w-[40px]
                        h-[40px] bg-white shadow-lg rounded-lg flex justify-center items-center"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        User Update
                    </Typography>
                    <section
                        className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="name"
                                placeholder={'Isuru Dhananjaya'}
                                label={'User\'s Name'}
                                important={"*"}
                                value={userData.name}
                                onChange={handleUsersChange}
                                msg={userErrors.name}
                            />
                            <TextField
                                name="contact"
                                placeholder={'076 715 1321'}
                                label={'Contact'}
                                important={"*"}
                                value={userData.contact}
                                onChange={handleUsersChange}
                                msg={userErrors.contact}
                            />
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start'>Role</label>
                                    <small className={`text-red-600 text-[16px]`}>*</small>
                                </div>
                                <div className="custom-select-wrapper">
                                    <select
                                        value={userData.role}
                                        name={"role"}
                                        onChange={handleRoleChange}
                                        className='text-input'
                                    >
                                        <option value="-1">Select an item</option>
                                        {userRoles.map((option, index) => (
                                            <option key={index} value={option.id.toString()}>{option.name}</option>
                                        ))}
                                    </select>
                                    <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                                </div>
                                <div className={`h-[5px]`}>
                                    <small className={`text-start text-red-600 block`}>{userErrors.role}</small>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name={'nic'}
                                placeholder={'20021010025'}
                                label={'NIC'}
                                important={"*"}
                                value={userData.nic}
                                onChange={handleUsersChange}
                                msg={userErrors.nic}
                            />
                            <TextField
                                name={'email'}
                                placeholder={'user@gmail.com'}
                                label={'Email'}
                                important={"*"}
                                value={userData.email}
                                onChange={handleUsersChange}
                                msg={userErrors.email}
                            />
                            <HiddenTextField />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name={'username'}
                                placeholder={'user123'}
                                label={'Username'}
                                important={"*"}
                                value={userData.username}
                                onChange={handleUsersChange}
                                msg={userErrors.username}
                            />
                            <HiddenTextField />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name={'address'}
                                placeholder={'No - 181, ABC Road, Galle'}
                                label={'Address'}
                                important={"*"}
                                value={userData.address}
                                onChange={handleUsersChange}
                                msg={userErrors.address}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                            <Button name={'Update'} color={'bg-[#2FEB00]'} onClick={handleUserSave} />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
