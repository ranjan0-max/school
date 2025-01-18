import axios from 'intercepter/axios';

export async function getRole(query = {}) {
    try {
        const response = await axios.get('/role', {
            params: {
                ...query
            }
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}
