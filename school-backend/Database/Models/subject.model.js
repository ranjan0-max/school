const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

const Subject = model('Subject', subjectSchema);
module.exports = Subject;
