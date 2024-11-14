// Пример, когда нам что-то нужно вызвать с задержкой
const delay = (callback, ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callback())
        }, ms);
    })
}

// Результат будет посчитан через секунду
/*
delay(() => 5+5, 1000)
    .then(res => console.log(res))*/

module.exports = delay;