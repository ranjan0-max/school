// csutome datatable
import DataTable from 'componets/DataTable';

// student model
import UserForm from './UserForm';

// api
import { createUser, getUser, updateUser } from 'api/user/useApi';

//React
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material';
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

const Student = () => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [modelEvent, setModelEvent] = useState(false);
    const [data, setData] = useState([]);

    // fetch student list
    const fetchUsers = async () => {
        try {
            const response = await getUser();
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
            const response = await createUser(data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchUsers();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // update student
    const handleUpdate = async (id, data) => {
        try {
            const response = await updateUser(id, data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchUsers();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // set the headers and actions
    const headers = [
        { id: 'user_id', label: 'NAME', align: 'center' },
        { id: 'role', label: 'ROLE', align: 'center' }
    ];

    const actions = [
        {
            title: 'Edit',
            icon: <EditIcon />,
            handler: (row) => {
                setUserDetail(row);
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
        let isMounted = true;
        if (isMounted) {
            fetchUsers();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <SnackbarComponent />
            <div {...(isModalOpen ? { inert: 'true' } : {})}>
                <DataTable headers={headers} tableTitle="User List" addButton={addButton} actions={actions} data={data} />
            </div>
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <UserForm
                    onCancel={handleModalClose}
                    handleCreate={handleEventCreate}
                    event={modelEvent}
                    handleUpdate={handleUpdate}
                    userDetail={userDetail}
                    fontFamily="Copperplate, Fantasy"
                />
            </Dialog>
        </>
    );
};

export default Student;
