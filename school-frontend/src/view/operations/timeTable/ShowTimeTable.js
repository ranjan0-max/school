import { Button, Dialog, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainCard from 'componets/MainCard';

// api
import { getTimeTableInDetail, updateTimeTable } from 'api/timeTable/timeTableApi';
import useSnackbarAlert from 'customHook/alert';
import React, { useState } from 'react';

// model
import TimeTableForm from './TimeTableForm';

// constant
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const ShowTimetable = ({ fontFamily, timeTableDetail, onCancel }) => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();
    const [timeTableData, setTimeTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dayDetail, setDayDetail] = useState({});
    const [selectedDay, setSelectedDay] = useState('');

    const fetchTimeTableInDetail = async () => {
        try {
            const response = await getTimeTableInDetail({ _id: timeTableDetail?._id });
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setTimeTableData(response.time_table);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const updateTheTimeTableData = async (data_to_update) => {
        try {
            const response = await updateTimeTable(timeTableDetail?._id, { time_table: data_to_update });
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                openTostar(response.data.message, 'success');
                fetchTimeTableInDetail();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleEditTimeTable = (row, index) => {
        setSelectedDay(DAYS[index]);
        setDayDetail(row);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = (data) => {
        const temp_days = JSON.parse(JSON.stringify(DAYS));

        const index_to_remove = temp_days.indexOf(selectedDay);
        temp_days.splice(index_to_remove, 1);

        let data_to_update = timeTableData;
        data_to_update.forEach((day) => {
            if (day.hasOwnProperty(selectedDay)) {
                day[selectedDay] = data[selectedDay];
            }
        });

        updateTheTimeTableData(data_to_update);
        handleModalClose();
    };

    React.useEffect(() => {
        fetchTimeTableInDetail();
    }, []);

    return (
        <MainCard
            border={true}
            title={
                <Typography variant="h5" color="white" fontWeight="bold" fontFamily={fontFamily}>
                    Time Table Of {timeTableDetail?.class_name}
                </Typography>
            }
        >
            <SnackbarComponent />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>Day</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>10:00 - 10:40</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>10:40 - 11:20</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>11:20 - 12:00</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>12:00 - 12:40</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>13:30 - 14:10</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>14:10 - 14:50</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>14:50 - 15:30</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>15:30 - 16:10</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeTableData?.map((row, index) => {
                            let dayName = DAYS[index];
                            return (
                                <TableRow key={index} sx={{ cursor: 'pointer' }} onClick={() => handleEditTimeTable(row, index)}>
                                    <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bold', fontSize: '15px' }}>{dayName}</TableCell>
                                    {row[dayName]?.map((day, i) => (
                                        <TableCell key={i} sx={{ fontFamily: fontFamily }}>
                                            {day.subject_name} <br />
                                            {day.teacher_name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item xs={4} sx={{ textAlign: 'center', mt: 3 }}>
                <Button type="button" variant="outlined" onClick={onCancel} sx={{ fontFamily: fontFamily }}>
                    Close
                </Button>
            </Grid>
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <TimeTableForm
                    onCancel={handleModalClose}
                    handleUpdate={handleUpdate}
                    dayDetail={dayDetail}
                    fontFamily={fontFamily}
                    selectedDay={selectedDay}
                />
            </Dialog>
        </MainCard>
    );
};

export default ShowTimetable;
