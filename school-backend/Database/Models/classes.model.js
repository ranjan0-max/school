const { Schema, model } = require('mongoose');

const classesSchema = new Schema({
    class_name: { type: String, required: true, unique: true },
    total_strength: { type: Number },
    total_student_capacity: { type: Number, required: true },
    class_teacher: { type: Schema.Types.ObjectId }, // teacher Id
    class_subjects: { type: Array },
    class_room_no: { type: String },
    class_equipments: { type: Array },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

const Classes = model('Classes', classesSchema);
module.exports = Classes;
