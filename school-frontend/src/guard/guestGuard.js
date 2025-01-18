import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../customHook/useAuth';

// api
import { getRole } from '../api/role/roleApi';

const GuestGuard = ({ children }) => {
    // const { menu } = useSelector((state) => state.menu);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [userRole, setUserRole] = React.useState('');

    const fetchRoleById = async () => {
        try {
            const response = await getRole({ id: user.role });
            if (typeof response === 'string') {
                console.log(response);
            } else {
                if (response?.[0].role) {
                    setUserRole(response?.[0].role);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userRole) {
            if (isAuthenticated) {
                if (userRole === 'PRINCIPAL') {
                    navigate('/principal-dashboard');
                }
            } else {
                navigate('/');
            }
        }
    }, [isAuthenticated, user, navigate, userRole]);

    useEffect(() => {
        if (user) {
            fetchRoleById();
        }
    }, [user]);

    return children;
};

export default GuestGuard;
