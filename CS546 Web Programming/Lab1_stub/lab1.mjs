export const questionOne = (arr) => {
  // This function should calculate the factorial of each element in the array. You will return an
  // array that has the factorial for each element. You will retain the order of the original array
  // using first in, first out.
  // Running lab1.questionOne([5, 0, 3]) would return [120, 1, 6].
  let newArr = [];

  for (const elem of arr) {
    if (elem == 0) {
      newArr.push(1);
      continue;
    }

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
  if (arr.length == 0) return {};

  // To calc if prime, the best way to do it is trial division for numbers < 1M
  // Do trial division until reaching the square root ceil
  const ret = {};

  for (const num of arr) {
    let sq = Math.ceil(Math.sqrt(num));
    ret[num] = true; // start by assuming it is prime

    if (num == 1 || num == 2) {
      continue;
    }
    if (num == 0) {
      ret[num] = false;
      continue;
    }

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
  const counts = {
    uppercase: 0,
    lowercase: 0,
    number: 0,
    whitespace: 0,
    other: 0,
  };

  for (const char of str) {
    if (/[A-Z]/.test(char)) {
      counts.uppercase++;
    } else if (/[a-z]/.test(char)) {
      counts.lowercase++;
    } else if (/[0-9]/.test(char)) {
      counts.number++;
    } else if (/\s/.test(char)) {
      counts.whitespace++;
    } else {
      counts.other++;
    }
  }

  return counts;
};

export const questionFour = (arr) => {
  // This function will return a new array with all numbers in ascending order and all strings in
  // lexicographical order.The output array should first list all numbers followed by all strings.
  // Note: You do not have to worry about special characters in the strings supplied.
  // We will only test with numbers and strings that have letters(or numbers) in the string.
  const compare = (a, b) => {
    const isNumA = typeof a === "number";
    const isNumB = typeof b === "number";

    if (isNumA && isNumB) {
      return a - b;
    }
    if (isNumA && !isNumB) {
      return -1;
    }
    if (!isNumA && isNumB) {
      return 1;
    }
    // both strings
    return a.localeCompare(b);
  };

  const quickSort = (arr) => {
    if (arr.length < 2) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [],
      middle = [],
      right = [];

    for (const elem of arr) {
      const cmp = compare(elem, pivot);
      if (cmp < 0) left.push(elem);
      else if (cmp > 0) right.push(elem);
      else middle.push(elem);
    }

    return [...quickSort(left), ...middle, ...quickSort(right)];
  };

  // work on a copy so we don’t mutate the input
  return quickSort([...arr]);
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: "Matthew",
  lastName: "Allen",
  studentId: "20035604",
};
