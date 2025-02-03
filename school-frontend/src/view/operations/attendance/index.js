// csutome datatable
import DataTable from 'componets/DataTable';

// Attendance model

// api
import { getAttendance } from 'api/attendance/attendanceApi';

// icons
import HistoryIcon from '@mui/icons-material/History';

//React
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

// constant
import { fontFamily } from 'constant/constant';
import AttendanceHistory from './AttendanceHistory';

const Attendance = () => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();

    const [attendanceDetail, setAttendanceDetail] = useState({});
    const [showAttendanceHistory, setShowAttendanceHistory] = useState(false);
    const [data, setData] = useState([]);

    // fetch Attendance list
    const fetchAttendance = async () => {
        try {
            const query = {
                date: new Date(new Date().setHours(0, 0, 0, 0))
            };
            const response = await getAttendance(query);
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
        { id: 'class', label: 'CLASS', align: 'center' },
        { id: 'total_student_count', label: 'TOTAL', align: 'center' },
        { id: 'present_students_count', label: 'PRESENT', align: 'center' },
        { id: 'absent_students_count', label: 'ABSENT', align: 'center' },
        { id: 'class_teacher', label: 'CLASS TEACHER', align: 'center' }
    ];

    const actions = [
        {
            title: 'History',
            icon: <HistoryIcon />,
            handler: (row) => {
                setAttendanceDetail(row);
                setShowAttendanceHistory(true);
            }
        }
    ];
    // -=-=-=-=-=-=-=- end of setter of header and action buttons -=-=-=-=-=-=-=-=-=-

    const handleBackButton = async () => {
        setShowAttendanceHistory(false);
    };

    React.useEffect(() => {
        fetchAttendance();
    }, []);

    if (showAttendanceHistory) {
        return <AttendanceHistory attendanceDetail={attendanceDetail} fontFamily={fontFamily} onCancel={handleBackButton} />;
    }

    return (
        <>
            <SnackbarComponent />
            <DataTable headers={headers} tableTitle="Attendance List" data={data} actions={actions} fontFamily={fontFamily} />
        </>
    );
};

export default Attendance;
