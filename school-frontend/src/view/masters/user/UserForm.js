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
        user_id: !event ? userDetail?.user_id : '',
        password: '',
        formEvent: event,
        role: !event ? userDetail?.role_id : ''
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const UserForm = ({ event, range, handleCreate, handleUpdate, onCancel, userDetail, fontFamily }) => {
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
        user_id: Yup.string().required('User Id is required'),
        formEvent: Yup.boolean(),
        password: Yup.string().when('formEvent', {
            is: true, // Only required when formEvent is true
            then: (schema) => schema.required('Password is required'),
            otherwise: (schema) => schema.notRequired() // Explicitly not required
        }),
        role: Yup.string().required('Role Is Required')
    });

    // submit form
    const formik = useFormik({
        initialValues: getInitialValues(event, range, userDetail),
        validationSchema: EventSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = values;
                if (event) {
                    handleCreate(data);
                } else {
                    handleUpdate(userDetail._id, data);
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
                    <DialogTitle style={{ fontFamily: fontFamily }}>{event ? 'Add User' : 'Edit User'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    User Id
                                </Typography>
                                <TextField
                                    sx={{
                                        fontFamily: fontFamily
                                    }}
                                    size="small"
                                    autoComplete="off"
                                    fullWidth
                                    {...getFieldProps('user_id')}
                                    error={Boolean(touched.user_id && errors.user_id)}
                                    helperText={touched.user_id && errors.user_id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Password
                                </Typography>
                                <TextField
                                    sx={{
                                        fontFamily: fontFamily
                                    }}
                                    size="small"
                                    autoComplete="off"
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
                                <Typography marginBottom="5px" fontFamily={fontFamily}>
                                    Role
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
                                    {...getFieldProps('role')}
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                >
                                    {roleList.map((option) => (
                                        <MenuItem sx={{ fontFamily: fontFamily }} key={option._id} value={option._id}>
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
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={onCancel}
                                        sx={{
                                            fontFamily: fontFamily
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                        sx={{
                                            fontFamily: fontFamily
                                        }}
                                    >
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
