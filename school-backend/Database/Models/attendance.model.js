const { Schema, model } = require('mongoose');

const attendanceSchema = new Schema({
    day: { type: String, required: true },
    date: { type: Date, required: true },
    class: { type: Schema.Types.ObjectId, required: true },
    class_teacher: { type: Schema.Types.ObjectId, required: true },
    present_student_list: { type: Array, required: true },
    absent_student_list: { type: Array },
    updated_by: { type: Schema.Types.ObjectId },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

attendanceSchema.index({ date: 1, class: 1 }, { unique: true });

const Attendance = model('Attendance', attendanceSchema);
module.exports = Attendance;
