import { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90 },
    { field: 'make', headerName: 'Make', flex: 1 },
    { field: 'model', headerName: 'Model', flex: 1 },
    { field: 'year', headerName: 'Year', flex: 1 },
    { field: 'color', headerName: 'Color', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 }
];

function DataTable() {
    const [open, setOpen] = useState(false);
    const { carData, getData } = useGetData(); // Ensure this hook correctly fetches car data
    const [selectionModel, setSelectionModel] = useState<string[]>([]);
    const [columnVisibilityModel] = useState({
        id: false, // Hiding the ID column initially
        make: true,
        model: true,
        year: true,
        color: true,
        price: true
    });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0]);
        getData();
        console.log(`Selection model: ${selectionModel}`);
        setTimeout(() => { window.location.reload() }, 500);
    }

    return (
        <>
            <Modal 
                id={selectionModel}
                open={open}
                onClose={handleClose}
            />
            <div className='flex flex-row'>
                <Button onClick={handleOpen} className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'>
                    Create New Car
                </Button>
                <Button onClick={handleOpen} className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'>Update</Button>
                <Button onClick={deleteData} className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'>Delete</Button>
            </div>
            <div style={{ height: 400, width: '100%' }} className={open ? "hidden" : "container mx-auto my-5"}>
                <h2 className="p-3 bg-slate-300 my-2 rounded">Car Inventory</h2>
                <DataGrid
                    rows={carData}
                    columns={columns}
                    checkboxSelection={true}
                    onRowSelectionModelChange={(item: any) => {
                        setSelectionModel(item);
                    }}
                    columnVisibilityModel={columnVisibilityModel}
                />
            </div>
        </>
    );
}

export default DataTable;
