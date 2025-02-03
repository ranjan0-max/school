import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useSnackbarAlert from 'customHook/alert';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// third-party

// apis
import { getStudentNameListOfAttendance } from 'api/attendance/attendanceApi';

// project imports
import MainCard from 'componets/MainCard';

const ClassAttendanceDetail = ({ onCancel, detail, fontFamily }) => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();
    const [absentStudentList, setAbsentStudentList] = useState([]);
    const [presentStudentList, setPresentStudentList] = useState([]);

    const fetchStudentNames = async () => {
        try {
            const query = {
                absent_student_list: detail.absent_students_list,
                present_student_list: detail.present_students_list
            };
            const response = await getStudentNameListOfAttendance(query);
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setAbsentStudentList(response.absent_student);
                setPresentStudentList(response.present_student);
            }
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        if (detail) {
            fetchStudentNames();
        }
    }, [detail]);

    return (
        <MainCard
            border={true}
            title={
                <Typography variant="h5" color="white" fontWeight="bold" fontFamily={fontFamily}>
                    Attendance Detail of {detail?.class}
                </Typography>
            }
        >
            <Grid container spacing={2}>
                {/* Present Students Table */}
                <Grid item xs={6}>
                    <TableContainer component={Paper} sx={{ border: 'solid black 1px', maxHeight: 300, overflow: 'auto' }}>
                        <Table stickyHeader sx={{ minWidth: 300 }} aria-label="present students table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder', backgroundColor: '#d8d8d8' }}>
                                        PRESENT
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {presentStudentList.map((name, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontFamily: fontFamily }}>{name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Absent Students Table */}
                <Grid item xs={6}>
                    <TableContainer component={Paper} sx={{ border: 'solid black 1px', maxHeight: 300, overflow: 'auto' }}>
                        <Table stickyHeader sx={{ minWidth: 300 }} aria-label="absent students table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#e5e1e1' }}>
                                    <TableCell sx={{ fontFamily: fontFamily, fontWeight: 'bolder', backgroundColor: '#d8d8d8' }}>
                                        ABSENT
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {absentStudentList.map((name, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontFamily: fontFamily }}>{name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </MainCard>
    );
};

ClassAttendanceDetail.propTypes = {
    onCancel: PropTypes.func
};

export default ClassAttendanceDetail;
