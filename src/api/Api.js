import axios from "axios";

const baseUrl = 'https://pizza-api.alimrz.com';
const Api = {
    getMenu() {
        return axios.get(baseUrl + '/items').then(response => {
            return response.data;
        }).catch(err => console.log(err))
    }
}

export default Api
