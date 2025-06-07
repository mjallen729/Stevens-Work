/*
In your app.js file, you must import all the functions the modules you created above export and create one passing and one failing test case for each function in each module. So you will have a total of 18 function calls (there are 9 total functions)

For example:

// Mean Tests
try {
   // Should Pass
   const meanOne = mean([2, 3, 4]);
   console.log('mean passed successfully');
} catch (e) {
   console.error('mean failed test case');
}
try {
   // Should Fail
   const meanTwo = mean(1234);
   console.error('mean did not error');
} catch (e) {
   console.log('mean failed successfully');
}
Requirements
Write each function in the specified file and export the function so that it may be used in other files.
Ensure to properly error check for different cases such as arguments existing and of the proper type as well as throw if anything is out of bounds such as invalid array index.
Import ALL exported module functions and write 2 test cases for each in app.js.
Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
do NOT have the files in any folders, they should be in the root of the zip file
You are not allowed to use any npm dependencies for this lab.
*/
import * as arrayUtils from "./arrayUtils.js";
import * as objectUtils from "./objectUtils.js";
import * as stringUtils from "./stringUtils.js";

const test = (testName, testcase) => {
  try {
    testcase();
    console.log(`${testName} passed!`);
  } catch (e) {
    console.error(`${testName} failed!`);
  }
};

const badTest = (testName, testcase) => {
  try {
    testcase();
    console.error(`${testName} did not fail!`);
  } catch (e) {
    console.log(`${testName} passed!`);
  }
};

// Array utils
test("arrayStats", () => {
  arrayUtils.arrayStats([1, 2, 3, 4, 5, 6, 7, 8, 8]);
});
badTest("arrayStats", () => {
  arrayUtils.arrayStats([]);
});

test("mergeCommonElements", () => {
  arrayUtils.mergeCommonElements([1, 2, 3], [4, 5, 3], [7, 8, 9, 3, 1]);
});
badTest("mergeCommonElements", () => {
  arrayUtils.mergeCommonElements([1, 2, 3], []);
});

test("numberOfOccurrences", () => {
  arrayUtils.numberOfOccurrences([1, 2, 3, "hi"], ["hi", 1, 9, 10]);
});
badTest("numberOfOccurrences", () => {
  arrayUtils.numberOfOccurrences([1, 2, "3"], "3", [9, 10]);
});

// Object utils
test("deepEquality", () => {
  objectUtils.deepEquality({ a: 1, b: 2 }, { a: 1, b: 2 });
});
badTest("deepEquality", () => {
  objectUtils.deepEquality([1, 2, 3], "hi");
});

test("commonKeysValues", () => {
  objectUtils.commonKeysValues({ a: 1, b: 2 }, { z: 1, a: 1, r: 3 });
});
badTest("commonKeysValues", () => {
  objectUtils.commonKeysValues("this", "test");
});

test("calculateObject", () => {
  objectUtils.calculateObject({ a: 4, b: 3, r: 6 }, (n) => n * 5);
});
badTest("calculateObject", () => {
  objectUtils.calculateObject([4, 3, 6], (n) => n * 5);
});

// String utils
test("camelCase", () => {
  stringUtils.camelCase("hello world!");
});
badTest("camelCase", () => {
  stringUtils.camelCase(["hello", "world!"]);
});

test("replaceCharsAtIndexes", () => {
  stringUtils.replaceCharsAtIndexes("Helloeoeooo", [1]);
});
badTest("replaceCharsAtIndexes", () => {
  stringUtils.replaceCharsAtIndexes("", [3]);
});

test("compressString", () => {
  stringUtils.compressString("hhelllooooooooo");
});
badTest("compressString", () => {
  stringUtils.compressString("");
});
