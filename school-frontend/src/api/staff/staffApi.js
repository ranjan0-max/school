import axios from 'intercepter/axios';

export async function getStaffs(query = {}) {
    try {
        const response = await axios.get('/staff', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
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
