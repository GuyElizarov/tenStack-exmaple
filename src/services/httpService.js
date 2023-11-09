import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3000/'

const FAKESTORE_BASE_URL = 'https://fakestoreapi.com';

var axios = Axios.create();

export const httpService = {
    get(endpoint, data, external = false) {
        const baseUrl = external ? FAKESTORE_BASE_URL : BASE_URL;
        const url = `${baseUrl}${endpoint}`;
        return ajax(url, 'GET', data);
    },
    post(endpoint, data, external = false) {
        const baseUrl = external ? FAKESTORE_BASE_URL : BASE_URL;
        const url = `${baseUrl}${endpoint}`;
        return ajax(url, 'POST', data);
    },
    put(endpoint, data, external = false) {
        const baseUrl = external ? FAKESTORE_BASE_URL : BASE_URL;
        const url = `${baseUrl}${endpoint}`;
        return ajax(url, 'PUT', data);
    },
    delete(endpoint, data, external = false) {
        const baseUrl = external ? FAKESTORE_BASE_URL : BASE_URL;
        const url = `${baseUrl}${endpoint}`;
        return ajax(url, 'DELETE', data);
    }
}

async function ajax(url, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: url,
            method,
            data,
            params: (method === 'GET') ? data : null
        });
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, url: ${url}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            // Possible handling of 401 Unauthorized
        }
        throw err;
    }
}
