import Axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const apiAdd =  'https://fapi.binance.com/fapi/v1/listenKey'; 

const getListenKey = async () => {
    try {
        const resp = await Axios({
            method: 'post',
            url: apiAdd,
            headers: {'X-MBX-APIKEY': process.env.APKEYY},
            auth: {
                APIKEY: process.env.APKEYY,
                SECRET: process.env.ASKEYY
            }
        });
        return resp.data
    } catch (e) {
        console.log(e.response);
    }
};
const keepAlive = async () => {
    try {
        const resp = await Axios({
            method: 'put',
            url: apiAdd,
            headers: {'X-MBX-APIKEY': process.env.APKEYY},
            auth: {
                APIKEY: process.env.APKEYY,
                SECRET: process.env.ASKEYY
            }
        });
        return resp.data
    } catch (e) {
        console.log(e.response);
    }
};
const closeStream = async () => {
    try {
        const resp = await Axios({
            method: 'delete',
            url: apiAdd,
            headers: {'X-MBX-APIKEY': process.env.APKEYY},
            auth: {
                APIKEY: process.env.APKEYY,
                SECRET: process.env.ASKEYY
            }
        });
        return resp.data
    } catch (e) {
        console.log(e.response);
    }
};

export { getListenKey, keepAlive, closeStream };