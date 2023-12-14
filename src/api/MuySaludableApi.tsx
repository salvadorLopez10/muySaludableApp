import axios from "axios";

const MuySaludableApi = axios.create({
    baseURL: 'http://192.168.100.137:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export { MuySaludableApi }