import createApiClient from "./apiService";
const api = createApiClient('https://grimy-orange-zd6p-master-nelm6assaa-wm.a.run.app/');

const getCountLike = async (data) => {
    return (await api.post('api/count_like',data)).data
}
const getCountDislike = async (data) => {
    return (await api.post('api/count_dislike',data)).data
}
const getCountUser = async (data) => {
    return (await api.post('api/count_user',data)).data
}
const getCountQuestion = async (data) => {
    return (await api.post('api/count_question',data)).data
}

export {
    getCountLike,
    getCountDislike,
    getCountUser,
    getCountQuestion
}