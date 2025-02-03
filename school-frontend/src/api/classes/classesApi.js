import axios from 'intercepter/axios';

export async function getClasses(query = {}, signal) {
    try {
        const response = await axios.get('/class', {
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

export async function createClass(data) {
    try {
        const response = await axios.post('/class', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateClass(idOfClass, data) {
    try {
        const response = await axios.put(`/class/${idOfClass}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}
