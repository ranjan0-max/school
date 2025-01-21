import axios from 'intercepter/axios';

export async function getSubjects(query = {}) {
    try {
        const response = await axios.get('/subject', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}

export async function createSubject(data) {
    try {
        const response = await axios.post('/subject', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateSubject(idOfSubject, data) {
    try {
        const response = await axios.put(`/subject/${idOfSubject}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}
