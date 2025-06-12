import {
  getPersonById,
  sameJobTitle,
  getPostalCodes,
  sameCityAndState,
} from "./people.js";

import { listEmployees, sameIndustry, getCompanyById } from "./companies.js";

async function main() {
  console.log("----------------- Testing people.js -----------------\n");

  // Test getPersonById
  try {
    const person = await getPersonById("41455e7d-b133-4aae-ac5d-a3a80567feb0");
    console.log("PASS: Found person:", person);
  } catch (e) {
    console.error("FAIL: getPersonById(valid id):", e);
  }
  try {
    await getPersonById(-1);
  } catch (e) {
    console.log("PASS: getPersonById(invalid id type) threw an error:", e);
  }
  try {
    await getPersonById("this-id-does-not-exist");
  } catch (e) {
    console.log("PASS: getPersonById(non-existent id) threw an error:", e);
  }

  // Test sameJobTitle
  try {
    const people = await sameJobTitle("Librarian");
    console.log(
      `PASS: Found ${people.length} people with job title "Librarian".`
    );
    // console.log(people);
  } catch (e) {
    console.error('FAIL: sameJobTitle("Librarian"):', e);
  }
  try {
    await sameJobTitle(123);
  } catch (e) {
    console.log("PASS: sameJobTitle(invalid type) threw an error:", e);
  }
  try {
    await sameJobTitle("      ");
  } catch (e) {
    console.log("PASS: sameJobTitle(empty string) threw an error:", e);
  }

  // Test getPostalCodes
  try {
    const postalCodes = await getPostalCodes(
      "Washington",
      "District of Columbia"
    );
    console.log("PASS: Found postal codes:", postalCodes);
  } catch (e) {
    console.error(
      'FAIL: getPostalCodes("Washington", "District of Columbia"):',
      e
    );
  }
  try {
    await getPostalCodes("Foo", "Bar");
  } catch (e) {
    console.log(
      "PASS: getPostalCodes(non-existent city/state) threw an error:",
      e
    );
  }
  try {
    await getPostalCodes();
  } catch (e) {
    console.log("PASS: getPostalCodes() threw an error:", e);
  }

  // Test sameCityAndState
  try {
    const people = await sameCityAndState("Washington", "District of Columbia");
    console.log(
      "PASS: Found people in Washington, District of Columbia:",
      people
    );
  } catch (e) {
    console.error(
      'FAIL: sameCityAndState("Washington", "District of Columbia"):',
      e
    );
  }
  try {
    await sameCityAndState("Bayside", "New York");
  } catch (e) {
    console.log(
      "PASS: sameCityAndState(fewer than 2 people) threw an error:",
      e
    );
  }
  try {
    await sameCityAndState("  ", "Texas");
  } catch (e) {
    console.log("PASS: sameCityAndState(empty city) threw an error:", e);
  }

  console.log("\n\n----------------- Testing companies.js -----------------");

  // Test listEmployees
  try {
    const company = await listEmployees("Yost, Harris and Cormier");
    console.log('PASS: Found employees for "Yost, Harris and Cormier".');
    console.log(company);
  } catch (e) {
    console.error('FAIL: listEmployees("Yost, Harris and Cormier"):', e);
  }
  try {
    await listEmployees("Fake Company LLC");
  } catch (e) {
    console.log("PASS: listEmployees(non-existent company) threw an error:", e);
  }
  try {
    await listEmployees();
  } catch (e) {
    console.log("PASS: listEmployees() threw an error:", e);
  }

  // Test sameIndustry
  try {
    const companies = await sameIndustry("Apparel");
    console.log(
      `PASS: Found ${companies.length} companies in the "Apparel" industry.`
    );
    // console.log(companies);
  } catch (e) {
    console.error('FAIL: sameIndustry("Apparel"):', e);
  }
  try {
    await sameIndustry("Fake Industry");
  } catch (e) {
    console.log("PASS: sameIndustry(non-existent industry) threw an error:", e);
  }
  try {
    await sameIndustry([]);
  } catch (e) {
    console.log("PASS: sameIndustry(invalid type) threw an error:", e);
  }

  // Test getCompanyById
  try {
    const company = await getCompanyById(
      "fb90892a-f7b9-4687-b497-d3b4606faddf"
    );
    console.log("PASS: Found company:", company);
  } catch (e) {
    console.error("FAIL: getCompanyById(valid id):", e);
  }
  try {
    await getCompanyById(123);
  } catch (e) {
    console.log("PASS: getCompanyById(invalid type) threw an error:", e);
  }
  try {
    await getCompanyById("this-id-does-not-exist");
  } catch (e) {
    console.log("PASS: getCompanyById(non-existent id) threw an error:", e);
  }
}

main();
