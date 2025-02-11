import { lazy } from 'react';

// project imports
import CheckUserDashBoard from 'guard/checkUserDashBoard';
import RouteGard from 'guard/routeGard';
import Loadable from '../componets/Loadable';
import AuthGuard from '../guard/authGuard';
import MenuLayout from '../menu';

const DashBoard = Loadable(lazy(() => import('../view/defaultDashboard')));
// masters
const User = Loadable(lazy(() => import('../view/masters/user')));
const Student = Loadable(lazy(() => import('../view/masters/student')));
const Classes = Loadable(lazy(() => import('../view/masters/classes')));
const Teachers = Loadable(lazy(() => import('../view/masters/teacher')));
const Staff = Loadable(lazy(() => import('../view/masters/staff')));
const Subjects = Loadable(lazy(() => import('../view/masters/subject')));
// operations components
const Attendance = Loadable(lazy(() => import('../view/operations/attendance')));
const TimeTable = Loadable(lazy(() => import('../view/operations/timeTable')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MenuLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard',
            element: <CheckUserDashBoard />
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
        },
        {
            path: '/operations/attendance',
            element: <RouteGard Component={Attendance} url={'/operations/attendance'} />
        },
        {
            path: '/operations/timeTable',
            element: <RouteGard Component={TimeTable} url={'/operations/timeTable'} />
        }
    ]
};

export default MainRoutes;
