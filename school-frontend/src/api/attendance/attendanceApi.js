import axios from 'intercepter/axios';

export async function getAttendance(query = {}) {
    try {
        const response = await axios.get('/attendance', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}

export async function createAttendance(data) {
    try {
        const response = await axios.post('/attendance', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateAttendance(idOfAttendance, data) {
    try {
        const response = await axios.put(`/attendance/${idOfAttendance}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function getAttendanceHistory(query = {}) {
    try {
        const response = await axios.get('/attendance/history', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}

export async function getStudentNameListOfAttendance(query = {}) {
    try {
        const response = await axios.get('/attendance/student_name', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}
