import axios from 'intercepter/axios';

export async function getRole(query = {}, signal) {
    try {
        const response = await axios.get('/role', {
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
