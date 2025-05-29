export const questionOne = (arr) => {
  // This function should calculate the factorial of each element in the array. You will return an
  // array that has the factorial for each element. You will retain the order of the original array
  // using first in, first out.
  // Running lab1.questionOne([5, 0, 3]) would return [120, 1, 6].
  let newArr = [];

  for (const elem of arr) {
    let res = 1;

    for (let i = elem; i > 0; i--) {
      res *= i;
    }

    newArr.push(res);
  }

  return newArr;
};

export const questionTwo = (arr) => {
  // For your second function, you will calculate if all numbers in the array are prime numbers or
  // not. You will return an object with the number as the key and true / false as the value.
  // Running lab1.questionTwo([5, 3, 10]) would return { 5: true, 3: true, 10: false }.
  // If an empty array is passed in or if the function is called without any input parameters, just
  // return an empty object.You do not have to worry about dealing with different data types passed
  // in.You can assume only arrays and numbers as elements will be passed in to your function (we
  // get to type checking and error handling in lecture 2)
  if (arr.length == 0) {
    return {};
  }

  // To calc if prime, the best way to do it is trial division for numbers < 1M
  // Do trial division until reaching the square root ceil
  const ret = {};

  for (const num of arr) {
    ret[num] = true; // start by assuming it is prime
    let sq = Math.ceil(Math.sqrt(num));

    for (let i = 2; i <= sq; i++) {
      if (num % i == 0) {
        ret[num] = false; // if we find a factor it's not prime
        break;
      }
    }
  }

  return ret;
};

export const questionThree = (str) => {
  // For your third function, you will take in a string as input and return an object containing
  // the count of uppercase letters, lowercase letters, numbers, whitespace characters, and any
  // other character.
  // If an empty string is passed in, just return 0 for each key. You do not have to worry about
  // dealing with different data types passed in. You can assume only strings will be passed in to
  // your function (we get to type checking and error handling in lecture 2).
};

export const questionFour = (arr) => {
  // This function will return a new array with all numbers in ascending order and all strings in
  // lexicographical order.The output array should first list all numbers followed by all strings.
  // Note: You do not have to worry about special characters in the strings supplied.
  // We will only test with numbers and strings that have letters(or numbers) in the string.
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: "YOUR FIRST NAME",
  lastName: "YOUR LAST NAME",
  studentId: "YOUR STUDENT ID",
};
