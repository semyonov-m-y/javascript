const mapArrToString = require('./mapArrToString');

// Если хотим добавить несколько тестов, то оборачиваем их в describe
describe('mapArrToString()', () => {
    test('Value is OK', () => {
        // toEqual не проверяет по ссылкам, как toBe, а проверяет по значениям
        expect(mapArrToString([1, 2, 3])).toEqual(['1', '2', '3']);
    })
    test('Not numbers will be deleted', () => {
        // toEqual не проверяет по ссылкам, как toBe, а проверяет по значениям
        expect(mapArrToString([1, 2, 3, null, undefined, 'asdfgd'])).toEqual(['1', '2', '3']);
    })
    test('Empty array', () => {
        // toEqual не проверяет по ссылкам, как toBe, а проверяет по значениям
        expect(mapArrToString([])).toEqual([]);
    })
    test('Not equal', () => {
        // toEqual не проверяет по ссылкам, как toBe, а проверяет по значениям
        expect(mapArrToString([1, 2, 3])).not.toEqual([1, 2, 3]);
    })
})