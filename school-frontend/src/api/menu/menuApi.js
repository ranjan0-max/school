import axios from 'intercepter/axios';

export async function getUserMenu(query = {}) {
    try {
        const response = await axios.get('/menu', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}
