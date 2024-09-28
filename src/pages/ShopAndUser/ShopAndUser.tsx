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
import {
    emailRegex,
    nameRegex,
    sriLankaMobileNumberRegex,
    sriLankaNicRegex,
    websiteRegex
} from "../../validasion/validations";

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

interface Role {
    id: number;
    name: string;
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
    const [userErrors, setUserErrors] = useState({
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
    const [userRoles, setUserRoles] = useState<Role[]>([]);

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

        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'pharmacyName':
                if (value.trim() === '') {
                    error = 'Pharmacy name is required';
                }
                break;
            case 'contact':
                if (value.trim() === '') {
                    error = 'Contact number is required';
                } else if (!sriLankaMobileNumberRegex.test(value)) {
                    error = 'Invalid number contact number';
                }
                break;
            case 'website':
                if (value && !websiteRegex.test(value)) {
                    error = 'Invalid website URL';
                }
                break;
            case 'address':
                if (value.trim() === '') {
                    error = 'Address is required';
                }
                break;
            default:
                break;
        }

        // Update the errors state
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

        // Validate role selection
        let error = '';
        if (role === '-1' || role.trim() === '') {
            error = 'Role is required';
        }

        setUserErrors(prevErrors => ({
            ...prevErrors,
            role: error,
        }));
    };

    const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim() === '') {
                    error = 'Name is required';
                } else if (!nameRegex.test(value)) {
                    error = 'Invalid name';
                }
                break;
            case 'contact':
                if (value.trim() === '') {
                    error = 'Contact number is required';
                } else if (!sriLankaMobileNumberRegex.test(value)) {
                    error = 'Invalid Sri Lankan phone number';
                }
                break;
            case 'role':
                if (value === '-1' || value.trim() === '') {
                    error = 'Role is required';
                }
                break;
            case 'nic':
                if (value.trim() === '') {
                    error = 'NIC is required';
                } else if (!sriLankaNicRegex.test(value)) {
                    error = 'Invalid NIC number';
                }
                break;
            case 'email':
                if (value.trim() === '') {
                    error = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'password':
                if (value.trim() === '') {
                    error = 'Password is required';
                }
                break;
            case 'username':
                if (value.trim() === '') {
                    error = 'Username is required';
                }
                break;
            default:
                break;
        }

        // Update the userErrors state
        setUserErrors({
            ...userErrors,
            [name]: error,
        });
    };

    // Handle form submission
    const handleSubmit = async () => {
        let isValid = true;
        let newErrors = {...errors};

        // Iterate through each field in shopData to validate
        for (const key in shopData) {
            const value = shopData[key as ShopDataKey].trim();

            switch (key) {
                case 'pharmacyName':
                    if (value === '') {
                        newErrors[key] = 'Pharmacy name is required';
                        isValid = false;
                    }
                    break;
                case 'contact':
                    if (value === '') {
                        newErrors[key] = 'Contact number is required';
                        isValid = false;
                    } else if (!sriLankaMobileNumberRegex.test(value)) {
                        newErrors[key] = 'Invalid number contact number';
                        isValid = false;
                    }
                    break;
                case 'website':
                    if (value && !websiteRegex.test(value)) {
                        newErrors[key] = 'Invalid website URL';
                        isValid = false;
                    }
                    break;
                case 'address':
                    if (value === '') {
                        newErrors[key] = 'Address is required';
                        isValid = false;
                    }
                    break;
                default:
                    break;
            }
        }

        // Update the errors state
        setErrors(newErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

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
        let isValid = true;
        let newUserErrors = {...userErrors};

        // Validate each field
        if (userData.name.trim() === '') {
            newUserErrors.name = 'Name is required';
            isValid = false;
        } else if (nameRegex.test(userData.name)) {
            newUserErrors.name = 'Invalid name';
            isValid = false;
        }
        if (userData.contact.trim() === '') {
            newUserErrors.contact = 'Contact number is required';
            isValid = false;
        } else if (!sriLankaMobileNumberRegex.test(userData.contact)) {
            newUserErrors.contact = 'Invalid contact number';
            isValid = false;
        }
        if (selectedRole === "-1" || selectedRole === undefined) {
            newUserErrors.role = 'Role is required';
            isValid = false;
        }
        if (userData.nic.trim() === '') {
            newUserErrors.nic = 'NIC is required';
            isValid = false;
        } else if (!sriLankaNicRegex.test(userData.nic)) {
            newUserErrors.nic = 'Invalid NIC number';
            isValid = false;
        }
        if (userData.email.trim() === '') {
            newUserErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(userData.email)) {
            newUserErrors.email = 'Invalid email';
            isValid = false;
        }
        if (userData.password.trim() === '') {
            newUserErrors.password = 'Password is required';
            isValid = false;
        }
        if (userData.username.trim() === '') {
            newUserErrors.username = 'Username is required';
            isValid = false;
        }


        // Update the userErrors state
        setUserErrors(newUserErrors);

        // Prevent saving if the form is invalid
        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const isSuccess = await userAPIController.saveUser(userData);
        if (isSuccess) {
            // @ts-ignore
            const roleName = userRoles.find(role => role.id === parseInt(selectedRole)).name;

            // Add the saved user to the users table
            const formattedUser = {
                ...userData,
                id: isSuccess.id,
                role: {name: roleName},  // Convert role to object with 'name'
            };
            setUsers([...users, formattedUser]);

            // Clear the form fields after successful save
            setUserData({
                name: '',
                contact: '',
                role: '',
                nic: '',
                email: '',
                password: '',
                username: '',
                address: '',
            });
            setUserErrors({
                name: '',
                contact: '',
                role: '',
                nic: '',
                email: '',
                password: '',
                username: '',
                address: '',
            });

            alert("User saved successfully!");
        } else {
            alert("Failed to save user.");
        }
    };

    const fetchUserRoles = async () => {
        const response = await userAPIController.getAllUserRoles();

        const roles = response.data.map((role: { id: number; name: string }) => ({
            id: role.id,
            name: role.name,
        }));

        setUserRoles(roles);
    };

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const response = await shopAPIController.getShopData();  // API call to get shop data
                if (response) {
                    // Map response.name to pharmacyName
                    setShopData({
                        pharmacyId: String(response.data.pharmacyId),
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

        fetchUserRoles();
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
                        msg={errors.address}
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
                                value={selectedRole}
                                name={"role"}
                                onChange={handleRoleChange}
                                className='text-input'
                            >
                                <option value="-1">Select an item</option>
                                {userRoles.map((option, index) => (
                                    <option key={index} value={option.id}>{option.name}</option>
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
                        placeholder={'supplier@gmail.com'}
                        label={'Email'}
                        important={"*"}
                        value={userData.email}
                        onChange={handleUsersChange}
                        msg={userErrors.email}
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
                        msg={userErrors.password}
                    />
                    <TextField
                        name={'username'}
                        placeholder={'user123'}
                        label={'Username'}
                        important={"*"}
                        value={userData.username}
                        onChange={handleUsersChange}
                        msg={userErrors.username}
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
                        msg={userErrors.address}
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
                                        <TableCell sx={{display: 'flex', flexDirection: 'row'}}>
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
