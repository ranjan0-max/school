import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
import { gridSpacing } from 'constant/constant';

// constant
const getInitialValues = (event, range, teacherDetail) => {
    const newEvent = {
        name: !event ? teacherDetail?.name : '',
        dob: !event ? teacherDetail?.dob?.split('T')[0] : '',
        gender: !event ? teacherDetail?.gender : '',
        email: !event ? teacherDetail?.email : '',
        date_of_joining: !event ? teacherDetail?.date_of_joining?.split('T')[0] : '',
        subject: !event ? teacherDetail?.subject : [],
        father_name: !event ? teacherDetail?.father_name : '',
        contact_number: !event ? teacherDetail?.contact_number : '',
        mother_name: !event ? teacherDetail?.mother_name : '',
        address: !event ? teacherDetail?.address : '',
        today_presence: !event ? teacherDetail?.today_presence : '',
        remark: !event ? teacherDetail?.remark : ''
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const TeacherForm = ({ event, range, handleCreate, handleUpdate, onCancel, teacherDetail, fontFamily }) => {
    // validation
    const EventSchema = Yup.object().shape({
        name: Yup.string().max(50, 'Name must be less than or equal to 255 characters').required('This is required'),
        dob: Yup.date().required('This is required'),
        gender: Yup.string().required('This is required'),
        email: Yup.string().email('Invalid email address'),
        date_of_joining: Yup.date().required('This is required'),
        subject: Yup.array().required('This is required'),
        father_name: Yup.string().max(50, 'Name must be less than or equal to 50 characters').required('This is required'),
        contact_number: Yup.string().test('valid-phone', 'Number must be 10 digits and contain only numbers', (value) => {
            if (!value) return true;
            if (value.length !== 10) return false;
            return /^[0-9]+$/.test(value);
        }),
        mother_name: Yup.string().max(50, 'Name must be less than or equal to 50 characters').required('Thisis required'),
        address: Yup.string().max(100, 'Address must be less than or equal to 100 characters').required('This is required'),
        today_presence: Yup.boolean().required('This is required')
    });

    // submit form
    const formik = useFormik({
        initialValues: getInitialValues(event, range, teacherDetail),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = values;
                if (event) {
                    handleCreate(data);
                } else {
                    handleUpdate(teacherDetail._id, data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <LocalizationProvider>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <DialogTitle>{event ? 'Add Teacher' : 'Edit Teacher'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Name
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    sx={{
                                        fontFamily: fontFamily
                                    }}
                                    fullWidth
                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Gender
                                </Typography>
                                <TextField
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('gender')}
                                    error={Boolean(touched.gender && errors.gender)}
                                    helperText={touched.gender && errors.gender}
                                >
                                    <MenuItem sx={{ fontFamily: fontFamily }} value="MALE">
                                        MALE
                                    </MenuItem>
                                    <MenuItem sx={{ fontFamily: fontFamily }} value="FEMALE">
                                        FEMALE
                                    </MenuItem>
                                    <MenuItem sx={{ fontFamily: fontFamily }} value="OTHER">
                                        OTHER
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    DOB
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
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
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Email
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    sx={{
                                        fontFamily: fontFamily
                                    }}
                                    fullWidth
                                    {...getFieldProps('email')}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    D.O Joining
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    type="date"
                                    fullWidth
                                    {...getFieldProps('date_of_joining')}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    error={Boolean(touched.date_of_joining && errors.date_of_joining)}
                                    helperText={touched.date_of_joining && errors.date_of_joining}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Subjects
                                </Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('subject')}
                                    SelectProps={{
                                        multiple: true, // Enable multiple selection
                                        value: values.subject || [], // Ensure value is an array
                                        onChange: (event) => {
                                            const value = event.target.value;
                                            formik.setFieldValue('subject', typeof value === 'string' ? value.split(',') : value);
                                        },
                                        renderValue: (selected) => selected.join(', ') // Customize how the selected values are displayed
                                    }}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    error={Boolean(touched.subject && errors.subject)}
                                    helperText={touched.subject && errors.subject}
                                >
                                    <MenuItem sx={{ fontFamily: fontFamily }} value="SCIENCE">
                                        SCIENCE
                                    </MenuItem>
                                    <MenuItem sx={{ fontFamily: fontFamily }} value="MATH">
                                        MATH
                                    </MenuItem>
                                    <MenuItem sx={{ fontFamily: fontFamily }} value="OTHER">
                                        OTHER
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Father Name
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    fullWidth
                                    {...getFieldProps('father_name')}
                                    error={Boolean(touched.father_name && errors.father_name)}
                                    helperText={touched.father_name && errors.father_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Contact Number
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    sx={{
                                        fontFamily: fontFamily
                                    }}
                                    fullWidth
                                    {...getFieldProps('contact_number')}
                                    error={Boolean(touched.contact_number && errors.contact_number)}
                                    helperText={touched.contact_number && errors.contact_number}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Mother Name
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    fullWidth
                                    {...getFieldProps('mother_name')}
                                    error={Boolean(touched.mother_name && errors.mother_name)}
                                    helperText={touched.mother_name && errors.mother_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Address
                                </Typography>
                                <TextField
                                    size="small"
                                    inputProps={{
                                        style: {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                    fullWidth
                                    {...getFieldProps('address')}
                                    error={Boolean(touched.address && errors.address)}
                                    helperText={touched.address && errors.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Today Presence
                                </Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('today_presence')}
                                    error={Boolean(touched.today_presence && errors.today_presence)}
                                    helperText={touched.today_presence && errors.today_presence}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontFamily: fontFamily
                                        }
                                    }}
                                >
                                    <MenuItem sx={{ fontFamily: fontFamily }} value={true}>
                                        YES
                                    </MenuItem>
                                    <MenuItem sx={{ fontFamily: fontFamily }} value={false}>
                                        NO
                                    </MenuItem>
                                </TextField>
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

TeacherForm.propTypes = {
    event: PropTypes.bool,
    range: PropTypes.object,
    handleDelete: PropTypes.func,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export default TeacherForm;
