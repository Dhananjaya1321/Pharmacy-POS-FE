import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import userAPIController from "../../controller/UserAPIController";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import {ChangeEvent, useState} from "react";

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
        role: { name: string };
        username: string;
        address: string;
    };
    onUpdateUser: (updatedUser: {
        id: number;
        name: string;
        contact: string;
        email: string;
        nic: string;
        role: { name: string };
        username: string;
        address: string;
    }) => void;
}

export default function UserModal({rowData, onUpdateUser}: UserModalProps) {
    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = React.useState({
        id: rowData?.id || 0,
        name: rowData?.name || '',
        contact: rowData?.contact || '',
        email: rowData?.email || '',
        nic: rowData?.nic || '',
        role: rowData?.role?.name || '',
        username: rowData?.username || '',
        address: rowData?.address || ''
    });
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

    const handleOpen = () => {
        setUserData({
            id: rowData.id,
            name: rowData.name,
            contact: rowData.contact,
            email: rowData.email,
            nic: rowData.nic,
            role: rowData.role.name,
            username: rowData.username,
            address: rowData.address
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const fetchUserRoles = async () => {
        const response = await userAPIController.getAllUserRoles();

        const roles = response.data.map((role: { id: number; name: string }) => ({
            id: role.id,
            name: role.name,
        }));

        return roles;
    };

    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const roleId = event.target.value;
        setSelectedRole(roleId);  // Save the role ID
        setUserData(prevData => ({
            ...prevData,
            role: roleId  // Save the role ID in userData, not the role name
        }));
    };


    const handleUserSave = async () => {
        const isSuccess = await userAPIController.saveUser(userData);
        if (isSuccess) {
            const updatedUser = await userAPIController.getAllUserById(userData.id);

            const transformedObject = {
                ...userData,
                role: {
                    name: updatedUser.data.role.name  // Use the role ID to get the role name
                }
            };
            onUpdateUser(transformedObject);
            alert("User updated successfully!");
        } else {
            alert("Failed to update user.");
        }
        handleClose();
    };


    return (
        <div>
            <button className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100" onClick={handleOpen}>
                <FontAwesomeIcon icon={faPen}/>
            </button>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <button
                        className="absolute top-[15px] right-[15px] text-red-500 hover:text-gray-700 p-2 w-[40px]
                        h-[40px] bg-white shadow-lg rounded-lg flex justify-center items-center"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg"/>
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
                            />
                            <TextField
                                name="contact"
                                placeholder={'076 715 1321'}
                                label={'Contact'}
                                important={"*"}
                                value={userData.contact}
                                onChange={handleUsersChange}
                            />
                            <TextFieldWithButton
                                name="role"
                                label={'Role'}
                                important={"*"}
                                value={userData.role}
                                onChange={handleRoleChange}
                                fetchOptions={fetchUserRoles}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name={'nic'}
                                placeholder={'20021010025'}
                                label={'NIC'}
                                important={"*"}
                                value={userData.nic}
                                onChange={handleUsersChange}
                            />
                            <TextField
                                name={'email'}
                                placeholder={'user@gmail.com'}
                                label={'Email'}
                                important={"*"}
                                value={userData.email}
                                onChange={handleUsersChange}
                            />
                            <HiddenTextField/>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name={'username'}
                                placeholder={'user123'}
                                label={'Username'}
                                important={"*"}
                                value={userData.username}
                                onChange={handleUsersChange}
                            />
                            <HiddenTextField/>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name={'address'}
                                placeholder={'No - 181, ABC Road, Galle'}
                                label={'Address'}
                                important={"*"}
                                value={userData.address}
                                onChange={handleUsersChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                            <Button name={'Update'} color={'bg-[#2FEB00]'} onClick={handleUserSave}/>
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
