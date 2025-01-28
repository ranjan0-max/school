import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useSnackbarAlert from 'customHook/alert';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// apis
import { getSubjects } from 'api/subject/subjectApi';
import { getTeachers } from 'api/teacher/teacherApi';

// project imports
import { gridSpacing } from 'constant/constant';

//icons

// constant
const getInitialValues = (event, range, classDetail) => {
    const newEvent = {
        class_name: !event ? classDetail?.class_name : '',
        total_strength: !event ? classDetail?.total_strength : '',
        total_student_capacity: !event ? classDetail?.total_student_capacity : '',
        class_teacher: !event ? classDetail?.class_teacher : '',
        class_subjects: !event ? classDetail?.class_subjects : [],
        class_room_no: !event ? classDetail?.class_room_no : ''
        // class_equipments: !event ? classDetail?.class_equipments : ''
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const ClassesForm = ({ event, range, handleCreate, handleUpdate, onCancel, classDetail, fontFamily }) => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();
    const [teacherList, setTeacherList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    // fetch teacher list
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

    // fetch subject list
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

    // validation
    const EventSchema = Yup.object().shape({
        class_name: Yup.string().max(30, 'Class Name must be less than or equal to 30 characters').required('This is required'),
        total_strength: Yup.number().required('This feild is required'),
        total_student_capacity: Yup.number().required('This feild is Required'),
        class_teacher: Yup.string().required('This feild is required'),
        class_subjects: Yup.array().required('This feild is required'),
        class_room_no: Yup.number().required('This feild is required')
        // class_equipments: Yup.array().required('This feild is required')
    });

    // submit form
    const formik = useFormik({
        initialValues: getInitialValues(event, range, classDetail),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = values;
                if (event) {
                    handleCreate(data);
                } else {
                    handleUpdate(classDetail._id, data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    React.useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchTeachers();
            fetchSubjects();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <FormikProvider value={formik}>
            <SnackbarComponent />
            <LocalizationProvider>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontFamily: fontFamily }}>{event ? 'Add Class' : 'Edit Class'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Class Name
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_name')}
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    onChange={(e) => formik.setFieldValue('class_name', e.target.value.toUpperCase())}
                                    error={Boolean(touched.class_name && errors.class_name)}
                                    helperText={
                                        touched.class_name && errors.class_name ? (
                                            <span
                                                style={{
                                                    fontFamily: fontFamily,
                                                    fontSize: '12px',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.class_name}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Total Strength
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('total_strength')}
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    error={Boolean(touched.total_strength && errors.total_strength)}
                                    helperText={
                                        touched.total_strength && errors.total_strength ? (
                                            <span
                                                style={{
                                                    fontFamily: fontFamily,
                                                    fontSize: '12px',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.total_strength}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Total Class Capacity
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('total_student_capacity')}
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    error={Boolean(touched.total_student_capacity && errors.total_student_capacity)}
                                    helperText={
                                        touched.total_student_capacity && errors.total_student_capacity ? (
                                            <span
                                                style={{
                                                    fontFamily: fontFamily,
                                                    fontSize: '12px',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.total_student_capacity}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Class Teacher
                                </Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_teacher')}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    error={Boolean(touched.class_teacher && errors.class_teacher)}
                                    helperText={
                                        touched.class_teacher && errors.class_teacher ? (
                                            <span
                                                style={{
                                                    fontFamily: fontFamily,
                                                    fontSize: '12px',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.class_teacher}
                                            </span>
                                        ) : null
                                    }
                                >
                                    {teacherList.length ? (
                                        teacherList.map((option) => (
                                            <MenuItem key={option._id} value={option._id} sx={{ fontFamily: fontFamily }}>
                                                {option.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>NO CLASS FOUND</MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Subjects
                                </Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_subjects')}
                                    error={Boolean(touched.class_subjects && errors.class_subjects)}
                                    helperText={
                                        touched.class_subjects && errors.class_subjects ? (
                                            <span
                                                style={{
                                                    fontFamily: fontFamily,
                                                    fontSize: '12px',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.class_subjects}
                                            </span>
                                        ) : null
                                    }
                                    SelectProps={{
                                        multiple: true,
                                        value: values.class_subjects || [],
                                        onChange: (event) => {
                                            const value = event.target.value;
                                            formik.setFieldValue('class_subjects', typeof value === 'string' ? value.split(',') : value);
                                        },
                                        renderValue: (selected) =>
                                            selected
                                                .map((id) => {
                                                    const subject = subjectList.find((item) => item._id === id);
                                                    return subject ? subject.name : '';
                                                })
                                                .join(', ')
                                    }}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                >
                                    {subjectList.length ? (
                                        subjectList.map((subject) => (
                                            <MenuItem key={subject._id} value={subject._id} sx={{ fontFamily: fontFamily }}>
                                                {subject.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>NO CLASS FOUND</MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Room Number
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_room_no')}
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    error={Boolean(touched.class_room_no && errors.class_room_no)}
                                    helperText={
                                        touched.class_room_no && errors.class_room_no ? (
                                            <span
                                                style={{
                                                    fontFamily: fontFamily,
                                                    fontSize: '12px',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.class_room_no}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>Equipments</Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_equipments')}
                                    error={Boolean(touched.class_equipments && errors.class_equipments)}
                                    helperText={touched.class_equipments && errors.class_equipments}
                                >
                                    <MenuItem value="FEMALE">FEMALE</MenuItem>
                                    <MenuItem value="OTHER">OTHER</MenuItem>
                                </TextField>
                            </Grid> */}
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button type="button" variant="outlined" onClick={onCancel} sx={{ fontFamily: fontFamily }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ fontFamily: fontFamily }}>
                                        {!event ? 'Update' : 'Save'}
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Form>
            </LocalizationProvider>
        </FormikProvider>
    );
};

ClassesForm.propTypes = {
    event: PropTypes.bool,
    range: PropTypes.object,
    handleDelete: PropTypes.func,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export default ClassesForm;
