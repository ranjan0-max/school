import { lazy, useEffect, useState } from 'react';
import Loadable from '../componets/Loadable';
import useAuth from '../customHook/useAuth';

// Lazy-load the dashboard component
const DashBoard = Loadable(lazy(() => import('../view/defaultDashboard')));

// Function to return the correct dashboard component based on role
const checkUserRole = (user) => {
    switch (user?.role?.role) {
        case 'PRINCIPAL':
            return <DashBoard />;
        case 'TEACHER':
            return <div>Teacher Dashboard</div>;
        case 'STAFF':
            return <div>Staff Dashboard</div>;
        case 'STUDENT':
            return <div>Student Dashboard</div>;
        default:
            return <div>No Access</div>;
    }
};

const CheckUserDashBoard = () => {
    const { isAuthenticated, user } = useAuth();
    const [dashboardComponent, setDashboardComponent] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            setDashboardComponent(checkUserRole(user));
        }
    }, [isAuthenticated, user]);

    if (!isAuthenticated) return <div>Loading...</div>;

    return dashboardComponent;
};

export default CheckUserDashBoard;
