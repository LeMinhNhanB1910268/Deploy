import axios from "axios";
import createApiClient from "./apiService";

const AnswerOpenAI = async (data) => {
   
    return (await axios.post('https://api.openai.com/v1/chat/completions',data,{
        headers:{
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` 
//             Authorization: "Bearer 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"
        }
    })).data
}
export {
    AnswerOpenAI,
}
