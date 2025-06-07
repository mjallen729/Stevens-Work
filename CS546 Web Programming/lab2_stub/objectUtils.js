/*
This method checks each field (at every level deep) in obj1 and obj2 for equality. It will return true if each field is equal, and false if not. Note: Empty objects can be passed into this function. 

For example, if given the following:

const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
console.log(deepEquality(first, second)); // false
console.log(deepEquality(forth, fifth)); // true
console.log(deepEquality(forth, third)); // false
console.log(deepEquality({}, {})); // true
console.log(deepEquality([1,2,3], [1,2,3])); // throws error 
console.log(deepEquality("foo", "bar")); // throws error
You must check:

That obj1 and obj2 exists and is of proper type (an Object).  If not, throw and error. 
Hint: Using recursion is the best way to solve this one.

Remember: The order of the keys is not important so: {a: 2, b: 4} is equal to {b: 4, a: 2} 
*/
export let deepEquality = (obj1, obj2) => {
  const isPlainObject = (val) => {
    return val !== null && typeof val === "object" && !Array.isArray(val);
  };

  if (!isPlainObject(obj1) || !isPlainObject(obj2)) {
    throw "Error: Both arguments must be valid objects.";
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    const areBothObjects = isPlainObject(val1) && isPlainObject(val2);

    if (areBothObjects) {
      if (!deepEquality(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
};

/* 
This method checks each field (at every level deep) in obj1 and obj2 and finds the common key/value pairs that appear in both obj1 and obj2.  You will return an object with the common keys/value pairs. if two empty objects are passed in or there are no common key/value pairs, just return an empty object.

For example, if given the following:

const first = {name: {first: "Patrick", last: "Hill"}, age: 46};
const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
const third = {a: 2, b: {c: true, d: false}};
const forth = {b: {c: true, d: false}, foo: "bar"};

console.log(commonKeysValues(first, second)); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"} 
console.log(commonKeysValues(third, forth)); // returns {b: {c: true, d: false}, c: true, d: false }
console.log(commonKeysValues({}, {})); // {}
console.log(commonKeysValues({a: 1}, {b: 2})); // {}
console.log(commonKeysValues([1,2,3], [1,2,3])); // throws error 
console.log(commonKeysValues("foo", "bar")); // throws error
You must check:

That obj1 and obj2 exists and is of proper type (an Object).  If not, throw and error. 
Remember: The order of the keys is not important so: {a: 2, b: 4} is equal to {b: 4, a: 2}
*/
export let commonKeysValues = (obj1, obj2) => {
  const isPlainObject = (val) => {
    return val !== null && typeof val === "object" && !Array.isArray(val);
  };

  if (!isPlainObject(obj1) || !isPlainObject(obj2)) {
    throw "Error: Both arguments must be valid objects.";
  }

  const deepEquality = (o1, o2) => {
    // A nested implementation for checking if object values are equal.
    if (!isPlainObject(o1) || !isPlainObject(o2)) return false;
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      const val1 = o1[key];
      const val2 = o2[key];
      const areBothObjects = isPlainObject(val1) && isPlainObject(val2);
      if (areBothObjects && !deepEquality(val1, val2)) {
        return false;
      }
      if (!areBothObjects && val1 !== val2) {
        return false;
      }
    }
    return true;
  };

  const result = {};

  const findCommons = (currentObj1, currentObj2) => {
    for (const key of Object.keys(currentObj1)) {
      if (currentObj2.hasOwnProperty(key)) {
        const val1 = currentObj1[key];
        const val2 = currentObj2[key];
        const areBothObjects = isPlainObject(val1) && isPlainObject(val2);

        if (areBothObjects) {
          if (deepEquality(val1, val2)) {
            result[key] = val1;
            // Recurse into the common nested object
            findCommons(val1, val2);
          }
        } else {
          if (val1 === val2) {
            result[key] = val1;
          }
        }
      }
    }
  };

  findCommons(obj1, obj2);
  return result;
};

/*
Given an object and a function, evaluate the function on the values of the object and then calculate the square root after you evaluate the function and return a new object with the results. Note, on the result, please use the toFixed(2) function to only display 2 decimal places rounded.

You must check:

That the object exists and is of proper type (an Object).  If not, throw and error. 
That the func exists and is of proper type (a function) If not, throw and error. 
That the object values are all numbers (positive, negative, decimal).  If not, throw an error
You can assume that the correct types will be passed into the func parameter since you are checking the types of the values of the object beforehand. 

calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2);
Returns:
{
  a: 2.45,
  b: 3.74,
  c: 3.16
}
*/
export let calculateObject = (object, func) => {
  if (object === null || typeof object !== "object" || Array.isArray(object)) {
    throw "Error: The first argument must be a valid object.";
  }

  if (typeof func !== "function") {
    throw "Error: The second argument must be a function.";
  }

  const result = {};
  const keys = Object.keys(object);

  for (const key of keys) {
    const value = object[key];

    if (typeof value !== "number" || !isFinite(value)) {
      throw "Error: All values in the object must be finite numbers.";
    }

    const funcResult = func(value);
    const sqrtResult = Math.sqrt(funcResult);

    if (isNaN(sqrtResult)) {
      throw `Error: The operation resulted in an invalid number (e.g., square root of a negative) for key "${key}".`;
    }

    result[key] = parseFloat(sqrtResult.toFixed(2));
  }

  return result;
};
