import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import customerAPIController from "../../controller/CustomerAPIController";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {useState} from "react";
import {emailRegex, nameRegex, sriLankaMobileNumberRegex, sriLankaNicRegex} from "../../validasion/validations";

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

interface Customer {
    id: string;
    name: string;
    contact: string;
    email: string;
    nic: string;
    address: string;
}

// Update props for NewCustomerModal component to include the onCustomerSaved callback
interface NewCustomerModalProps {
    onCustomerSaved: (customer: Customer) => void;
}
// Modify the NewCustomerModal component
export default function NewCustomerModal({ onCustomerSaved }: NewCustomerModalProps) {
    const [open, setOpen] = React.useState(false);
    const [customerData, setCustomerData] = React.useState<Customer>({
        id: '',
        name: '',
        contact: '',
        email: '',
        nic: '',
        address: '',
    });

    const [customerErrors, setCustomerErrors] = useState({
        name: '',
        contact: '',
        email: '',
        nic: '',
        address: '',
    });
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setCustomerData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Initialize error message
        let error = '';

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
            case 'nic':
                if (value.trim() === '') {
                    error = 'NIC is required';
                } else if (!sriLankaNicRegex.test(value.trim())) {
                    error = 'Invalid NIC number';
                }
                break;
            case 'email':
                if (!emailRegex.test(value.trim())) {
                    error = 'Invalid email address';
                }
                break;
            case 'address':
                if (value.trim().length > 500) {
                    error = 'Address cannot exceed 500 characters';
                }
                break;
            default:
                break;
        }

        setCustomerErrors({
            ...customerErrors,
            [name]: error,
        });
    };

    const handleCustomerSaveEvent = async () => {
        const validationErrors = {
            name: '',
            contact: '',
            nic: '',
            email: '',
            address: '',
        };

        let isValid = true;

        // Validate each field
        if (customerData.name.trim().length < 2) {
            validationErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        } else if (!nameRegex.test(customerData.name.trim())) {
            validationErrors.name = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (customerData.contact.trim() === '') {
            validationErrors.contact = 'Contact number is required';
            isValid = false;
        } else if (!sriLankaMobileNumberRegex.test(customerData.contact.trim())) {
            validationErrors.contact = 'Invalid Sri Lankan phone number';
            isValid = false;
        }

        if (customerData.nic.trim() === '') {
            validationErrors.nic = 'NIC is required';
            isValid = false;
        } else if (!sriLankaNicRegex.test(customerData.nic.trim())) {
            validationErrors.nic = 'Invalid NIC number';
            isValid = false;
        }

        if (customerData.email.trim() !== '' && !emailRegex.test(customerData.email.trim())) {
            validationErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (customerData.address.trim().length > 500) { // Example constraint
            validationErrors.address = 'Address cannot exceed 500 characters';
            isValid = false;
        }

        setCustomerErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const savedCustomer = await customerAPIController.saveCustomer(customerData);
        if (savedCustomer) {
            setCustomerData(prevState => ({
                ...prevState,
                id: savedCustomer.id
            }));
            alert("Customer saved successfully!");
            onCustomerSaved(savedCustomer);
            handleClose();
        } else {
            alert("Failed to saved customer.");
        }
        handleClose();
    };

    return (
        <div>
            <button className="h-[45px] w-[100px] rounded text-white px-4 bg-green-500" onClick={handleOpen}>
                New
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
                        Customer Update
                    </Typography>
                    <section
                        className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="name"
                                placeholder={'Isuru Dhananjaya'}
                                label={'Customer name'}
                                important={"*"}
                                value={customerData.name}
                                onChange={handleCustomerChange}
                                msg={customerErrors.name}
                            />
                            <TextField
                                name="contact"
                                placeholder={'076 715 1321'}
                                label={'Contact'}
                                important={"*"}
                                value={customerData.contact}
                                onChange={handleCustomerChange}
                                msg={customerErrors.contact}
                            />
                            <TextField
                                name="email"
                                placeholder={'isuru@gmail.com'}
                                label={'Email'}
                                value={customerData.email}
                                onChange={handleCustomerChange}
                                msg={customerErrors.email}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="nic"
                                placeholder={'20021010025'}
                                label={'NIC'}
                                value={customerData.nic}
                                onChange={handleCustomerChange}
                                msg={customerErrors.nic}
                            />
                            <HiddenTextField/>
                            <HiddenTextField/>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name="address"
                                placeholder={'No - 181, ABC Road, Galle'}
                                label={'Address'}
                                value={customerData.address}
                                onChange={handleCustomerChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                            <Button
                                name={'Save'}
                                color={'bg-[#2FEB00]'}
                                onClick={handleCustomerSaveEvent}
                            />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
