/*
Given a string, you will construct a camel case version of the string, based on the spaces in words in the string

You must check:

That the string exist
The length of the string is greater than 0
The string is of the proper type
If any of those conditions fails, the function will throw.

camelCase('my function rocks'); // Returns: "myFunctionRocks"
camelCase('FOO BAR'); // Returns: "fooBar"
camelCase("How now brown cow"); // Returns: "howNowBrownCow"
camelCase(); // Throws Error
camelCase(''); // Throws Error
camelCase(123); // Throws Error
camelCase(["Hello", "World"]); // Throws Error
*/
export let camelCase = (str) => {
  if (str === undefined || str === null) {
    throw "Error: Input must be supplied.";
  }
  if (typeof str !== "string") {
    throw "Error: Input must be a string.";
  }
  if (str.trim().length === 0) {
    throw "Error: String cannot be empty or contain only spaces.";
  }

  const words = str
    .toLowerCase()
    .split(" ")
    .filter((word) => word);

  return words
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

/*
This function will take in a string (str) and an array of indexes (idxArr). The function will find the characters at the given indexes in the string, then for each index, replace any future occurrences of that character in the string with a combination of alternating characters surrounding that index.

The function must check:

Ensure the string exists and has a length greater than 0.
Ensure the string is of the proper type.
Ensure the string is not just empty spaces.
Ensure idxArr is an array of valid indexes.
Ensure that each index in idxArr is valid within the string.
Each index must be greater than 0 and less than or equal to the length of the string minus 2 (since we are grabbing the characters before and after the index).
If any of these conditions fail, the function should throw an error.

replaceCharsAtIndexes("Daddy", [2]); // Returns: "Daday"
replaceCharsAtIndexes("abcabc", [1, 4]); // Returns: "abcaac"
replaceCharsAtIndexes("mississippi", [1, 4, 7]);  //Returns: "missmssspps"
replaceCharsAtIndexes("foobar", [0]); // Throws Error
replaceCharsAtIndexes("", [1]); // Throws Error
replaceCharsAtIndexes(12345, [2]); // Throws Error
replaceCharsAtIndexes("string", [0, 6]); // Throws Error
*/
export let replaceCharsAtIndexes = (str, idxArr) => {
  if (!str || typeof str !== "string" || str.trim().length === 0) {
    throw "Error: Input string must exist, be a non-empty string, and not contain only spaces.";
  }
  if (!Array.isArray(idxArr)) {
    throw "Error: The second argument must be an array of indexes.";
  }
  if (idxArr.length === 0) {
    return str;
  }

  const strLen = str.length;
  for (const idx of idxArr) {
    if (typeof idx !== "number" || !Number.isInteger(idx)) {
      throw `Error: Index "${idx}" is not a valid integer.`;
    }
    if (idx <= 0 || idx >= strLen - 1) {
      throw `Error: Index ${idx} is out of the valid bounds (must be > 0 and < ${
        strLen - 1
      }).`;
    }
  }

  const actions = new Array(strLen).fill(null);

  for (const triggerIdx of idxArr) {
    const targetChar = str[triggerIdx];
    const leftChar = str[triggerIdx - 1];
    const rightChar = str[triggerIdx + 1];
    let alternationCount = 0;

    for (let i = triggerIdx + 1; i < strLen; i++) {
      if (str[i] === targetChar) {
        actions[i] = alternationCount % 2 === 0 ? leftChar : rightChar;
        alternationCount++;
      }
    }
  }

  const finalChars = str.split("");
  for (let i = 0; i < strLen; i++) {
    if (actions[i] !== null) {
      finalChars[i] = actions[i];
    }
  }

  return finalChars.join("");
};

/*
Write a function compressString(str) that compresses a string by replacing consecutive repeating characters with the character followed by the count of its repetitions. For example, “heeello” would be compressed to “he3l2o”. If a character appears only once, it should remain unchanged. Consecutive characters are considered case sensitive i.e. a != A

You must check:

that the input parameter str exists
that str is a non-empty string, and is not just spaces.
compressString("aaabbccc");  // Returns: "a3b2c3"  

compressString("hello");  // Returns: "hel2o"  

compressString("hi world");  // Returns: "hi world"  

compressString("aaAA");  // Returns: "a2A2"  

compressString("");  // Throws error  

compressString("    ");  // Throws error  
NOTE: In the above example of the output, you should NOT return it with quotes. The quotes are there to denote that you are returning a string.  In your function, you just return the string.  If you add quotes to your output, points will be deducted.

let returnValue = "myFunctionRocks"
return returnValue //This is the correct way to return it
return `"${returnValue}"` //This is NOT correct
return '"' + returnValue + '"' //This is NOT correct
*/
export let compressString = (str) => {
  if (!str || typeof str !== "string") {
    throw "Error: Input must be a valid string.";
  }
  if (str.trim().length === 0) {
    throw "Error: String cannot be empty or consist only of spaces.";
  }

  let compressedResult = "";
  for (let i = 0; i < str.length; i++) {
    let count = 1;
    const currentChar = str[i];

    while (i + 1 < str.length && str[i + 1] === currentChar) {
      count++;
      i++;
    }

    if (count > 1) {
      compressedResult += currentChar + count;
    } else {
      compressedResult += currentChar;
    }
  }

  return compressedResult;
};
