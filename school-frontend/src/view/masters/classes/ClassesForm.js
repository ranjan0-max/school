import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

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
        class_subjects: !event ? classDetail?.class_subjects : '',
        class_room_no: !event ? classDetail?.class_room_no : '',
        class_equipments: !event ? classDetail?.class_equipments : ''
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const ClassesForm = ({ event, range, handleCreate, handleUpdate, onCancel, classDetail }) => {
    // validation
    const EventSchema = Yup.object().shape({
        class_name: Yup.string().max(30, 'Class Name must be less than or equal to 30 characters').required('This is required'),
        total_strength: Yup.number().required('This feild is required'),
        total_student_capacity: Yup.number().required('This feild is Required'),
        class_teacher: Yup.string().required('This feild is required'),
        class_subjects: Yup.array().required('This feild is required'),
        class_room_no: Yup.number().required('This feild is required'),
        class_equipments: Yup.array().required('This feild is required')
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
                    handleUpdate(classDetail.id, data);
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
                    <DialogTitle>{event ? 'Add Class' : 'Edit Class'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Class Name</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_name')}
                                    error={Boolean(touched.class_name && errors.class_name)}
                                    helperText={touched.class_name && errors.class_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Total Strength</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('total_strength')}
                                    error={Boolean(touched.total_strength && errors.total_strength)}
                                    helperText={touched.total_strength && errors.total_strength}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Total Class Capacity</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('total_student_capacity')}
                                    error={Boolean(touched.total_student_capacity && errors.total_student_capacity)}
                                    helperText={touched.total_student_capacity && errors.total_student_capacity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Class Teacher</Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_teacher')}
                                    error={Boolean(touched.class_teacher && errors.class_teacher)}
                                    helperText={touched.class_teacher && errors.class_teacher}
                                >
                                    <MenuItem value="FEMALE">FEMALE</MenuItem>
                                    <MenuItem value="OTHER">OTHER</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Subjects</Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_subjects')}
                                    error={Boolean(touched.class_subjects && errors.class_subjects)}
                                    helperText={touched.class_subjects && errors.class_subjects}
                                >
                                    <MenuItem value="FEMALE">FEMALE</MenuItem>
                                    <MenuItem value="OTHER">OTHER</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Room Number</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_room_no')}
                                    error={Boolean(touched.class_room_no && errors.class_room_no)}
                                    helperText={touched.class_room_no && errors.class_room_no}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Equipments</Typography>
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

ClassesForm.propTypes = {
    event: PropTypes.bool,
    range: PropTypes.object,
    handleDelete: PropTypes.func,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export default ClassesForm;
