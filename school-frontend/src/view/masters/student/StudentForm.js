import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
import { gridSpacing } from 'constant/constant';

//api
import { getClasses } from 'api/classes/classesApi';

// constant
const getInitialValues = (event, range, studentDetail) => {
    const newEvent = {
        name: !event ? studentDetail?.name : '',
        gender: !event ? studentDetail?.gender : '',
        current_class: !event ? studentDetail?.current_class : '',
        class_roll_no: !event ? studentDetail?.class_roll_no : '',
        dob: !event ? studentDetail?.dob : '',
        email: !event ? studentDetail?.email : '',
        father_name: !event ? studentDetail?.father_name : '',
        father_cnt_number: !event ? studentDetail?.father_cnt_number : '',
        mother_name: !event ? studentDetail?.mother_name : '',
        mother_cnt_number: !event ? studentDetail?.mother_cnt_number : '',
        address: !event ? studentDetail?.address : ''
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const StudentForm = ({ event, range, handleCreate, handleUpdate, onCancel, studentDetail }) => {
    const [classList, setClassList] = useState([]);

    // fecth classes
    const fetchClasses = async () => {
        try {
            const response = await getClasses();
            if (typeof response === 'string') {
                console.log(response);
            } else {
                setClassList(response);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // validation
    const EventSchema = Yup.object().shape({
        name: Yup.string().max(50, 'Name must be less than or equal to 255 characters').required('Name is required'),
        gender: Yup.string().required('Gender is required'),
        current_class: Yup.string().required('Class Is Required'),
        class_roll_no: Yup.number().typeError('Class Roll No must be a number'),
        dob: Yup.date().required('Date is required'),
        email: Yup.string().email('Invalid email address'),
        father_name: Yup.string().max(50, 'Name must be less than or equal to 50 characters').required('Father Name is required'),
        father_cnt_number: Yup.string().test('valid-phone', 'Number must be 10 digits and contain only numbers', (value) => {
            if (!value) return true;
            if (value.length !== 10) return false;
            return /^[0-9]+$/.test(value);
        }),
        mother_name: Yup.string().max(50, 'Name must be less than or equal to 50 characters').required('Mother Name is required'),
        mother_cnt_number: Yup.string().test('valid-phone', 'Number must be 10 digits and contain only numbers', (value) => {
            if (!value) return true;
            if (value.length !== 10) return false;
            return /^[0-9]+$/.test(value);
        }),
        address: Yup.string().max(50, 'Name must be less than or equal to 255 characters').required('Address is required')
    });

    // submit form
    const formik = useFormik({
        initialValues: getInitialValues(event, range, studentDetail),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = values;
                if (event) {
                    handleCreate(data);
                } else {
                    handleUpdate(studentDetail._id, data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    React.useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <FormikProvider value={formik}>
            <LocalizationProvider>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <DialogTitle>{event ? 'Add Student' : 'Edit Student'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Name</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Gender</Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('gender')}
                                    error={Boolean(touched.gender && errors.gender)}
                                    helperText={touched.gender && errors.gender}
                                >
                                    <MenuItem value="MALE">MALE</MenuItem>
                                    <MenuItem value="FEMALE">FEMALE</MenuItem>
                                    <MenuItem value="OTHER">OTHER</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Current Class</Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('current_class')}
                                    error={Boolean(touched.current_class && errors.current_class)}
                                    helperText={touched.current_class && errors.current_class}
                                >
                                    {classList.length ? (
                                        classList.map((subject) => (
                                            <MenuItem key={subject._id} value={subject._id}>
                                                {subject.class_name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>NO CLASS FOUND</MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Class Roll No</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_roll_no')}
                                    error={Boolean(touched.class_roll_no && errors.class_roll_no)}
                                    helperText={touched.class_roll_no && errors.class_roll_no}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">DOB</Typography>
                                <TextField
                                    size="small"
                                    type="date"
                                    fullWidth
                                    {...getFieldProps('dob')}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    error={Boolean(touched.dob && errors.dob)}
                                    helperText={touched.dob && errors.dob}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Email</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('email')}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Father Name</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('father_name')}
                                    error={Boolean(touched.father_name && errors.father_name)}
                                    helperText={touched.father_name && errors.father_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Father Phone Number</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('father_cnt_number')}
                                    error={Boolean(touched.father_cnt_number && errors.father_cnt_number)}
                                    helperText={touched.father_cnt_number && errors.father_cnt_number}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Mother Name</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('mother_name')}
                                    error={Boolean(touched.mother_name && errors.mother_name)}
                                    helperText={touched.mother_name && errors.mother_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Mother Phone Number</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('mother_cnt_number')}
                                    error={Boolean(touched.mother_cnt_number && errors.mother_cnt_number)}
                                    helperText={touched.mother_cnt_number && errors.mother_cnt_number}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Address</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('address')}
                                    error={Boolean(touched.address && errors.address)}
                                    helperText={touched.address && errors.address}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button type="button" variant="outlined" onClick={onCancel}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
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

StudentForm.propTypes = {
    event: PropTypes.bool,
    range: PropTypes.object,
    handleDelete: PropTypes.func,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export default StudentForm;
