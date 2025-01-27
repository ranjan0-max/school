const mongoose = require('mongoose');
require('dotenv').config();
const DB = require('../../Helpers/crud.helper');
const { connection } = require('../connection');
const { IST } = require('../../Helpers/dateTime.helper');
const AuthHelper = require('../../Helpers/auth.helper');
const Logger = require('../../Helpers/logger');

const User = require('../Models/user.model');
const UserConfig = require('../Models/userConfig.model');
const Role = require('../Models/role.model');
// seeder data here

const data = [
    {
        user_id: 'principal',
        userId: 'principal',
        password: 'secret',
        role: '',
        active_status: true,
        config_status: true,
        created_at: IST(),
        updated_at: IST()
    }
];

const init = async (data) => {
    try {
        connection();
        const role = await DB.readOne(Role, { role: 'PRINCIPAL' });
        data[0].role = role._id;
        data[0].password = await AuthHelper.generateHash(data[0].password);
        User.deleteMany({}, (error) => {
            if (error) {
                console.log(error);
            }
        });

        let user = await DB.create(User, data[0]);
        console.log(user);

        const configData = [
            {
                user_id: '',
                config: ['master', 'user', 'classes', 'students', 'teachers', 'staff', 'subjects', 'operations', 'timeTable'],
                created_at: IST(),
                updated_at: IST()
            }
        ];

        Logger.error(JSON.stringify(user));
        configData[0].user_id = user[0]._id;

        UserConfig.insertMany(configData, (error, docs) => {
            if (error) {
                console.log(error);
                Logger.error(error.stack);
            } else console.log('DB seed complete');
            process.exit();
        });

        console.log('running seeder !');
    } catch (error) {
        console.log('Error seeding DB :: ', error?.message);
        process.exit();
    }
};

init(data);
