import { lazy } from 'react';

// project imports
import RouteGard from 'guard/routeGard';
import Loadable from '../componets/Loadable';
import AuthGuard from '../guard/authGuard';
import MenuLayout from '../menu';

const DashBoard = Loadable(lazy(() => import('../view/dashboard')));
const User = Loadable(lazy(() => import('../view/masters/user')));
const Student = Loadable(lazy(() => import('../view/masters/student')));
const Classes = Loadable(lazy(() => import('../view/masters/classes')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MenuLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/principal-dashboard',
            element: <DashBoard />
        },
        {
            path: '/masters/users',
            element: <RouteGard Component={User} url={'/masters/users'} />
        },
        {
            path: '/masters/students',
            element: <RouteGard Component={Student} url={'/masters/students'} />
        },
        {
            path: '/masters/classes',
            element: <RouteGard Component={Classes} url={'/masters/classes'} />
        }
        // {
        //     path: '/teacher',
        //     element: <RouteGard Component={Student} url={'/teacher'} />
        // },
        // {
        //     path: '/staff',
        //     element: <RouteGard Component={Student} url={'/staff'} />
        // }
    ]
};

export default MainRoutes;
