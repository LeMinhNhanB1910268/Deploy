import axios from "axios";
import createApiClient from "./apiService";
// const api = createApiClient('https://api.openai.com/v1/chat/completions');

const TextSpeechZaloAI = async(data) => {
    const formdata = new URLSearchParams();
    formdata.append("input", data);
    return (await axios.post('https://api.zalo.ai/v1/tts/synthesize',formdata,{
        headers:{
            // apikey: process.env.REACT_APP_API_KEY_ZALO
            apikey: "Wn5P5FrSoPb1uJhb2t8TOI8gkpStUVPj"
        }
    })).data
}


export {
    TextSpeechZaloAI,
}