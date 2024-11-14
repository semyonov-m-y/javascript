const square = require('./square');

describe('square tests', () => {
    let mockValue;
    // Выполняется перед каждым тестом
    beforeEach(() => {
        // Добавить в БД
    })
    //Выполняется перед всеми тестами
    beforeAll(() => {

    })
    test('Square of number', () => {
        // toBe однозначно проверяет равенство значений для примитивов и по ссылке что один и тот же объект для объектов
        expect(square(2)).toBe(4);
        expect(square(2)).toBeLessThan(5);
        expect(square(2)).toBeGreaterThan(3);
        expect(square(2)).not.toBeUndefined();
    })
    // После каждого теста
    afterEach(() => {
        // Удалить из БД
    })
    // После всех тестов
    afterAll(() => {

    })
})