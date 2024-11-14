// Функция для запроса данных с сервера. Для этого используем npm i axios
const axios = require('axios');
const mapArrToString = require('../mapArrToString/mapArrToString');

const getData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
        const userIds = response.data.map((user) => user.id);
        return mapArrToString(userIds);
    } catch (e) {

    }
}

module.exports = getData;