const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'attendance.controller';

const Student = require('../Database/Models/student.model');
const Attendance = require('../Database/Models/attendance.model');
const mongoose = require('mongoose');

// create attendance
const createAttendance = async (req, res) => {
    try {
        const data = {
            ...req.body,
            created_at: IST('database'),
            updated_at: IST('database')
        };

        await DB.create(Attendance, data);

        return Response.success(res, {
            data: data,
            message: 'Attendance Marked successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - createAttendance - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get attendance list
const getAttendanceList = async (req, res) => {
    try {
        const date = req.query.date;
        if (!date) {
            return Response.error(res, {
                data: [],
                message: 'Date is required'
            });
        }

        const pipeline = [
            {
                $match: {
                    date: new Date(date)
                }
            },
            {
                $unwind: { path: '$present_student_list', preserveNullAndEmptyArrays: true }
            },
            {
                $unwind: { path: '$absent_student_list', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: '$class',
                    present_students_list: { $push: '$present_student_list' },
                    absent_students_list: { $push: '$absent_student_list' },
                    class_teacher: { $first: '$class_teacher' }
                }
            },
            {
                $lookup: {
                    from: 'teachers',
                    localField: 'class_teacher',
                    foreignField: '_id',
                    as: 'teacher_info'
                }
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'class_info'
                }
            }
        ];

        const attendance = await DB.aggregation(Attendance, pipeline);

        let final_data = JSON.parse(JSON.stringify(attendance));

        for (let row of final_data) {
            row.class_info = row?.class_info?.[0];
            row.teacher_info = row?.teacher_info?.[0];
            row.class = row?.class_info?.class_name;
            row.total_student_count = row?.class_info?.total_strength;
            row.present_students_count = row?.present_students_list?.length;
            row.absent_students_count = row?.absent_students_list?.length;
            row.class_teacher = row?.teacher_info?.name;
        }

        return Response.success(res, {
            data: final_data,
            message: 'Attendance data found'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getAttendanceList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// update attendance
const updateAttendance = async (req, res) => {
    try {
        const query = {
            _id: req.params.id
        };

        const data = {
            ...req.body,
            updated_at: IST('database')
        };

        await DB.updateOne(Attendance, { query, data });

        return Response.success(res, {
            data: data,
            message: 'Attendance Updated Successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - updateAttendance - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get attendance history of classes
const getAttendanceHistory = async (req, res) => {
    try {
        const query = req.query;
        delete query.auth_user_id;
        delete query.user_role;

        const pipeline = [
            {
                $match: {
                    date: new Date(query.date),
                    class: new mongoose.Types.ObjectId(query.class_id)
                }
            },
            {
                $unwind: { path: '$present_student_list', preserveNullAndEmptyArrays: true }
            },
            {
                $unwind: { path: '$absent_student_list', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: '$class',
                    present_students_list: { $push: '$present_student_list' },
                    absent_students_list: { $push: '$absent_student_list' },
                    class_teacher: { $first: '$class_teacher' }
                }
            },
            {
                $lookup: {
                    from: 'teachers',
                    localField: 'class_teacher',
                    foreignField: '_id',
                    as: 'teacher_info'
                }
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'class_info'
                }
            }
        ];

        const attendance_history = await DB.aggregation(Attendance, pipeline);

        let final_data = JSON.parse(JSON.stringify(attendance_history));

        for (let row of final_data) {
            row.class_info = row?.class_info?.[0];
            row.teacher_info = row?.teacher_info?.[0];
            row.class = row?.class_info?.class_name;
            row.total_student_count = row?.class_info?.total_strength;
            row.present_students_count = row?.present_students_list?.length;
            row.absent_students_count = row?.absent_students_list?.length;
            row.class_teacher = row?.teacher_info?.name;
        }

        return Response.success(res, {
            data: final_data,
            message: 'Attendance history data found'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getAttendanceHistory - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// get student name
const getStudentNamesList = async (req, res) => {
    try {
        const query = req.query;

        const absent_student_name_list = await DB.findDetails(Student, { _id: { $in: query.absent_student_list } });
        const present_student_name_list = await DB.findDetails(Student, { _id: { $in: query.present_student_list } });

        const present_student = [];
        const absent_student = [];

        for (let student of present_student_name_list) {
            present_student.push(student.name);
        }

        for (let student of absent_student_name_list) {
            absent_student.push(student.name);
        }

        return Response.success(res, {
            data: { present_student, absent_student },
            message: 'Attendance history data found'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getStudentNamesList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

module.exports = {
    createAttendance,
    getAttendanceList,
    updateAttendance,
    getAttendanceHistory,
    getStudentNamesList
};
