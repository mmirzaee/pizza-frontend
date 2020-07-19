import axios from "axios";

const baseUrl = 'https://pizza-api.alimrz.com';
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const Api = {
    getExchangeRate() {
        return axios.get('https://api.exchangeratesapi.io/latest').then(response => {
            return (1 / response.data.rates.USD);
        }).catch(err => console.log(err))
    },
    getMenu() {
        return axios.get(baseUrl + '/items').then(response => {
            return response.data;
        }).catch(err => console.log(err))
    },
    sendOrder(data, token) {
        const params = new URLSearchParams();
        Object.keys(data).map(i => {
            params.append(i, data[i]);
        });

        let finalConfig = config;
        if (token) {
            finalConfig = {headers: {Authorization: 'Bearer ' + token, ...(config.headers)}};
        }
        return axios.post(baseUrl + '/orders/place-order', params, finalConfig).then(response => {
            return response.data;
        }).catch(err => console.log(err))
    },
    postLogin(data) {
        const params = new URLSearchParams();
        Object.keys(data).map(i => {
            params.append(i, data[i]);
        });
        return axios.post(baseUrl + '/auth/login', params, config).then(response => {
            return response.data;
        })
    },
    postRegister(data) {
        const params = new URLSearchParams();
        Object.keys(data).map(i => {
            params.append(i, data[i]);
        });
        return axios.post(baseUrl + '/auth/signup', params, config).then(response => {
            return response.data;
        })
    },
    getProfile(token) {
        const configWithToken = {headers: {Authorization: 'Bearer ' + token, ...(config.headers)}};
        return axios.get(baseUrl + '/auth/profile', configWithToken).then(response => {
            return response.data;
        }).catch(err => console.log(err))
    },
    getOrdersHistory(token) {
        const configWithToken = {headers: {Authorization: 'Bearer ' + token, ...(config.headers)}};
        return axios.get(baseUrl + '/orders/history', configWithToken).then(response => {
            return response.data;
        }).catch(err => console.log(err))
    },
};

export default Api
