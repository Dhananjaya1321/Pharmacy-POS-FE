import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import unitAPIController from "../../controller/UnitAPIController";
import {useState} from "react";
import {letterOnlyRegex, nameRegex} from "../../validasion/validations";  // Adjust this based on your API controller

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

interface UnitModalProps {
    rowData: {
        id: number;
        unitName: string;
        unitSymbology: string;
        description: string;
    };
    onUpdateUnit: (updatedUnit: { id: number; unitName: string; unitSymbology: string; description: string }) => void;
}

export default function UnitModal({rowData, onUpdateUnit}: UnitModalProps) {
    const [open, setOpen] = React.useState(false);
    const [unitData, setUnitData] = React.useState({
        id: rowData?.id || 0,
        unitName: rowData?.unitName || '',
        unitSymbology: rowData?.unitSymbology || '',
        description: rowData?.description || ''
    });

    const [unitErrors, setUnitErrors] = useState({
        unitName: '',
        unitSymbology: '',
        description: '',
    });
    const handleOpen = () => {
        setUnitData({
            id: rowData.id,
            unitName: rowData.unitName,
            unitSymbology: rowData.unitSymbology,
            description: rowData.description
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUnitData(prevState => ({
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
                } else if (value.trim().length <= 1) {
                    error = 'Name must be at least 1 characters';
                } else if (!letterOnlyRegex.test(value.trim())) {
                    error = 'Name can contain only letters and spaces';
                }
                break;
            case 'unitSymbology':
                if (value.trim() === '') {
                    error = 'Unit symbology is required';
                } else if (!letterOnlyRegex.test(value.trim())) {
                    error = 'Unit symbology can contain only letters';
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
        setUnitErrors({
            ...unitErrors,
            [name]: error,
        });
    };

    const handleUnitSaveEvent = async () => {
        const validationErrors = {
            unitName: '',
            unitSymbology: '',
            description: '',
        };

        let isValid = true;

        // Validate each field
        if (unitData.unitName.trim() === '') {
            validationErrors.unitName = 'Name is required';
            isValid = false;
        } else if (unitData.unitName.trim().length <= 1) {
            validationErrors.unitName = 'Name must be at least 1 characters';
            isValid = false;
        } else if (!letterOnlyRegex.test(unitData.unitName.trim())) {
            validationErrors.unitName = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (unitData.unitSymbology.trim() === '') {
            validationErrors.unitSymbology = 'Unit symbology is required';
            isValid = false;
        } else if (!letterOnlyRegex.test(unitData.unitSymbology.trim())) {
            validationErrors.unitSymbology = 'Unit symbology can contain only letters';
            isValid = false;
        }

        if (unitData.description.trim().length > 500) { // Example constraint
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        setUnitErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const isSuccess = await unitAPIController.saveUnit(unitData); // Update the API call
        if (isSuccess) {
            onUpdateUnit(unitData); // Call the update function passed from the parent
            alert("Unit updated successfully!");
            handleClose();
        } else {
            alert("Failed to update unit.");
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
                        Unit Update
                    </Typography>
                    <section
                        className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="unitName"
                                placeholder={'Kilogram'}
                                label={'Unit Name'}
                                important={"*"}
                                value={unitData.unitName}
                                onChange={handleUnitChange}
                                msg={unitErrors.unitName}
                            />
                            <TextField
                                name="unitSymbology"
                                placeholder={'kg'}
                                label={'Unit Symbology'}
                                important={"*"}
                                value={unitData.unitSymbology}
                                onChange={handleUnitChange}
                                msg={unitErrors.unitSymbology}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name="description"
                                placeholder={'Description'}
                                label={'Description'}
                                value={unitData.description}
                                onChange={handleUnitChange}
                                msg={unitErrors.description}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                            <Button
                                name={'Update'}
                                color={'bg-[#2FEB00]'}
                                onClick={handleUnitSaveEvent}
                            />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
