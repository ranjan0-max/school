import axios from 'intercepter/axios';

export async function getStudents(query = {}) {
    try {
        const response = await axios.get('/student', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}

export async function createStudent(data) {
    try {
        const response = await axios.post('/student', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateStudent(idOfStudent, data) {
    try {
        const response = await axios.put(`/student/${idOfStudent}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}
