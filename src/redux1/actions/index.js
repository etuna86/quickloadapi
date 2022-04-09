import axios from 'axios';

//let cookie = cookieClient.load('cookie-name')
const baseURL = "https://teknasyon.myshopify.com";
const AccessToken = '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';


export const axiosAT = axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'X-Shopify-Access-Token': AccessToken
    }
})

