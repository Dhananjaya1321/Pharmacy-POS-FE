import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import supplierAPIController from "../../controller/SupplierAPIController";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {useState} from "react";
import {
    emailRegex,
    nameRegex,
    sriLankaMobileNumberRegex,
    sriLankaNicRegex,
    websiteRegex
} from "../../validasion/validations";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxHeight: '90vh', // Ensure the modal doesn't exceed the viewport height
    bgcolor: 'background.paper',
    border: '2px solid #006CAF',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto' // Enable scrolling if content overflows
};

interface SupplierModalProps {
    rowData: {
        id: number;
        name: string;
        contact: string;
        email: string;
        nic: string;
        website: string;
        description: string;
    };
    onUpdateSupplier: (updatedSupplier: {
        id: number;
        name: string;
        contact: string;
        email: string;
        nic: string;
        website: string;
        description: string;
    }) => void;
}

export default function SupplierModal({rowData, onUpdateSupplier}: SupplierModalProps) {
    const [open, setOpen] = React.useState(false);
    const [supplierData, setSupplierData] = React.useState({
        id: rowData?.id || 0,
        name: rowData?.name || '',
        contact: rowData?.contact || '',
        email: rowData?.email || '',
        nic: rowData?.nic || '',
        website: rowData?.website || '',
        description: rowData?.description || ''
    });
    const [supplierErrors, setSupplierErrors] = useState<Record<string, string>>({
        name: "",
        contact: "",
        email: "",
        nic: "",
        website: "",
        description: ""
    });
    const handleOpen = () => {
        setSupplierData({
            id: rowData.id,
            name: rowData.name,
            contact: rowData.contact,
            email: rowData.email,
            nic: rowData.nic,
            website: rowData.website,
            description: rowData.description
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSupplierChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setSupplierData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Initialize error message
        let error = "";

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim().length < 2) {
                    error = 'Name must be at least 2 characters';
                } else if (!nameRegex.test(value.trim())) {
                    error = 'Name can contain only letters and spaces';
                }
                break;
            case 'contact':
                if (value.trim() === '') {
                    error = 'Contact number is required';
                } else if (!sriLankaMobileNumberRegex.test(value.trim())) {
                    error = 'Invalid Sri Lankan phone number';
                }
                break;
            case 'website':
                if (value.trim() !== '' && !websiteRegex.test(value.trim())) {
                    error = 'Invalid website URL';
                }
                break;
            case 'nic':
                if (value.trim() === '') {
                    error = 'NIC is required';
                } else if (!sriLankaNicRegex.test(value.trim())) {
                    error = 'Invalid NIC number';
                }
                break;
            case 'email':
                if (value.trim() === '') {
                    error = 'Email is required';
                } else if (!emailRegex.test(value.trim())) {
                    error = 'Invalid email address';
                }
                break;
            case 'description':
                if (value.trim().length > 500) {
                    error = 'Description cannot exceed 500 characters';
                }
                break;
            default:
                break;
        }

        // Update the userErrors state
        setSupplierErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSupplierUpdateEvent = async () => {
        const validationErrors = {
            name: '',
            contact: '',
            website: '',
            nic: '',
            email: '',
            description: '',
        };
        let isValid = true;

        // Validate each field
        if (supplierData.name.trim().length < 2) {
            validationErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        } else if (!nameRegex.test(supplierData.name.trim())) {
            validationErrors.name = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (supplierData.contact.trim() === '') {
            validationErrors.contact = 'Contact number is required';
            isValid = false;
        } else if (!sriLankaMobileNumberRegex.test(supplierData.contact.trim())) {
            validationErrors.contact = 'Invalid Sri Lankan phone number';
            isValid = false;
        }

        if (supplierData.website.trim() !== '' && !websiteRegex.test(supplierData.website.trim())) {
            validationErrors.website = 'Invalid website URL';
            isValid = false;
        }

        if (supplierData.nic.trim() === '') {
            validationErrors.nic = 'NIC is required';
            isValid = false;
        } else if (!sriLankaNicRegex.test(supplierData.nic.trim())) {
            validationErrors.nic = 'Invalid NIC number';
            isValid = false;
        }

        if (supplierData.email.trim() === '') {
            validationErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(supplierData.email.trim())) {
            validationErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (supplierData.description.trim().length > 500) { // Example constraint
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        // Update the supplierErrors state
        setSupplierErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const isSuccess = await supplierAPIController.saveSupplier(supplierData);
        if (isSuccess) {
            onUpdateSupplier(supplierData); // Call the update function passed from the parent
            alert("Supplier updated successfully!");
            handleClose();
        } else {
            alert("Failed to update supplier.");
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
                        Supplier Update
                    </Typography>
                    <section
                        className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="name"
                                placeholder={'Supplier Name'}
                                label={'Supplier name'}
                                important={"*"}
                                value={supplierData.name}
                                onChange={handleSupplierChange}
                                msg={supplierErrors.name}
                            />
                            <TextField
                                name="contact"
                                placeholder={'076 123 4567'}
                                label={'Contact'}
                                important={"*"}
                                value={supplierData.contact}
                                onChange={handleSupplierChange}
                                msg={supplierErrors.contact}
                            />
                            <TextField
                                name="email"
                                placeholder={'supplier@example.com'}
                                label={'Email'}
                                value={supplierData.email}
                                onChange={handleSupplierChange}
                                msg={supplierErrors.email}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="nic"
                                placeholder={'NIC'}
                                label={'NIC'}
                                value={supplierData.nic}
                                onChange={handleSupplierChange}
                                msg={supplierErrors.nic}
                            />
                            <TextField
                                name="website"
                                placeholder={'https://supplierwebsite.com'}
                                label={'Website'}
                                value={supplierData.website}
                                onChange={handleSupplierChange}
                                msg={supplierErrors.website}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name="description"
                                placeholder={'Supplier description'}
                                label={'Description'}
                                value={supplierData.description}
                                onChange={handleSupplierChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                            <Button
                                name={'Update'}
                                color={'bg-[#2FEB00]'}
                                onClick={handleSupplierUpdateEvent}
                            />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
