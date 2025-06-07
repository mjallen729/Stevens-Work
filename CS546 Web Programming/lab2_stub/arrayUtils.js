/*
This function will return an object with the following stats of an array: mean, median, mode, range, minimum, maximum, count and sum. You will first sort the array from lowest to highest numbers before performing your calculations. 

Note: If there is no mode, you will return 0 for that key. If there is more than one mode, you will return an array for the mode that has all the modes as elements (sorted by lowest to highest number).  

Reminder: The order of the keys of an object do not matter. For example: {a: 1, b:2. c:3} is the same as/equal to {c:3, a:1, b:2}

You must check:

That the array exists
The array is of the proper type (meaning, it's an array)
The array is not empty
Each array element is a number (can be positive, negative, decimal, zero)
If any of those conditions fail, you will throw an error.

arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20]); // Returns: { mean: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }

arrayStats([7, 9, 11, 15, 19, 20, 35, 0]); // Returns: { mean: 14.5, median: 13, mode: 0, range: 35, minimum: 0, maximum: 35, count: 8, sum: 116 }

arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]); // Returns: { mean: 36.4, median: 36.5, mode: [11,54], range: 125, minimum: -25, maximum: 100, count: 10, sum: 364 }

arrayStats([]) // throws an error 
arrayStats("banana"); // throws an error
arrayStats(["guitar", 1, 3, "apple"]); // throws an error 
arrayStats(); // throws an error
*/
export let arrayStats = (array) => {
  if (!array || !Array.isArray(array)) {
    throw "Error: Input must be a valid array.";
  }
  if (array.length <= 0) {
    throw "Error: Array cannot be empty.";
  }

  for (const element of array) {
    if (typeof element != "number" || !isFinite(element) || isNaN(element)) {
      throw "Error: All array elements must be finite numbers.";
    }
  }

  const sorted = [...array].sort((a, b) => a - b);
  const count = sorted.length;

  const sum = sorted.reduce((prev, curr) => prev + curr, 0);
  const mean = sum / count;
  const minimum = sorted[0];
  const maximum = sorted[count - 1];
  const range = maximum - minimum;

  const midIndex = Math.floor(count / 2);
  const median =
    count % 2 === 0
      ? (sorted[midIndex - 1] + sorted[midIndex]) / 2
      : sorted[midIndex];

  const freqs = {};
  let maxFreq = 0;
  for (const num of sorted) {
    freqs[num] = (freqs[num] || 0) + 1;
    if (freqs[num] > maxFreq) {
      maxFreq = freqs[num];
    }
  }

  let mode;
  const modes = [];
  let allSameFreq = true;
  const firstFreq = freqs[sorted[0]];

  for (const num in freqs) {
    if (freqs[num] !== firstFreq) {
      allSameFreq = false;
    }
    if (freqs[num] === maxFreq) {
      modes.push(Number(num));
    }
  }

  if (allSameFreq) {
    mode = 0;
  } else if (modes.length === 1) {
    mode = modes[0];
  } else {
    mode = modes;
  }

  return {
    mean,
    median,
    mode,
    range,
    minimum,
    maximum,
    count,
    sum,
  };
};

