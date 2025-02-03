import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useSnackbarAlert from 'customHook/alert';
import PropTypes from 'prop-types';

// third-party

// api
import { getSubjects } from 'api/subject/subjectApi';
import { getTeachers } from 'api/teacher/teacherApi';

// project imports
import { gridSpacing } from 'constant/constant';
import React, { useState } from 'react';

const TimeTableForm = ({ handleUpdate, onCancel, dayDetail, fontFamily, selectedDay }) => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();
    const [teacherList, setTeacherList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [day, setDay] = useState('');
    const [selectedDayDetail, setSelectedDayDetail] = useState([]);

    const fetchTeachers = async () => {
        try {
            const response = await getTeachers();
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setTeacherList(response);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await getSubjects();
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setSubjectList(response);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // submit form
    const updateTimeTable = () => {
        handleUpdate({ [day]: selectedDayDetail });
    };

    const handleSubjectValueChange = (e, index) => {
        const updatedData = selectedDayDetail.map((slot, i) => (i === index ? { ...slot, subject: e.target.value } : slot));
        setSelectedDayDetail(updatedData);
    };

    const handleTeacherValueChange = (e, index) => {
        const updatedData = selectedDayDetail.map((slot, i) => (i === index ? { ...slot, teacher: e.target.value } : slot));
        setSelectedDayDetail(updatedData);
    };

    React.useEffect(() => {
        fetchTeachers();
        fetchSubjects();
        setDay(selectedDay);
    }, []);

    React.useEffect(() => {
        if (day) {
            setSelectedDayDetail(dayDetail[day]);
        }
    }, [day]);

    return (
        <>
            <SnackbarComponent />
            <LocalizationProvider>
                <>
                    <DialogTitle sx={{ fontFamily: fontFamily }}>Update Time Table</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={gridSpacing}>
                            <Typography marginBottom="5px" fontFamily={fontFamily}>
                                {day}
                            </Typography>
                            {selectedDayDetail?.map((slot, index) => (
                                <Grid container item xs={12} key={`${slot.time}-${slot.subject}`} spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography marginBottom="5px" fontFamily={fontFamily}>
                                            {slot.time}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            select
                                            size="small"
                                            fullWidth
                                            label="Subject"
                                            value={slot.subject}
                                            onChange={(e) => handleSubjectValueChange(e, index)}
                                            sx={{ mb: 2 }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {subjectList.map((subject) => (
                                                <MenuItem key={subject._id} value={subject._id}>
                                                    {subject.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            select
                                            size="small"
                                            fullWidth
                                            label="Teacher"
                                            value={slot.teacher}
                                            onChange={(e) => handleTeacherValueChange(e, index)}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {teacherList.map((teacher) => (
                                                <MenuItem key={teacher._id} value={teacher._id}>
                                                    {teacher.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button type="button" variant="outlined" onClick={onCancel} sx={{ fontFamily: fontFamily }}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" sx={{ fontFamily: fontFamily }} onClick={updateTimeTable}>
                                        Save
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </>
            </LocalizationProvider>
        </>
    );
};

TimeTableForm.propTypes = {
    event: PropTypes.bool,
    range: PropTypes.object,
    handleDelete: PropTypes.func,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export default TimeTableForm;
