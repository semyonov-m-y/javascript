const validateValue = require('./validateValue');

test('Value validation', () => {
    // toBe однозначно проверяет равенство значений для примитивов и по ссылке что один и тот же объект для объектов
    expect(validateValue(50)).toBe(true);
})

// Если хотим добавить несколько тестов, то оборачиваем их в describe
describe('validateValue()', () => {
    test('Value is OK', () => {
        expect(validateValue(50)).toBe(true);
    })

    test('Value is less', () => {
        expect(validateValue(-1)).toBe(false);
    })

    test('Value is bigger', () => {
        expect(validateValue(101)).toBe(false);
    })

    test('Value is equal 0', () => {
        expect(validateValue(0)).toBe(true);
    })

    test('Value is equal 100', () => {
        expect(validateValue(100)).toBe(true);
    })
})