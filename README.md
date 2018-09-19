# Javascript-Nodejs-Performance-CodeKata-Comparison
TDD CodeKata - String Calculator done using Javascript in a Nodejs environment.

The Kata can be found on [osherove.com/tdd-kata-1](http://osherove.com/tdd-kata-1/).

The generative test design is based on Graeme Lockley's ([github.com/graeme-lockley](https://github.com/graeme-lockley)) Kotlin sollution.

Feel free to suggest any refactoring that could be done.

## Why? - Just For Fun
A generative testing suite to compare the performance of two different Javascript Kata solutions. These were produced during developer bootcamp sessions and discussed on wether the one sollution is really slower than the other. This can be further used to explain and derive the Big O notation of the sollutions.

## What the test contains
Some of the tests were modified to generate their inputs, chaining a combination of higher order functions. The forall loops run the test a 1000 times by default, and the integer lists contain a 1000 elements each.

The last test case is fixed to contain approx. 1000 different seperators (excluding duplicates that were generated), with a fixed length of 5 characters.

## How to run it
1) Make sure you have NodeJs installed.
2) Traverse to the directory where you cloned or downloaded this project, using your terminal/cmd.
3) Type and execute `npm install`.
4) To run the tests on the faster sollution (located in `add-faster.js`)
  - `npm test`
5) To run the tests on the slower sollution (located in `add-slower.js`)
  - `npm run test-slow`

## What to take note of
Mocha shows the runtime (in miliseconds) of any tests that take a while, next to the test name.

example: `✓ should return sum of multiple long custom delimiters (47669ms)`

## What Performance I got
On a Macbook with a 2,3Ghz Intel i7 and 16GB of DDR3 Ram, I got the following performance.

### Faster Sollution
```
  Add Tests
    ✓ should return 0 for an empty string
    ✓ should return the number for a single number
    ✓ should return the sum of comma delimited numbers
    ✓ should return sum of any number of comma delimeted numbers (236ms)
    ✓ should return sum for newline and comma delimited numbers (338ms)
    ✓ should return sum for custom delimites (230ms)
    ✓ should throw an error on negative numbers
    ✓ should ignore numbers larger than 1000
    ✓ should return the sum for custom delimiters of multi length (244ms)
    ✓ should return the sum for mutliple custom delimiters (444ms)
    ✓ should return sum of multiple long custom delimiters (5729ms)
  11 passing (7s)
```

### Slower Sollution
```
  Add Tests
    ✓ should return 0 for an empty string
    ✓ should return the number for a single number
    ✓ should return the sum of comma delimited numbers
    ✓ should return sum of any number of comma delimeted numbers (237ms)
    ✓ should return sum for newline and comma delimited numbers (306ms)
    ✓ should return sum for custom delimites (622ms)
    ✓ should throw an error on negative numbers
    ✓ should ignore numbers larger than 1000
    ✓ should return the sum for custom delimiters of multi length (1381ms)
    ✓ should return the sum for mutliple custom delimiters (1360ms)
    ✓ should return sum of multiple long custom delimiters (47669ms)
  11 passing (52s)
```
