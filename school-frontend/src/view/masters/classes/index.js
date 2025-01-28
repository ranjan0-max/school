// csutome datatable
import DataTable from 'componets/DataTable';

// class model
import ClassesForm from './ClassesForm';

// api
import { createClass, getClasses, updateClass } from 'api/classes/classesApi';

//React
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material';
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

const Classes = () => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [classDetail, setClassDetail] = useState({});
    const [modelEvent, setModelEvent] = useState(false);
    const [data, setData] = useState([]);

    // fetch Classes list
    const fetchClasses = async () => {
        try {
            const response = await getClasses();
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
            const response = await createClass(data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchClasses();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // update Class
    const handleUpdate = async (id, data) => {
        try {
            const response = await updateClass(id, data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchClasses();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // set the headers and actions
    const headers = [
        { id: 'class_name', label: 'NAME', align: 'center' },
        { id: 'total_strength', label: 'TOTAL STRENGTH', align: 'center' },
        { id: 'total_student_capacity', label: 'CLASS CAPACITY', align: 'center' },
        { id: 'teacher_name', label: 'CLASS TEACHER', align: 'center' },
        { id: 'class_room_no', label: 'ROMM NO', align: 'center' }
    ];

    const actions = [
        {
            title: 'Edit',
            icon: <EditIcon />,
            handler: (row) => {
                setClassDetail(row);
                setModelEvent(false);
                setIsModalOpen(true);
            }
        }
        // {
        //     title: 'Delete',
        //     icon: <DeleteIcon />,
        //     handler: (row) => console.log('Delete clicked for row:', row)
        // }
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
        fetchClasses();
    }, []);

    return (
        <>
            <SnackbarComponent />
            <div {...(isModalOpen ? { inert: 'true' } : {})}>
                <DataTable
                    headers={headers}
                    tableTitle="Class List"
                    addButton={addButton}
                    actions={actions}
                    data={data}
                    fontFamily="Copperplate, Fantasy"
                />
            </div>
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <ClassesForm
                    onCancel={handleModalClose}
                    handleCreate={handleEventCreate}
                    event={modelEvent}
                    handleUpdate={handleUpdate}
                    classDetail={classDetail}
                    fontFamily="Copperplate, Fantasy"
                />
            </Dialog>
        </>
    );
};

export default Classes;
