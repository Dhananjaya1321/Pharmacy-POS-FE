import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import brandAPIController from "../../controller/BrandAPIController";
import {useState} from "react";
import {nameRegex, sriLankaMobileNumberRegex, websiteRegex} from "../../validasion/validations";  // Adjust this based on your API controller

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #006CAF',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

interface BrandModalProps {
    rowData: {
        id: number;
        name: string;
        contact: string;
        website: string;
        address: string;
        description: string;
    };
    onUpdateBrand: (updatedBrand: {
        id: number;
        name: string;
        contact: string;
        website: string;
        address: string;
        description: string
    }) => void;
}

export default function BrandModal({rowData, onUpdateBrand}: BrandModalProps) {
    const [open, setOpen] = React.useState(false);
    const [brandData, setBrandData] = React.useState({
        id: rowData?.id || 0,
        name: rowData?.name || '',
        contact: rowData?.contact || '',
        website: rowData?.website || '',
        address: rowData?.address || '',
        description: rowData?.description || ''
    });
    const [brandErrors, setBrandErrors] = useState({
        name: '',
        contact: '',
        website: '',
        address: '',
        description: '',
    });
    const handleOpen = () => {
        setBrandData({
            id: rowData.id,
            name: rowData.name,
            contact: rowData.contact,
            website: rowData.website,
            address: rowData.address,
            description: rowData.description
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setBrandData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim().length <= 1) {
                    error = 'Name must be at least 1 characters';
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
                if (value && !websiteRegex.test(value)) {
                    error = 'Invalid website URL';
                }
                break;
            case 'address':
                if (value.trim().length > 500) {
                    error = 'Address cannot exceed 500 characters';
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

        // Update the errors state
        setBrandErrors({
            ...brandErrors,
            [name]: error,
        });
    };

    const handleBrandSaveEvent = async () => {
        const validationErrors = {
            name: '',
            contact: '',
            website: '',
            address: '',
            description: '',
        };

        let isValid = true;

        // Validate each field
        if (brandData.name.trim().length <= 1) {
            validationErrors.name = 'Name must be at least 1 characters';
            isValid = false;
        } else if (!nameRegex.test(brandData.name.trim())) {
            validationErrors.name = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (brandData.contact.trim() === '') {
            validationErrors.contact = 'Contact number is required';
            isValid = false;
        } else if (!sriLankaMobileNumberRegex.test(brandData.contact.trim())) {
            validationErrors.contact = 'Invalid Sri Lankan phone number';
            isValid = false;
        }

        if (brandData.website && !websiteRegex.test(brandData.website)) {
            validationErrors.address = 'Invalid website URL';
            isValid = false;
        }

        if (brandData.address.trim().length > 500) { // Example constraint
            validationErrors.address = 'Address cannot exceed 500 characters';
            isValid = false;
        }

        if (brandData.description.trim().length > 500) { // Example constraint
            validationErrors.address = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        setBrandErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const isSuccess = await brandAPIController.saveBrand(brandData); // Update the API call
        if (isSuccess) {
            onUpdateBrand(brandData); // Call the update function passed from the parent
            alert("Brand updated successfully!");
            handleClose();
        } else {
            alert("Failed to update brand.");
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
                        className="absolute top-[-15px] right-[-15px] text-red-500 hover:text-gray-700 p-2 w-[40px]
                        h-[40px] bg-white shadow-lg rounded-lg flex justify-center items-center"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg"/>
                    </button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Brand Update
                    </Typography>
                    <section
                        className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="name"
                                placeholder={'Brand name'}
                                label={'Brand name'}
                                important={"*"}
                                value={brandData.name}
                                onChange={handleBrandChange}
                                msg={brandErrors.name}
                            />
                            <TextField
                                name="contact"
                                placeholder={'077 752 0000'}
                                label={'Contact'}
                                important={"*"}
                                value={brandData.contact}
                                onChange={handleBrandChange}
                                msg={brandErrors.contact}
                            />
                            <TextField
                                name="website"
                                placeholder={'brand.com'}
                                label={'Website'}
                                value={brandData.website}
                                onChange={handleBrandChange}
                                msg={brandErrors.website}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name="address"
                                placeholder={'Address'}
                                label={'Address'}
                                value={brandData.address}
                                onChange={handleBrandChange}
                                msg={brandErrors.address}
                            />
                            <TextArea
                                name="description"
                                placeholder={'Description'}
                                label={'Description'}
                                value={brandData.description}
                                onChange={handleBrandChange}
                                msg={brandErrors.description}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                            <Button
                                name={'Update'}
                                color={'bg-[#2FEB00]'}
                                onClick={handleBrandSaveEvent}
                            />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
