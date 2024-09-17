import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "../TextField/TextFild";
import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import customerAPIController from "../../controller/CustomerAPIController";
import {HiddenTextField} from "../HiddenTextField/HiddenTextField";

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


interface CustomerModalProps {
    rowData: {
        id: number;
        name: string;
        contact: string;
        email: string;
        nic: string;
        address: string;
    };
    onUpdateCustomer: (updatedCustomer: {
        id: number;
        name: string;
        contact: string;
        email: string;
        nic: string;
        address: string;
    }) => void;
}

export default function CustomerModal({rowData, onUpdateCustomer}: CustomerModalProps) {
    const [open, setOpen] = React.useState(false);
    const [customerData, setCustomerData] = React.useState({
        id: rowData?.id || 0,
        name: rowData?.name || '',
        contact: rowData?.contact || '',
        email: rowData?.email || '',
        nic: rowData?.nic || '',
        address: rowData?.address || ''
    });

    const handleOpen = () => {
        setCustomerData({
            id: rowData.id,
            name: rowData.name,
            contact: rowData.contact,
            email: rowData.email,
            nic: rowData.nic,
            address: rowData.address
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setCustomerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCustomerUpdateEvent = async () => {
        const isSuccess = await customerAPIController.saveCustomer(customerData);
        if (isSuccess) {
            onUpdateCustomer(customerData); // Call the update function passed from the parent
            alert("Customer updated successfully!");
        } else {
            alert("Failed to update customer.");
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
                            />
                            <TextField
                                name="contact"
                                placeholder={'076 715 1321'}
                                label={'Contact'}
                                important={"*"}
                                value={customerData.contact}
                                onChange={handleCustomerChange}
                            />
                            <TextField
                                name="email"
                                placeholder={'isuru@gmail.com'}
                                label={'Email'}
                                value={customerData.email}
                                onChange={handleCustomerChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="nic"
                                placeholder={'20021010025'}
                                label={'NIC'}
                                value={customerData.nic}
                                onChange={handleCustomerChange}
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
                                name={'Update'}
                                color={'bg-[#2FEB00]'}
                                onClick={handleCustomerUpdateEvent}
                            />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
