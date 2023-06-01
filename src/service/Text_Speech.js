import axios from "axios";
import createApiClient from "./apiService";
// const api = createApiClient('https://api.openai.com/v1/chat/completions');

const TextSpeechZaloAI = async(data) => {
    const formdata = new URLSearchParams();
    formdata.append("input", data);
    return (await axios.post('https://api.zalo.ai/v1/tts/synthesize',formdata,{
        headers:{
            // apikey: `W0HCVAxEbVmMwdJbJ5HsqZ2Q2MFsnUot`
            // apikey: `Yp0D9k6PAKiJDG3mgEL4PgeFkSriO5lS`
            apikey: 'Wn5P5FrSoPb1uJhb2t8TOI8gkpStUVPj'
            // apikey: `UhWio94qJG2KK1IZXNFgTtZX3eFwRq9E`
        }
    })).data
}


export {
    TextSpeechZaloAI,
}