import axios from 'intercepter/axios';

export async function getTimeTable(query = {}) {
    try {
        const response = await axios.get('/timeTable', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}

export async function createTimeTable(data) {
    try {
        const response = await axios.post('/timeTable', data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function updateTimeTable(idOfTimeTable, data) {
    try {
        const response = await axios.put(`/timeTable/${idOfTimeTable}`, data);
        return response;
    } catch (error) {
        return error.message;
    }
}

export async function getTimeTableInDetail(query = {}) {
    try {
        const response = await axios.get('/timeTable/detail', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}
