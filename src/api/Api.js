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
    sendOrder(data) {
        const params = new URLSearchParams();
        Object.keys(data).map(i=>{
            params.append(i, data[i]);
        });
        return axios.post(baseUrl + '/orders/place-order', params, config).then(response => {
            return response.data;
        }).catch(err => console.log(err))
    }
};

export default Api
