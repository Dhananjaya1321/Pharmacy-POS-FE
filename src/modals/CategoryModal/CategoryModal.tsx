import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "../../component/TextField/TextFild";
import { TextArea } from "../../component/TextArea/TextArea";
import { Button } from "../../component/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import categoryAPIController from "../../controller/CategoryAPIController";
import {useState} from "react";
import {nameRegex} from "../../validasion/validations";


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
interface CategoryModalProps {
    rowData: {
        id: number;
        name: string;
        description: string;
    };
    onUpdateCategory: (updatedCategory: { id: number; name: string; description: string }) => void;
}

export default function CategoryModal({ rowData, onUpdateCategory }: CategoryModalProps) {
    const [open, setOpen] = React.useState(false);
    const [categoryData, setCategoryData] = React.useState({
        id: rowData?.id || 0,
        name: rowData?.name || '',
        description: rowData?.description || ''
    });
    const [categoryErrors, setCategoryErrors] = useState({
        name: '',
        description: '',
    });
    const handleOpen = () => {
        setCategoryData({
            id: rowData.id,
            name: rowData.name,
            description: rowData.description
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim() === '') {
                    error = 'Name is required';
                } else if (value.trim().length <= 2) {
                    error = 'Name must be at least 2 characters';
                } else if (!nameRegex.test(value.trim())) {
                    error = 'Name can contain only letters and spaces';
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
        setCategoryErrors({
            ...categoryErrors,
            [name]: error,
        });
    };

    const handleCategoryUpdateEvent = async () => {
        const validationErrors = {
            name: '',
            description: '',
        };

        let isValid = true;

        // Validate each field
        if (categoryData.name.trim() === '') {
            validationErrors.name = 'Name is required';
            isValid = false;
        } else if (categoryData.name.trim().length <= 2) {
            validationErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        } else if (!nameRegex.test(categoryData.name.trim())) {
            validationErrors.name = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (categoryData.description.trim().length > 500) {
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        setCategoryErrors(validationErrors);


        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const isSuccess = await categoryAPIController.saveCategory(categoryData);
        if (isSuccess) {
            onUpdateCategory(categoryData); // Call the update function passed from the parent
            alert("Category updated successfully!");
            handleClose();
        } else {
            alert("Failed to update category.");
        }
        handleClose();
    };

    return (
        <div>
            <button className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100" onClick={handleOpen}>
                <FontAwesomeIcon icon={faPen} />
            </button>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <button
                        className="absolute top-[-15px] right-[-15px] text-red-500 hover:text-gray-700 p-2 w-[40px]
                        h-[40px] bg-white shadow-lg rounded-lg flex justify-center items-center"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Category update
                    </Typography>
                    <section className="bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md">
                        <div className="flex flex-row flex-wrap items-center justify-center w-full">
                            <TextField
                                name="name"
                                placeholder={'Category name'}
                                label={'Category name'}
                                important={"*"}
                                value={categoryData.name}
                                onChange={handleCategoryChange}
                                 msg={categoryErrors.name}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center w-full">
                            <TextArea
                                name="description"
                                placeholder={'Description'}
                                label={'Description'}
                                value={categoryData.description}
                                onChange={handleCategoryChange}
                                 msg={categoryErrors.description}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-end w-full">
                            <Button name={'Update'} color={'bg-[#2FEB00]'} onClick={handleCategoryUpdateEvent} />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
