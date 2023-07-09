import axios from 'axios'
import createApiClient from "./apiService";
const api = createApiClient('https://grimy-orange-zd6p-master-nelm6assaa-wm.a.run.app/');

const getUser = async (userID) => {
    return (await api.get('/api/user/'+userID));
}

const updateUser = async (userID, data) => {
    return (await api.put('/api/user/'+userID, data)).data;
}

const deleteUser = async (userID) => {
    return (await api.delete('/api/user/'+userID)).data;
}

export {
    getUser,
    updateUser,
    deleteUser,
}