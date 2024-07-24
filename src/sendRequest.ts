import { weapi } from './encrypt';
import axios from 'axios';
import http from 'http';
import https from 'https';

const sendRequest = (data) => {
    data.csrf_token = '';
    const encryptedData = weapi(data);
    const requestConfig = {
        method: "POST",
        url: "music.163.com/weapi/v1/artist/songs",
        data: encryptedData,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true })
    };
    axios(requestConfig)
        .then((response) => {
            console.log(response.data);
        });
}

export { sendRequest };