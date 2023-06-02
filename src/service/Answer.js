import axios from "axios";
import createApiClient from "./apiService";
// const api = createApiClient('https://api.openai.com/v1/chat/completions');
// require('dotenv').config();
const AnswerOpenAI = async(data) => {
   
    return (await axios.post('https://api.openai.com/v1/chat/completions',data,{
        headers:{
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` 
            // Authorization: `Bearer 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`    
        }
    })).data
}


export {
    AnswerOpenAI,
}