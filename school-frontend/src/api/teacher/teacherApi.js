import axios from 'intercepter/axios';

export async function getTeachers(query = {}) {
    try {
        const response = await axios.get('/teacher', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}

export async function createTeacher(data) {
    try {
        const response = await axios.post('/teacher', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateTeacher(idOfTeacher, data) {
    try {
        const response = await axios.put(`/teacher/${idOfTeacher}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}
