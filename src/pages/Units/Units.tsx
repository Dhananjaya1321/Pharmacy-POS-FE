import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useEffect, useState} from "react";
import unitAPIController from "../../controller/UnitAPIController";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {Tooltip} from "@mui/material";
import Paper from "@mui/material/Paper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import UnitModal from "../../modals/UnitModal/UnitModal";
import {letterOnlyRegex, nameRegex, sriLankaMobileNumberRegex, websiteRegex} from "../../validasion/validations";

interface Unit {
    id: number;
    unitName: string;
    unitSymbology: string;
    description: string;
}

export const Units = () => {
    const columns: GridColDef[] = [
        {
            field: 'unitName', headerName: 'Unit Name', width: 300, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'unitSymbology', headerName: 'UnitSymbology', width: 200, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'description', headerName: 'Description', width: 300,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 400,
            renderCell: (params) => (
                <>
                    <UnitModal rowData={params.row} onUpdateUnit={handleUpdateUnit}/>
                    <button
                        className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </>
            ),
        },
    ];

    const [unitData, setUnitData] = useState({
        unitName: '',
        unitSymbology: '',
        description: '',
    });

    const [unitErrors, setUnitErrors] = useState({
        unitName: '',
        unitSymbology: '',
        description: '',
    });
    const [units, setUnits] = useState<Unit[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});
    const [totalElements, setTotalElements] = useState(0);

    type UnitDataKey = keyof typeof unitData;

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as UnitDataKey;

        setUnitData({
            ...unitData,
            [typedName]: value,
        });

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

    const handleUpdateUnit = (updatedUnit: {
        id: number;
        unitName: string;
        unitSymbology: string;
        description: string;
    }) => {
        setUnits(prevUnits =>
            prevUnits.map(unit =>
                unit.id === updatedUnit.id ? updatedUnit : unit
            )
        );
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

        const savedUnit = await unitAPIController.saveUnit(unitData);
        if (savedUnit) {
            const formattedBrand = {
                ...unitData,
                id: savedUnit.data.id,
            };

            setUnits([...units, formattedBrand]);
            setTotalElements(prevTotal => prevTotal + 1);

            setUnitData({
                unitName: '',
                unitSymbology: '',
                description: '',
            });

            setUnitErrors({
                unitName: '',
                unitSymbology: '',
                description: '',
            });
            alert("Unit saved successfully!");
        } else {
            alert("Failed to save unit.");
        }
    };

    const fetchAllUnits = async (page: number, pageSize: number) => {
        try {
            const response = await unitAPIController.getAllUnits(page, pageSize);
            if (response) {
                setUnits(response.data.content);
                setTotalElements(response.data.page.totalElements);
            }
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this unit?");
        if (!confirmed) return;

        try {
            const response = await unitAPIController.deleteUnit(id);
            if (response.state === "OK") {
                setUnits(prevUnits => prevUnits.filter(unit => unit.id !== id));
                setTotalElements(prevTotal => prevTotal - 1);
                alert("Unit deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                alert(response.message || "Failed to delete unit.");
            } else {
                alert("Failed to delete unit.");
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        fetchAllUnits(0, 5).then(r => {
        });
    }, []);

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Units</h3>
            </section>
            {/*url display section*/}
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="unitName"
                        placeholder={'Kilogram'}
                        label={'Unit name'}
                        important={"*"}
                        value={unitData.unitName}
                        onChange={handleUnitChange}
                        msg={unitErrors.unitName}
                    />
                    <TextField
                        name="unitSymbology"
                        placeholder={'kg'}
                        label={'Unit symbology'}
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
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleUnitSaveEvent}
                    />
                </div>
            </section>
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Isuru Dhananjaya'} label={'User\'s name'}/>
                </div>
                <Paper sx={{height: 400, width: '100%'}}>
                    <DataGrid
                        rows={units}
                        columns={columns}
                        pagination
                        pageSizeOptions={[5, 10]}
                        // checkboxSelection
                        sx={{
                            border: 0,
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: 'inherit' // Removes hover effect
                            },
                            '& .MuiDataGrid-cell:focus-within': {
                                outline: 'none', // Removes focus outline on edit mode
                            }
                        }}
                        disableRowSelectionOnClick
                        disableColumnMenu
                        getRowId={(row) => row.id}
                        paginationModel={paginationModel}
                        rowCount={totalElements} // Total number of rows
                        paginationMode="server" // Use server-side pagination
                        onPaginationModelChange={(newPagination) => {
                            setPaginationModel(newPagination);
                            fetchAllUnits(newPagination.page, newPagination.pageSize).then(r => {
                            });
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
        </section>
    );
};
