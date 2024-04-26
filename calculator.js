const calculator = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => num1 / num2,
    modulus: (num1, num2) => num1 % num2,
    square: (num1) => num1*num1,
    cube: (num1) => num1*num1*num1,
    power: (num1, num2) => Math.pow(num1, num2),
    factorial: (num1) => {
        if (num1 === 0 || num1 === 1) {
            return 1;
        } else {
            return num1 * calculator.factorial(num1 - 1);
        }
    }
};

module.exports = calculator;