/*
For this function, you will have to take into account a variable number of input parameters. You will take in arrays as input.  You will merge only the elements that are common to every array into one array.  You will sort that array numerically first, and then alphabetically (if there are strings in the array). If you called mergeCommonElements([3,0,4,5,1], [1,2,0,8,15,3], [6,3,10,25,1,29,0]) You would return: [0,1,3]. If you calledmergeCommonElements[3,0,25, 29,"Lab2",2,"Aiden"], ["CS-546" ,”Lab2”,25, "Computer Science",29, 8,15], [6,3,"Patrick",”Lab2”,25,29]) You would return:  [25, 29, “Lab2”]

For the elements that are strings, you will use the ASCII sort order to sort them For example: ["!Patrick","Aiden","CS-546","Computer Science", "Lab2"]would be sorted in ASCII order.

You must also account for nested array cases For example: If you called

mergeCommonElements(["bar", 0, 8, 1, [[[5, “fizz”, "foo"]]]], [7, “foo”, "buzz", ["fizz", 8]])

You would return:

[8, “fizz”, "foo"]

You must check:

At least TWO arrays are supplied as input
Each input is of proper type (meaning, it's an array)
Each array is not empty and has at least one element
Each array element is either a string,  number or an array that has either strings or numbers as elements. You will need to flatten the array first (strings with just spaces are allowed as a space can be sorted using the ASCII sort order method).  
If any of those conditions fail, you will throw an error.

While you are required to trim all string inputs for most of the functions, this one does not need to be trimmed as a string with just spaces is valid for this function 

mergeCommonElements([3, 4, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3,]) //returns [1, 3]
mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"]) //returns [-4, 3, 24, "abc"]
mergeCommonElements([5, 3, "apple", "banana"], [5, "banana", 2, 4], [1, 5, "apple", "banana", 0]) // returns [5, "banana"]
mergeCommonElements([4, [5, "apple"], 3], [3, 4, [5, "apple"]], [3, "apple", 6, 7]) // returns [3, "apple"]
mergeCommonElements(["apple", "apple"], ["apple", "apple", "banana"], ["apple", "apple", "mango"]) // returns ["apple"]
mergeCommonElements([1, 2, 3], "string", [4, 5, 6]) // throws an error
mergeCommonElements([1, 2, 3], [], [4, 5, 6]) // throws an error
*/
export let mergeCommonElements = (...arrays) => {
  if (arrays.length < 2) {
    throw "Error: At least two arrays must be supplied as input.";
  }

  const processedArrays = [];

  for (const arr of arrays) {
    if (!Array.isArray(arr)) {
      throw "Error: Each input must be an array.";
    }
    if (arr.length === 0) {
      throw "Error: Input arrays cannot be empty.";
    }

    const flatArr = arr.flat(Infinity);

    if (flatArr.length === 0) {
      throw "Error: After flattening, arrays cannot be empty.";
    }

    for (const el of flatArr) {
      if (typeof el !== "number" && typeof el !== "string") {
        throw "Error: Array elements must be either strings or numbers.";
      }
    }
    processedArrays.push(flatArr);
  }

  let commonElements = processedArrays[0];

  for (let i = 1; i < processedArrays.length; i++) {
    const currentSet = new Set(processedArrays[i]);
    commonElements = commonElements.filter((el) => currentSet.has(el));
  }

  const finalResult = [...new Set(commonElements)];

  finalResult.sort((a, b) => {
    const aIsNumber = typeof a === "number";
    const bIsNumber = typeof b === "number";

    if (aIsNumber && !bIsNumber) return -1;
    if (!aIsNumber && bIsNumber) return 1;

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  return finalResult;
};

/*
For this function, you will have to take into account a variable number of input parameters. This function takes in  multiple arrays of numbers or strings and returns an object where the keys are the numbers and the values are the number of times they appear in the array.

That each input parameter supplied is and array.
The each input parameter is of the proper type (meaning, it's an array)
Each array element in each array supplied is a number (can be positive, negative, decimal, zero) or a string.
Each string that is an element in the array should ONLY be letters (uppercase or lowercase).
Each array supplied as input must have AT LEAST one element in the array that is either a number or a string of letters. 
If any of those conditions fail, you will throw an error.

numberOfOccurrences([1, 2, 3], [4,5,6,1], [2,5,6,3]); // Should return: {'1': 2, '2': 2, '3': 2, '4': 1, '5': 2, '6': 2} 
numberOfOccurrences([1, "foo", "bar"], ["bar", 5, 6, 1], ["foo", 5, 6, 3]); // Should return: {'1': 2, '3': 1,'5': 2, '6': 2, foo: 2, bar: 2} 
numberOfOccurrences(["key", "value"], [], ["key", "value"]); // Throws an error 
numberOfOccurrences(["key", "value"], "not an array", ["key", "value"]); // Throws an error 
numberOfOccurrences(); // Throws an error
*/
export let numberOfOccurrences = (...arrays) => {
  if (arrays.length === 0) {
    throw "Error: At least one array must be provided as input.";
  }

  const occurrences = {};
  const letterRegex = /^[a-zA-Z]+$/;

  for (const arr of arrays) {
    if (!Array.isArray(arr)) {
      throw "Error: All input parameters must be arrays.";
    }
    if (arr.length === 0) {
      throw "Error: Input arrays cannot be empty.";
    }

    for (const element of arr) {
      const elementType = typeof element;

      if (elementType === "number") {
        if (!isFinite(element)) {
          throw "Error: All number elements must be finite.";
        }
        occurrences[element] = (occurrences[element] || 0) + 1;
      } else if (elementType === "string") {
        if (!letterRegex.test(element)) {
          throw "Error: String elements must only contain letters.";
        }
        occurrences[element] = (occurrences[element] || 0) + 1;
      } else {
        throw "Error: Array elements must be either a number or a string.";
      }
    }
  }

  return occurrences;
};
