import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
import { gridSpacing } from 'constant/constant';

//icons
import { Visibility, VisibilityOff } from '@mui/icons-material';

// api
import { getRole } from 'api/role/roleApi';

// constant
const getInitialValues = (event, range, userDetail) => {
    const newEvent = {
        name: !event ? userDetail?.name : '',
        userId: !event ? userDetail?.userId : '',
        phoneNumber: !event ? userDetail?.phoneNumber : '',
        password: '',
        formEvent: event,
        role: !event ? userDetail?.role : ''
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const UserForm = ({ event, range, handleCreate, handleUpdate, onCancel, userDetail, itemList }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [roleList, setRoleList] = useState([]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // fetch roles
    const fetchRoles = async () => {
        try {
            const response = await getRole();
            if (typeof response === 'string') {
                console.log(response);
            } else {
                setRoleList(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // validation
    const EventSchema = Yup.object().shape({
        name: Yup.string().max(50, 'Name must be less than or equal to 255 characters').required('Name is required'),
        phoneNumber: Yup.string().test('valid-phone', 'Number must be 10 number and cotains only numbers', (value) => {
            if (!value) return false;
            if (value.length < 10 || value.length > 10) return false;
            return /^[0-9]+$/.test(value);
        }),
        userId: Yup.string().required('User Id is required'),
        formEvent: Yup.boolean(),
        password: Yup.string().when('formEvent', {
            is: true, // Only required when formEvent is true
            then: (schema) => schema.required('Password is required'),
            otherwise: (schema) => schema.notRequired() // Explicitly not required
        }),
        role: Yup.number().required('Role Is Required')
    });

    // submit form
    const formik = useFormik({
        initialValues: getInitialValues(event, range, userDetail),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = values;
                if (event) {
                    handleCreate(data);
                } else {
                    handleUpdate(userDetail.id, data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    React.useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <FormikProvider value={formik}>
            <LocalizationProvider>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <DialogTitle>{event ? 'Add User' : 'Edit User'}</DialogTitle>
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
                                <Typography marginBottom="5px">User Id</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('userId')}
                                    error={Boolean(touched.userId && errors.userId)}
                                    helperText={touched.userId && errors.userId}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Password</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('password')}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                    type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Phone Number</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('phoneNumber')}
                                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px">Role</Typography>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    {...getFieldProps('role')}
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                >
                                    {roleList.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.role}
                                        </MenuItem>
                                    ))}
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

UserForm.propTypes = {
    event: PropTypes.bool,
    range: PropTypes.object,
    handleDelete: PropTypes.func,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export default UserForm;
