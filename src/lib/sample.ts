

let someNumber: number = 42.123;

let otherNumber: number = 10000000;

someNumber = Infinity;

otherNumber = 500;

let isCorrect: boolean = false;

if (otherNumber > someNumber) {
    isCorrect = true;
}

let index = 0;

// this is a cool loop
// this is why i wrote such strange code
 while (index < someNumber) {
    index += 10000
     console.log("number: " + index);
 }