import {
    Button,
    Dialog,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import useSnackbarAlert from 'customHook/alert';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// modal
import ClassAttendanceDetail from './ClassAttendanceDetail';

// third-party
import { LocalizationProvider } from '@mui/x-date-pickers';

// custom component
import MainCard from 'componets/MainCard';

// api
import { getAttendanceHistory } from 'api/attendance/attendanceApi';

// icons
import PreviewIcon from '@mui/icons-material/Preview';
const AttendanceHistory = ({ onCancel, attendanceDetail, fontFamily }) => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState(new Date(Date.now()));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detail, setDetail] = useState({});

    const fetchClassAttendance = async () => {
        try {
            const dateObj = new Date(date);

            const query = {
                date: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0, 0),
                class_id: attendanceDetail?._id
            };
            const response = await getAttendanceHistory(query);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setRows(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // close the model
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // open modal
    const openDetailModal = async (row) => {
        setDetail(row);
        setIsModalOpen(true);
    };

    React.useEffect(() => {
        if (date) {
            fetchClassAttendance();
        }
    }, [date]);

    return (
        <MainCard
            border={true}
            title={
                <Typography variant="h5" color="white" fontWeight="bold" fontFamily={fontFamily}>
                    Attendance history of {attendanceDetail?.class}
                </Typography>
            }
        >
            <SnackbarComponent />
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={8}>
                    <LocalizationProvider>
                        <TextField
                            size="small"
                            type="date"
                            label="Date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            InputLabelProps={{
                                shrink: true,
                                style: {
                                    fontFamily: fontFamily
                                }
                            }}
                            InputProps={{
                                sx: {
                                    fontFamily: fontFamily
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Button type="button" variant="outlined" onClick={onCancel} sx={{ fontFamily: fontFamily }}>
                        Back
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 3, border: 'solid black 1px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#d8d8d8' }}>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder' }}>CLASS</TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder' }} align="right">
                                TOTAL
                            </TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder' }} align="right">
                                PRESENT
                            </TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder' }} align="right">
                                ABSENT
                            </TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder' }} align="right">
                                CLASS TEACHER
                            </TableCell>
                            <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder' }} align="right">
                                ACTION
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.class} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" sx={{ fontFamily: fontFamily }}>
                                    {row?.class}
                                </TableCell>
                                <TableCell align="right" sx={{ fontFamily: fontFamily }}>
                                    {row?.total_student_count}
                                </TableCell>
                                <TableCell align="right" sx={{ fontFamily: fontFamily }}>
                                    {row?.present_students_count}
                                </TableCell>
                                <TableCell align="right" sx={{ fontFamily: fontFamily }}>
                                    {row?.absent_students_count}
                                </TableCell>
                                <TableCell align="right" sx={{ fontFamily: fontFamily }}>
                                    {row?.class_teacher}
                                </TableCell>
                                <TableCell align="right" sx={{ fontFamily: fontFamily }}>
                                    <Tooltip title="See Details" onClick={() => openDetailModal(row)}>
                                        <PreviewIcon fontSize="small" sx={{ color: '#1a9ab4', cursor: 'pointer' }} />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog maxWidth="md" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                <ClassAttendanceDetail fontFamily={fontFamily} onCancel={handleModalClose} detail={detail} />
            </Dialog>
        </MainCard>
    );
};

AttendanceHistory.propTypes = {
    onCancel: PropTypes.func
};

export default AttendanceHistory;
