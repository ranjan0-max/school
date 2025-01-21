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
const Teachers = Loadable(lazy(() => import('../view/masters/teacher')));
const Staff = Loadable(lazy(() => import('../view/masters/staff')));
const Subjects = Loadable(lazy(() => import('../view/masters/subject')));

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
        },
        {
            path: '/masters/teachers',
            element: <RouteGard Component={Teachers} url={'/masters/teachers'} />
        },
        {
            path: '/masters/staff',
            element: <RouteGard Component={Staff} url={'/masters/staff'} />
        },
        {
            path: '/masters/subjects',
            element: <RouteGard Component={Subjects} url={'/masters/subjects'} />
        }
    ]
};

export default MainRoutes;
