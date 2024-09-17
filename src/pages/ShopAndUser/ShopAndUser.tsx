import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
// @ts-ignore
import React, {ChangeEvent, useEffect, useState} from 'react';
// @ts-ignore
import shopAPIController from "../../controller/ShopAPIController";
import userAPIController from "../../controller/UserAPIController";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {Footer} from "../Footer/Footer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Checkbox} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import itemAPIController from "../../controller/ItemAPIController";
import SupplierModal from "../../modals/SupplierModal/SupplierModal";
import UserModal from "../../modals/UserModal/UserModal";

interface User {
    id: number;
    name: string;
    contact: string;
    role: { name: string };
    nic: string;
    email: string;
    username: string;
    address: string;
}

export const ShopAndUser = () => {
    // State to manage form data
    const [shopData, setShopData] = useState({
        pharmacyId: '',
        pharmacyName: '',
        contact: '',
        website: '',
        address: '',
    });
    const [errors, setErrors] = useState({
        pharmacyId: '',
        pharmacyName: '',
        contact: '',
        website: '',
        address: '',
    });
    const [userData, setUserData] = useState({
        name: '',
        contact: '',
        role: '',
        nic: '',
        email: '',
        password: '',
        username: '',
        address: '',
    });
    const [users, setUsers] = useState<User[]>([]);

    // State for managing the selected role
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

    type ShopDataKey = keyof typeof shopData;

    // Handle input changes for shop form
    const handleShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as ShopDataKey;

        setShopData({
            ...shopData,
            [typedName]: value,
        });


        // Validation logic
        let error = '';
        if (value.trim() === '') {
            error = `${name} is required`;
        } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
            error = 'Invalid email format';
        } else if (name === 'contact' && !/^\d+$/.test(value)) {
            error = 'Contact number should only contain digits';
        }

        // Set error state
        setErrors({
            ...errors,
            [name]: error,
        });
    };

    // Function to handle role changes
    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const role = event.target.value;
        setSelectedRole(role);
        setUserData(prevData => ({
            ...prevData,
            role: role,  // Update userData with the selected role
        }));
    };

    const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        const isSuccess = await shopAPIController.updateShopData(shopData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    const handleUpdateUser = (updatedUser: {
        id: number;
        name: string;
        contact: string;
        role: { name: string };
        nic: string;
        email: string;
        username: string;
        address: string;
    }) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    const handleUserSave = async () => {
        const isSuccess = await userAPIController.saveUser(userData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    const fetchUserRoles = async () => {
        const response = await userAPIController.getAllUserRoles();

        const roles = response.data.map((role: { id: number; name: string }) => ({
            id: role.id,
            name: role.name,
        }));

        return roles;
    };

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const response = await shopAPIController.getShopData();  // API call to get shop data
                if (response) {
                    // Map response.name to pharmacyName
                    setShopData({
                        pharmacyId: response.data.pharmacyId,
                        pharmacyName: response.data.pharmacyName,
                        contact: response.data.contact,
                        website: response.data.website,
                        address: response.data.address,
                    });
                }
            } catch (error) {
                console.error("Error fetching shop data:", error);
            }
        };

        const fetchAllUsers = async () => {
            try {
                const response = await userAPIController.getAllUsers();
                if (response) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error("Error fetching shop data:", error);
            }
        };

        fetchShopData();
        fetchAllUsers();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        try {
            const response = await userAPIController.deleteUser(id);
            if (response.state === "OK") {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                alert("User deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                alert(response.message || "Failed to delete user.");
            } else {
                alert("Failed to delete user.");
            }
        } catch (e) {
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Shop</h3>
            </section>
            {/*url display section*/}
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="pharmacyName"
                        placeholder={'Pharmacy'}
                        label={'Pharmacy name'}
                        disabled={'true'}
                        value={shopData.pharmacyName}
                        onChange={handleShopChange}
                        msg={errors.pharmacyName}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={shopData.contact}
                        onChange={handleShopChange}
                        msg={errors.contact}
                    />
                    <TextField
                        name="website"
                        placeholder={'pharmacy.com'}
                        label={'Website'}
                        value={shopData.website}
                        onChange={handleShopChange}
                        msg={errors.website}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="address"
                        placeholder={'No - 181, ABC Road, Galle'}
                        label={'Address'}
                        important={"*"}
                        value={shopData.address}
                        onChange={handleShopChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Update'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleSubmit}
                    />
                </div>
            </section>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Users </h3>
            </section>
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Isuru Dhananjaya'}
                        label={'User\'s name'}
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
                        value={selectedRole}  // Add this line if you're managing the selected role value in state
                        onChange={handleRoleChange}  // Add this line for handling role changes
                        fetchOptions={fetchUserRoles}  // Fetch options dynamically
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
                        placeholder={'supplier@gmail.com'}
                        label={'Email'}
                        important={"*"}
                        value={userData.email}
                        onChange={handleUsersChange}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name={'password'}
                        placeholder={'20021010025'}
                        label={'Password'}
                        type={'password'}
                        important={"*"}
                        value={userData.password}
                        onChange={handleUsersChange}
                    />
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
                    <Button name={'Save'} color={'bg-[#2FEB00]'} onClick={handleUserSave}/>
                </div>
            </section>
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Isuru Dhananjaya'} label={'User\'s name'}/>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>NIC</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((row) => (
                                    <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">{row.name || '-'}</TableCell>
                                        <TableCell>{row.username || '-'}</TableCell>
                                        <TableCell>{row.nic || '-'}</TableCell>
                                        <TableCell>{row.email || '-'}</TableCell>
                                        <TableCell>{row.address || '-'}</TableCell>
                                        <TableCell>{row.contact || '-'}</TableCell>
                                        <TableCell>{row.role.name || '-'}</TableCell>
                                        <TableCell>
                                            <UserModal rowData={row} onUpdateUser={handleUpdateUser}/>
                                            <button
                                                className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"
                                                onClick={() => handleDelete(row.id)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <FooterSpace/>
            <Footer/>
        </section>
    );
};
