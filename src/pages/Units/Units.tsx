import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useEffect, useState} from "react";
import unitAPIController from "../../controller/UnitAPIController";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {Tooltip} from "@mui/material";
import Paper from "@mui/material/Paper";



const columns: GridColDef[] = [
    {field: 'unitName', headerName: 'Unit Name', width: 300,renderCell: (params) => (
            <Tooltip title={params.value}>
                <div
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign:'start',
                    }}
                >
                    {params.value}
                </div>
            </Tooltip>
        ),},
    {field: 'unitSymbology', headerName: 'UnitSymbology', width: 200,renderCell: (params) => (
            <Tooltip title={params.value}>
                <div
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign:'start',
                    }}
                >
                    {params.value}
                </div>
            </Tooltip>
        ),},
    {field: 'description', headerName: 'Description', width: 300,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <div
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign:'start',
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
                <Button
                    name={'Save'}
                    color={'bg-[#2FEB00]'}
                    onClick={handleUpdate}
                />
                <Button
                    name={'Save'}
                    color={'bg-[#2FEB00]'}
                    onClick={handleDelete}
                />
            </>
        ),
    },
];

const handleUpdate = async () => {
    console.log("update")
};
const handleDelete = async () => {
    console.log("delete")
};

interface Unit {
    id: number;
    unitName: string;
    unitSymbology: string;
    description: string;
}

export const Units = () => {
    const [unitData, setUnitData] = useState({
        unitName: '',
        unitSymbology: '',
        description: '',
    });
    const [units, setUnits] = useState<Unit[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
    const [totalElements, setTotalElements] = useState(0);

    type UnitDataKey = keyof typeof unitData;

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as UnitDataKey;

        setUnitData({
            ...unitData,
            [typedName]: value,
        });
    };

    const handleUnitSaveEvent = async () => {
        const isSuccess = await unitAPIController.saveUnit(
            unitData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
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

    useEffect(() => {
        fetchAllUnits(0, 5).then(r => {});
    }, []);

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
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
                    />
                    <TextField
                        name="unitSymbology"
                        placeholder={'kg'}
                        label={'Unit symbology'}
                        important={"*"}
                        value={unitData.unitSymbology}
                        onChange={handleUnitChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={unitData.description}
                        onChange={handleUnitChange}
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
                        sx={{border: 0}}
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
