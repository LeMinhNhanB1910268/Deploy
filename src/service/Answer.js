import axios from "axios";
import createApiClient from "./apiService";
// const api = createApiClient('https://api.openai.com/v1/chat/completions');
// require('dotenv').config();
const AnswerOpenAI = async(data) => {
    const apiKey = process.env.OPENAI_API_KEY;
    return (await axios.post('https://api.openai.com/v1/chat/completions',data,{
        headers:{
            Authorization: `Bearer ${apiKey}`    
        }
    })).data
}


export {
    AnswerOpenAI,
}