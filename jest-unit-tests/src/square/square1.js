const square1 = (number) => {
    if (number === 1) {
        return number;
    }
    return Math.pow(number, 2);
}

module.exports = square1;