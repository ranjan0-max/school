//React
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

// modal
import ShowTimetable from './ShowTimeTable';

// csutome datatable
import DataTable from 'componets/DataTable';

// api
import { getTimeTable } from 'api/timeTable/timeTableApi';

// icons
import HistoryIcon from '@mui/icons-material/History';

// constant
import { fontFamily } from 'constant/constant';

const TimeTable = () => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();

    const [timeTableDetail, setTimeTableDetail] = useState({});
    const [showTimeTable, setShowTimeTable] = useState(false);
    const [data, setData] = useState([]);

    // fetch TimeTable list
    const fetchTimeTable = async () => {
        try {
            const response = await getTimeTable();
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setData(response);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // set the headers and actions
    const headers = [
        { id: 'class_name', label: 'CLASS', align: 'center' },
        { id: 'teacher_name', label: 'CLASS TEACHER', align: 'center' }
    ];

    const actions = [
        {
            title: 'History',
            icon: <HistoryIcon />,
            handler: (row) => {
                setTimeTableDetail(row);
                setShowTimeTable(true);
            }
        }
    ];
    // -=-=-=-=-=-=-=- end of setter of header and action buttons -=-=-=-=-=-=-=-=-=-

    const handleClose = () => {
        setShowTimeTable(false);
    };

    React.useEffect(() => {
        fetchTimeTable();
    }, []);

    if (showTimeTable) {
        return <ShowTimetable fontFamily={fontFamily} timeTableDetail={timeTableDetail} onCancel={handleClose} />;
    }

    return (
        <>
            <SnackbarComponent />
            <DataTable headers={headers} tableTitle="Time Table List" data={data} actions={actions} fontFamily={fontFamily} />
        </>
    );
};

export default TimeTable;
