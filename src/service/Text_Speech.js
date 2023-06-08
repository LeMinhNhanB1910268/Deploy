import axios from "axios";
import createApiClient from "./apiService";


const TextSpeechZaloAI = async(data) => {
    const formdata = new URLSearchParams();
    formdata.append("input", data);
    return (await axios.post('https://api.zalo.ai/v1/tts/synthesize',formdata,{
        headers:{
            apikey: "Wn5P5FrSoPb1uJhb2t8TOI8gkpStUVPj"
        }
    })).data
}


export {
    TextSpeechZaloAI,
}