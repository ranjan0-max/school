require('dotenv').config();

const Menu = require('../Models/menu.model');
const { connection } = require('../connection');
const data = [
    {
        menu_id: 1,
        id: 'master',
        title: 'Masters',
        type: 'group',
        icon: 'widget',
        accesss: false,
        breadcrumbs: false,
        children: [
            {
                id: 'users',
                title: 'User',
                type: 'item',
                icon: 'icon_users',
                url: '/masters/users',
                accesss: false,
                breadcrumbs: false
            },
            {
                id: 'students',
                title: 'Student',
                type: 'item',
                icon: 'icon_student',
                url: '/masters/students',
                accesss: false,
                breadcrumbs: false
            },
            {
                id: 'classes',
                title: 'Classes',
                type: 'item',
                icon: 'icon_class',
                url: '/masters/classes',
                accesss: false,
                breadcrumbs: false
            },
            {
                id: 'teachers',
                title: 'Teachers',
                type: 'item',
                icon: 'icon_teacher',
                url: '/masters/teachers',
                accesss: false,
                breadcrumbs: false
            },
            {
                id: 'staff',
                title: 'Staff',
                type: 'item',
                icon: 'icon_staff',
                url: '/masters/staff',
                accesss: false,
                breadcrumbs: false
            },
            {
                id: 'subjects',
                title: 'Subjects',
                type: 'item',
                icon: 'icon_subject',
                url: '/masters/subjects',
                accesss: false,
                breadcrumbs: false
            }
        ]
    },
    {
        menu_id: 2,
        id: 'salesGroup',
        title: 'Sales',
        type: 'group',
        accesss: false,
        breadcrumbs: false,
        icon: 'icon_reciepts',
        children: [
            {
                id: 'kanban',
                title: 'Kanban',
                type: 'item',
                url: '/sales/enquiryBoard',
                accesss: false,
                icon: 'sales_kanban',
                breadcrumbs: false
            }
        ]
    }
];

const init = async (data) => {
    try {
        console.log('running seeder !');
        connection();
        Menu.deleteMany({}, (error) => {
            if (error) {
                console.log(error);
            }
        });
        console.log('adding seeder record/s !');
        Menu.insertMany(data, (error, docs) => {
            if (error) console.log(error);
            else console.log('DB seed complete');
            process.exit();
        });

        console.log('running seeder !');
    } catch (error) {
        console.log('Error seeding DB :: ', error?.message);
        process.exit();
    }
};

init(data);
