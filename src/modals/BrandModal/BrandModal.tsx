import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "../../component/TextField/TextFild";
import { TextArea } from "../../component/TextArea/TextArea";
import { Button } from "../../component/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import brandAPIController from "../../controller/BrandAPIController";  // Adjust this based on your API controller

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
    onUpdateBrand: (updatedBrand: { id: number; name: string; contact: string; website: string; address: string; description: string }) => void;
}

export default function BrandModal({ rowData, onUpdateBrand }: BrandModalProps) {
    const [open, setOpen] = React.useState(false);
    const [brandData, setBrandData] = React.useState({
        id: rowData?.id || 0,
        name: rowData?.name || '',
        contact: rowData?.contact || '',
        website: rowData?.website || '',
        address: rowData?.address || '',
        description: rowData?.description || ''
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
        const { name, value } = e.target;
        setBrandData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleBrandSaveEvent = async () => {
        const isSuccess = await brandAPIController.saveBrand(brandData); // Update the API call
        if (isSuccess) {
            onUpdateBrand(brandData); // Call the update function passed from the parent
            alert("Brand updated successfully!");
        } else {
            alert("Failed to update brand.");
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
                        Brand Update
                    </Typography>
                    <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="name"
                                placeholder={'Brand name'}
                                label={'Brand name'}
                                important={"*"}
                                value={brandData.name}
                                onChange={handleBrandChange}
                            />
                            <TextField
                                name="contact"
                                placeholder={'077 752 0000'}
                                label={'Contact'}
                                important={"*"}
                                value={brandData.contact}
                                onChange={handleBrandChange}
                            />
                            <TextField
                                name="website"
                                placeholder={'brand.com'}
                                label={'Website'}
                                value={brandData.website}
                                onChange={handleBrandChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name="address"
                                placeholder={'Address'}
                                label={'Address'}
                                value={brandData.address}
                                onChange={handleBrandChange}
                            />
                            <TextArea
                                name="description"
                                placeholder={'Description'}
                                label={'Description'}
                                value={brandData.description}
                                onChange={handleBrandChange}
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
