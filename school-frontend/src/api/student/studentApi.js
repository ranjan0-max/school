import axios from 'intercepter/axios';

export async function getStudents(query = {}, signal) {
    try {
        const response = await axios.get('/student', {
            params: {
                ...query
            },
            signal
        });
        return response.data.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
            return null;
        }
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
