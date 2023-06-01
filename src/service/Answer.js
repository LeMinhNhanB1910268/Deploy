import axios from "axios";
import createApiClient from "./apiService";
// const api = createApiClient('https://api.openai.com/v1/chat/completions');

const AnswerOpenAI = async(data) => {
    return (await axios.post('https://api.openai.com/v1/chat/completions',data,{
        headers:{
            Authorization: `Bearer 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`
        }
    })).data
}


export {
    AnswerOpenAI,
}