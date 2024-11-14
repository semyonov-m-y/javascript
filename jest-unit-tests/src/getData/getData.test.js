const getData = require('./getData');
const axios = require("axios");

jest.mock('axios');

describe('getData', () => {
    let response;
    beforeEach(() => {
        response = {
            data: [
                {
                    "id": 1,
                    "name": "Max",
                    "username": "Anna",
                    "email": "Anna@gmail.com",
                    "address": {
                        "street": "Woodstreet",
                        "suite": "Apt. 5",
                        "city": "Boston",
                        "zipcode": "92998-3974",
                        "geo": {
                            "lat": "-37.3159",
                            "lng": "81.1496"
                        }
                    },
                    "phone": "1-770-736-8031",
                    "website": "www.google.com",
                    "company": {
                        "name": "Anna&Co",
                        "catchPhrase": "Net",
                        "bs": "e-markets"
                    }
                },
                {
                    "id": 2,
                    "name": "Max2",
                    "username": "Anna2",
                    "email": "Anna2@gmail.com",
                    "address": {
                        "street": "Woodstreet",
                        "suite": "Apt. 5",
                        "city": "Boston",
                        "zipcode": "92998-3974",
                        "geo": {
                            "lat": "-37.3159",
                            "lng": "81.1496"
                        }
                    },
                    "phone": "1-770-736-8031",
                    "website": "www.google.com",
                    "company": {
                        "name": "Anna&Co",
                        "catchPhrase": "Net",
                        "bs": "e-markets"
                    }
                },
                {
                    "id": 3,
                    "name": "Max3",
                    "username": "Anna3",
                    "email": "Anna3@gmail.com",
                    "address": {
                        "street": "Woodstreet",
                        "suite": "Apt. 5",
                        "city": "Boston",
                        "zipcode": "92998-3974",
                        "geo": {
                            "lat": "-37.3159",
                            "lng": "81.1496"
                        }
                    },
                    "phone": "1-770-736-8031",
                    "website": "www.google.com",
                    "company": {
                        "name": "Anna&Co",
                        "catchPhrase": "Net",
                        "bs": "e-markets"
                    }
                }
            ]
        }
    })

    test('Result is OK', async () => {
        // Замоканные данные добавлены выше (схема), теперь согласуем эти данные с методом get у axios
        axios.get.mockReturnValue(response);
        const data = await getData ();
        // Если метод ничего не возвращает, то минимум можно протестировать количество его вызовов
        expect(axios.get).toBeCalledTimes(1);
        // Так как замокали 3 клиента, то и ожидаем 3 клиента, причем id из числа должно превратиться в строку из-за функции mapArrToString
        expect(data).toEqual(['1', '2', '3'])
        // Чтобы сравнить данные, можно использовать toMatchSnapshot. Сравнивает сами элементы, вложенность, отрисовалась ли кнопка, наложились ли стили и тд
        // Создает папку __snapshots__ и если при следующем запуске в коде что-то меняется, то выдаст ошибку и покажет где она (что не сходится)
        expect(data).toMatchSnapshot()
    })
})