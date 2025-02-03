const { Schema, model } = require('mongoose');

const timeTableSchema = new Schema({
    class: { type: Schema.Types.ObjectId, required: true, unique: true },
    class_teacher: { type: Schema.Types.ObjectId, required: true },
    time_table: { type: Array },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

const TimeTable = model('TimeTable', timeTableSchema);
module.exports = TimeTable;
