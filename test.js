let testMode = process.env.testMode;
let addCodeFile = testMode == "slow" ? "add-slow" : "add-faster";

let assert = require("assert");
let add = require("./" + addCodeFile);

let TEST_FORALL_ITERATIONS = 1000;
let SHORT_LIST_LENGTH = () => 2;
let LONG_LIST_LENGTH = () => 1000;
let NON_NEGATIVE_NUMBERS_LESS_THAN_1000 = randomInt(1, 999);
let SHORT_LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000 = listOfGenerator(SHORT_LIST_LENGTH, NON_NEGATIVE_NUMBERS_LESS_THAN_1000);
let LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000 = listOfGenerator(LONG_LIST_LENGTH, NON_NEGATIVE_NUMBERS_LESS_THAN_1000);
let SINGLE_LONG_SEPERATORS = seperatorsGenerator(() => 1, randomInt(1, 10));
let MANY_SHORT_SEPERATORS = seperatorsGenerator(randomInt(1, 1000), () => 1);
let MANY_LONG_SEPERATORS = seperatorsGenerator(() => 1000, () => 5); 

/* 
    Tests 
*/
describe("Add Tests", () => {

    it("should return 0 for an empty string", () => {
        assert.equal(add(""), 0);
    });

    it("should return the number for a single number", () => {
        forall(NON_NEGATIVE_NUMBERS_LESS_THAN_1000, (it) => {
            let inputNumber = it.toString();
            assert.equal(add(inputNumber), parseInt(it));
        });
    });

    it("should return the sum of comma delimited numbers", () => {
        forall(SHORT_LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000, (it) => {
            let inputNumbers = it.join(",");
            assert.equal(add(inputNumbers), arraySum(it));
        });
    });

    it("should return sum of any number of comma delimeted numbers", () => {
        forall(LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000, (it) => {
            let inputNumbers = it.join(",");
            assert.equal(add(inputNumbers), arraySum(it));
        });
    });

    it("should return sum for newline and comma delimited numbers", () => {
        forall(LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000, (it) => {
            let input = joinArrayByRandomSeperator(it, oneOf([',', '\n']))
            assert.equal(add(input), arraySum(it))
        });
    });

    it("should return sum for custom delimites", () => {
        forall(LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000, (it) => {
            let seperator = ';';
            let input = "//" + seperator + "\n" + it.join(seperator)
            assert.equal(add(input), arraySum(it))
        });
    });

    it("should throw an error on negative numbers", () => {
        assert.throws(() => add("-1,2,-3"), /Negatives not allowed: -1,-3/);
    });

    it("should ignore numbers larger than 1000", () => {
        assert.equal(add("1001,2,3"), 5);
    });

    it("should return the sum for custom delimiters of multi length", () => {
        forallOfBoth(LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000, SINGLE_LONG_SEPERATORS, (numbers, seperator) => {
            let input = "//[" + seperator.join("") + "]\n" + numbers.join(seperator);
            assert.equal(add(input), arraySum(numbers));
        });
    });

    it("should return the sum for mutliple custom delimiters", () => {
        forallOfBoth(LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000, MANY_SHORT_SEPERATORS, (numbers, seperators) => {
            let numbersInput = joinArrayByRandomSeperator(numbers, oneOf(seperators));
            let input = "//[" + seperators.join("][") + "]\n" + numbersInput;
            assert.equal(add(input), arraySum(numbers));
        });
    });

    it("should return sum of multiple long custom delimiters", () => {
        forallOfBoth(LIST_OF_NON_NEGATIVE_INTEGERS_LESS_THAN_1000, MANY_LONG_SEPERATORS, (numbers, seperators) => {
            let numbersInput = joinArrayByRandomSeperator(numbers, oneOf(seperators));
            let input = "//[" + seperators.join("][") + "]\n" + numbersInput;
            assert.equal(add(input), arraySum(numbers));
        });
    });
})

/* 
    Auxiliary Functions
*/
function randomInt(min, max) {
    return () => Math.floor(Math.random() * (max - min + 1)) + min;
}

function forall(generator, test) {
    for (var i = 0; i < TEST_FORALL_ITERATIONS; i++) {
        test(generator());
    }
}

function forallOfBoth(generatorX, generatorY, test) {
    for (var i = 0; i < TEST_FORALL_ITERATIONS; i++) {
        test(generatorX(), generatorY());
    }
}

function listOfGenerator(sizeGenerator, elementGenerator) {
    return () => {
        var list = [];
        for (var i = 0; i < sizeGenerator(); i++) {
            list.push(elementGenerator());
        }
        return list;
    }
}

function arraySum(integerList) {
    return integerList.reduce((a, b) => a + b);
}

function oneOf(itemsList) {
    return () => itemsList[randomInt(0, itemsList.length - 1)()];
}

function joinArrayByRandomSeperator(list, seperatorGenerator) {
    if (list.length == 0) return "";
    if (list.length == 1) return list[0].toString();
    list.shift();
    return joinArrayByRandomSeperator[0] + seperatorGenerator() + joinArrayByRandomSeperator(list, seperatorGenerator);
}

function seperatorsGenerator(amountGenerator, seperatorSizeGenerator) {
    return () => {   
        let seperators = [];
        for (var i = 0; i < amountGenerator(); i++) {
            let seperator = [];
            for (var t = 0; t < seperatorSizeGenerator(); t++) {
                var charcode = randomInt(65, 90)();
                seperator.push(String.fromCharCode(charcode));
            }
            seperators.push(seperator.join(""));
        }
        return seperators.filter( isUnique );
    }
}

function isUnique(value, index, self) {
    return self.indexOf(value) === index;
}