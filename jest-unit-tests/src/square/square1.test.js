const square1 = require('./square1');

describe('square1 tests', () => {
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
        const spyMathPow = jest.spyOn(Math, 'pow');
        square1(2);
        expect(spyMathPow).toBeCalledTimes(1);
    })
    // ЧТОБЫ ЗАРАБОТАЛ ЭТОТ ТЕСТ, ПРЕДЫДУЩИЙ НАДО ЗАКОММЕНТИРОВАТЬ, ИНАЧЕ БУДЕТ КАК С КЭШОМ НАКАПЛИВАНИЕ ДАННЫХ И ТЕСТ НИЖЕ УПАДЕТ
    // ЛИБО НАДО В БЛОК afterEach ДОБАВИТЬ clearAllMocks()
    test('Square of number1', () => {
        // toBe однозначно проверяет равенство значений для примитивов и по ссылке что один и тот же объект для объектов
        const spyMathPow = jest.spyOn(Math, 'pow');
        square1(1);
        expect(spyMathPow).toBeCalledTimes(0);
    })
    // После каждого теста
    afterEach(() => {
        jest.clearAllMocks()
    })
    // После всех тестов
    afterAll(() => {

    })
})