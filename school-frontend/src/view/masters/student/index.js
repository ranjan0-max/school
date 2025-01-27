// csutome datatable
import DataTable from 'componets/DataTable';

// student model
import StudentForm from './StudentForm';

// api
import { createStudent, getStudents, updateStudent } from 'api/student/studentApi';

//React
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material';
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

const Student = () => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentDetail, setStudentDetail] = useState({});
    const [modelEvent, setModelEvent] = useState(false);
    const [data, setData] = useState([]);

    // fetch student list
    const fetchStudents = async () => {
        try {
            const response = await getStudents();
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
            const response = await createStudent(data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchStudents();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // update student
    const handleUpdate = async (id, data) => {
        try {
            const response = await updateStudent(id, data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchStudents();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // set the headers and actions
    const headers = [
        { id: 'name', label: 'NAME', align: 'center' },
        { id: 'gender', label: 'GENDER', align: 'center' },
        { id: 'address', label: 'ADDRESS', align: 'center' },
        { id: 'class_roll_no', label: 'ROLL NO', align: 'center' },
        { id: 'class_name', label: 'CLASS', align: 'center' }
    ];

    const actions = [
        {
            title: 'Edit',
            icon: <EditIcon />,
            handler: (row) => {
                setStudentDetail(row);
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
        fetchStudents();
    }, []);

    return (
        <>
            <SnackbarComponent />
            <div {...(isModalOpen ? { inert: 'true' } : {})}>
                <DataTable headers={headers} tableTitle="Student List" addButton={addButton} actions={actions} data={data} />
            </div>
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <StudentForm
                    onCancel={handleModalClose}
                    handleCreate={handleEventCreate}
                    event={modelEvent}
                    handleUpdate={handleUpdate}
                    studentDetail={studentDetail}
                />
            </Dialog>
        </>
    );
};

export default Student;
