import axios from 'intercepter/axios';

export async function getUser(query = {}, signal) {
    try {
        const response = await axios.get('/users', {
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

export async function createUser(data) {
    try {
        const response = await axios.post('/users', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateUser(idOfUser, data) {
    try {
        const response = await axios.put(`/users/${idOfUser}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function getUserConfig(query = {}) {
    try {
        const response = await axios.get('/users/userConfig', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}
