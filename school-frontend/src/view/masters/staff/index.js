// csutome datatable
import DataTable from 'componets/DataTable';

// student model
import StaffForm from './StaffForm';

// api
import { createStaff, getStaffs, updateStaff } from 'api/staff/staffApi';

//React
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material';
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

const Student = () => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staffDetail, setStaffDetail] = useState({});
    const [modelEvent, setModelEvent] = useState(false);
    const [data, setData] = useState([]);

    // fetch student list
    const fetchTeachers = async () => {
        try {
            const response = await getStaffs();
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setData(response);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // handle create
    const handleEventCreate = async (data) => {
        try {
            const response = await createStaff(data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchTeachers();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // update student
    const handleUpdate = async (id, data) => {
        try {
            const response = await updateStaff(id, data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchTeachers();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // set the headers and actions
    const headers = [
        { id: 'name', label: 'NAME', align: 'center' },
        { id: 'contact_number', label: 'C.NUMBER', align: 'center' },
        { id: 'email', label: 'EMAIL', align: 'center' },
        { id: 'gender', label: 'GENDER', align: 'center' },
        { id: 'address', label: 'ADDRESS', align: 'center' }
    ];

    const actions = [
        {
            title: 'Edit',
            icon: <EditIcon />,
            handler: (row) => {
                setStaffDetail(row);
                setModelEvent(false);
                setIsModalOpen(true);
            }
        },
        {
            title: 'Delete',
            icon: <DeleteIcon />,
            handler: (row) => console.log('Delete clicked for row:', row)
        }
    ];
    // -=-=-=-=-=-=-=- end of setter of header and action buttons -=-=-=-=-=-=-=-=-=-

    // close the modal
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // handle add button click
    const addButton = () => {
        setModelEvent(true);
        setIsModalOpen(true);
    };

    React.useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <>
            <SnackbarComponent />
            <div {...(isModalOpen ? { inert: 'true' } : {})}>
                <DataTable headers={headers} tableTitle="Staff List" addButton={addButton} actions={actions} data={data} />
            </div>
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <StaffForm
                    onCancel={handleModalClose}
                    handleCreate={handleEventCreate}
                    event={modelEvent}
                    handleUpdate={handleUpdate}
                    staffDetail={staffDetail}
                />
            </Dialog>
        </>
    );
};

export default Student;
