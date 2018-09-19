
function add(numbers) {
    let numbersArray = splitNumbersToArray(numbers);
    let negatives = numbersArray.filter(i => i < 0);
    if (negatives.length > 0)
        throw new Error("Negatives not allowed: " + negatives);

    return numbers ? numbersArray.filter(i => i <= 1000).reduce((a, b) => a + b) : 0;
}

function splitNumbersToArray(numbers) {
    if (numbers.startsWith("//")) {
        let delims = numbers.substring(2, numbers.indexOf("\n"));
        let rest = numbers.substring(numbers.indexOf("\n") + 1);
        let delimsArray = delims.replace("[", "").replace(/]$/, "").split("][");
        let delimsRegex = createRegexFromDelimiterArray(delimsArray);
        return rest.split(delimsRegex).map(Number);
    } else {
        return numbers.split(/,|\n/).map(Number);
    }
}

function createRegexFromDelimiterArray(delimsArray) {
    return new RegExp(delimsArray.map(escape).join("|"));
}

function escape(regex) {
    return regex.replace(/[*.$]/g, "\\$&");
}

module.exports = add;