import axios from 'intercepter/axios';

export async function getStaffs(query = {}, signal) {
    try {
        const response = await axios.get('/staff', {
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

export async function createStaff(data) {
    try {
        const response = await axios.post('/staff', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateStaff(idOfStaff, data) {
    try {
        const response = await axios.put(`/staff/${idOfStaff}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}
