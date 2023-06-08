import axios from "axios";
import createApiClient from "./apiService";


const TextSpeechZaloAI = async(data) => {
    const formdata = new URLSearchParams();
    formdata.append("input", data);
    return (await axios.post('https://api.zalo.ai/v1/tts/synthesize',formdata,{
        headers:{
            apikey: "Yp0D9k6PAKiJDG3mgEL4PgeFkSriO5lS"
        }
    })).data
}


export {
    TextSpeechZaloAI,
}