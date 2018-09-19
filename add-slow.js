
function add(numbers) {
    let numArray = delimiterHandler(numbers);
    numArray = numArray.filter(i => i < 1000);

    let negatives = numArray.filter(i => i < 0);
    if (negatives.length > 0) {
        throw new Error("Negatives not allowed: " + negatives);
    }

    let sum = 0;
    for (let i = 0; i < numArray.length; i++) {
        sum += parseInt(numArray[i] || 0)
    }

    return sum;
}

function delimiterHandler(numbers) {

    if (numbers.startsWith("//")) {
        let delimiter = numbers.substring(2, numbers.indexOf("\n"));

        delimiter = delimiter.split("[").join("");
        delimiter = delimiter.split("]").join("");

        numbers = numbers.substring(numbers.indexOf("\n") + 1);

        for (let i = 0; i < numbers.length; i++) {
            numbers = numbers.split(delimiter[i]).join(",");
        }
    }
    return numbers.split(/,|\n/);
}

module.exports = add;