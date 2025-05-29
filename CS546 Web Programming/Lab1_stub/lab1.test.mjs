import * as lab1 from "./lab1.mjs";

// Question 1: Factorial
console.log(lab1.questionOne([5, 0, 3])); // [120, 1, 6]
console.log(lab1.questionOne([4, 2, 7])); // [24, 2, 5040]
console.log(lab1.questionOne([3, 8, 9])); // [6, 40230, 362880]
console.log(lab1.questionOne([4])); // [24]
console.log(lab1.questionOne([1, 0])); // [1, 1]

// Question 2: Is Prime
console.log(lab1.questionTwo([5, 3, 10])); // {5:true, 3: true, 10: false}
console.log(lab1.questionTwo([2])); // {2: true}
console.log(lab1.questionTwo([5, 10, 9])); // {5: true, 10: false, 9: false}
console.log(lab1.questionTwo([2, 7, 9, 1013])); // {2: true, 7: true, 9: false, 1013: true}
console.log(lab1.questionTwo([])); // {}

// // Question 3: Character Type Counts
console.log(lab1.questionThree("Hello123_ 90 ")); // { uppercase: 1, lowercase: 4, number: 5, whitespace: 2, other: 1 }
console.log(lab1.questionThree("Hello World  123!")); // {uppercase: 2, lowercase: 8, numbers: 3, spaces: 3, otherCharacters: 1}
console.log(lab1.questionThree("1824  XYabef!")); // {uppercase: 2, lowercase: 4, numbers: 4, spaces: 2, otherCharacters: 1}
console.log(lab1.questionThree("")); // {uppercase: 0, lowercase: 0, numbers: 0, spaces: 0, otherCharacters: 0}
console.log(lab1.questionThree("     ")); // {uppercase: 0, lowercase: 0, numbers: 0, spaces: 5, otherCharacters: 0}

// // Question 4: Sorting
console.log(lab1.questionFour([3, "guitar", 1, "bass", -10])); // [-10, 1, 3, "bass", "guitar"]
console.log(lab1.questionFour(["a", 2, 1, "f", "car", "czd"])); // [1, 2, 'a', 'car', 'czd', 'f']
console.log(lab1.questionFour([0, "Patrick", 100, "Hill", -50])); // [-50, 0, 100, "Hill", "Patrick"]
console.log(lab1.questionFour([123, "World", 500, "Hello"])); // [123, 500, "Hello", "World"]
console.log(lab1.questionFour(["b", "z", "r", 1, "2", "1"])); // [ 1, '1', '2', 'b', 'r', 'z' ]
