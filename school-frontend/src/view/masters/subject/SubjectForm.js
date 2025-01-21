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
import { getClasses } from 'api/classes/classesApi';

// project imports
import { gridSpacing } from 'constant/constant';

// constant
const getInitialValues = (event, range, subjectDetail) => {
    const newEvent = {
        name: !event ? subjectDetail?.name : '',
        class_id: !event ? subjectDetail?.class_id : []
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const SubjectForm = ({ event, range, handleCreate, handleUpdate, onCancel, subjectDetail }) => {
    const { openTostar, SnackbarComponent } = useSnackbarAlert();
    const [classList, setClassList] = useState([]);

    const fetchClasses = async () => {
        try {
            const response = await getClasses();
            if (typeof response === 'string') {
                openTostar(response, 'error');
            } else {
                setClassList(response);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // validation
    const EventSchema = Yup.object().shape({
        name: Yup.string().max(50, 'Name must be less than or equal to 50 characters').required('This is required'),
        class_id: Yup.array().required('This is required')
    });

    // submit form
    const formik = useFormik({
        initialValues: getInitialValues(event, range, subjectDetail),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = values;
                if (event) {
                    handleCreate(data);
                } else {
                    handleUpdate(subjectDetail._id, data);
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
            <SnackbarComponent />
            <LocalizationProvider>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <DialogTitle>{event ? 'Add Subject' : 'Edit Subject'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Name</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('name')}
                                    onChange={(e) => formik.setFieldValue('name', e.target.value.toUpperCase())}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Class</Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('class_id')}
                                    error={Boolean(touched.class_id && errors.class_id)}
                                    helperText={touched.class_id && errors.class_id}
                                    SelectProps={{
                                        multiple: true,
                                        value: values.class_id || [],
                                        onChange: (event) => {
                                            const value = event.target.value;
                                            formik.setFieldValue('class_id', typeof value === 'string' ? value.split(',') : value);
                                        },
                                        renderValue: (selected) =>
                                            selected
                                                .map((id) => {
                                                    const classItem = classList.find((item) => item._id === id);
                                                    return classItem ? classItem.class_name : '';
                                                })
                                                .join(', ')
                                    }}
                                >
                                    {classList.length ? (
                                        classList.map((classItem) => (
                                            <MenuItem key={classItem._id} value={classItem._id}>
                                                {classItem.class_name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>NO CLASS FOUND</MenuItem>
                                    )}
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

SubjectForm.propTypes = {
    event: PropTypes.bool,
    range: PropTypes.object,
    handleDelete: PropTypes.func,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export default SubjectForm;
