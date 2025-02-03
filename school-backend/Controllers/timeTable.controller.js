const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const DB = require('../Helpers/crud.helper');
const Logger = require('../Helpers/logger');
const controllerName = 'role.controller';
const AuthHelper = require('../Helpers/auth.helper');

const TimeTable = require('../Database/Models/timeTable.model');
const Teacher = require('../Database/Models/teacher.model');
const Subject = require('../Database/Models/subject.model');

// create new time table
const createTimeTable = async (req, res) => {
    try {
        const data = {
            ...req.body,
            created_at: IST('database'),
            updated_at: IST('database')
        };
        await DB.create(TimeTable, data);
        return Response.success(res, {
            data: {},
            message: 'Time table created successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - createTimeTable - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get all time tables
const getTimeTableList = async (req, res) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'classes',
                    localField: 'class',
                    foreignField: '_id',
                    as: 'class_info'
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
                $unwind: {
                    path: '$class_info',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$teacher_info',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    class_name: '$class_info.class_name',
                    teacher_name: '$teacher_info.name',
                    class_id: '$class_info._id',
                    time_table: 1
                }
            }
        ];

        const timeTables = await DB.aggregation(TimeTable, pipeline);
        return Response.success(res, {
            data: timeTables,
            message: 'Time table list fetched successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getTimeTableList - ${error.message}`);
        return Response.error(res, {
            data: [],
            message: error.message
        });
    }
};

// update time table
const updateTimeTable = async (req, res) => {
    try {
        const query = {
            _id: req.params.id
        };
        const updatedData = {
            ...req.body,
            updated_at: IST('database')
        };
        await DB.updateOne(TimeTable, { query: query, data: updatedData });
        return Response.success(res, {
            data: {},
            message: 'Time table updated successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - updateTimeTable - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

// get timetable details
const getTimeTableDetails = async (req, res) => {
    try {
        const query = {
            _id: req.query._id
        };
        const timeTable = await DB.readOne(TimeTable, query);
        let final_data = JSON.parse(JSON.stringify(timeTable));

        if (final_data) {
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            for (let index = 0; index < final_data?.time_table?.length; index++) {
                const row = final_data.time_table[index];
                const dayKey = days[index];
                if (row[dayKey]) {
                    for (let i = 0; i < row[dayKey].length; i++) {
                        let timeRow = row[dayKey][i];

                        if (timeRow.subject) {
                            const subjectQuery = { _id: timeRow.subject };
                            const subjectData = await DB.readOne(Subject, subjectQuery);
                            timeRow.subject_name = subjectData.name;
                        }

                        if (timeRow.teacher) {
                            const teacherQuery = { _id: timeRow.teacher };
                            const teacherData = await DB.readOne(Teacher, teacherQuery);
                            timeRow.teacher_name = teacherData.name;
                        }
                    }
                }
            }
        }

        return Response.success(res, {
            data: final_data,
            message: 'Time table details fetched successfully'
        });
    } catch (error) {
        Logger.error(`${controllerName} - getTimeTableDetails - ${error.message}`);
        return Response.error(res, {
            data: {},
            message: error.message
        });
    }
};

module.exports = {
    createTimeTable,
    getTimeTableList,
    updateTimeTable,
    getTimeTableDetails
};
