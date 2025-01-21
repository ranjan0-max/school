// csutome datatable
import DataTable from 'componets/DataTable';

// Subject model
import SubjectForm from './SubjectForm';

// api
import { createSubject, getSubjects, updateSubject } from 'api/subject/subjectApi';

//React
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material';
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

const Subject = () => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectDetail, setSubjectDetail] = useState({});
    const [modelEvent, setModelEvent] = useState(false);
    const [data, setData] = useState([]);

    // fetch Subject list
    const fetchSubjects = async () => {
        try {
            const response = await getSubjects();
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
            const response = await createSubject(data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchSubjects();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // update Subject
    const handleUpdate = async (id, data) => {
        try {
            const response = await updateSubject(id, data);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchSubjects();
                handleModalClose();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // set the headers and actions
    const headers = [{ id: 'name', label: 'NAME', align: 'center' }];

    const actions = [
        {
            title: 'Edit',
            icon: <EditIcon />,
            handler: (row) => {
                setSubjectDetail(row);
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
            fetchSubjects();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <SnackbarComponent />
            <div {...(isModalOpen ? { inert: 'true' } : {})}>
                <DataTable headers={headers} tableTitle="Subject List" addButton={addButton} actions={actions} data={data} />
            </div>
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <SubjectForm
                    onCancel={handleModalClose}
                    handleCreate={handleEventCreate}
                    event={modelEvent}
                    handleUpdate={handleUpdate}
                    subjectDetail={subjectDetail}
                />
            </Dialog>
        </>
    );
};

export default Subject;
