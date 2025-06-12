import axios from "axios";

let ppl = null;
let corps = null;
const getAllCorps = async () => {
  if (!corps) {
    try {
      const res = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
      );

      if (res.data) {
        corps = res.data;
      } else {
        throw "No data recieved from the API!";
      }
    } catch (error) {
      throw `Error fetching data: ${error}`;
    }
  }

  return corps;
};
const getAllPeople = async () => {
  if (!ppl) {
    try {
      const res = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
      );

      if (res.data) {
        ppl = res.data;
      } else {
        throw "No data recieved from the API!";
      }
    } catch (error) {
      throw `Error fetching data: ${error}`;
    }
  }

  return ppl;
};

//Export the following functions using ES6 Syntax
export const listEmployees = async (companyName) => {
  if (!corps) await getAllCorps();
  if (!ppl) await getAllPeople();

  // Error checking for the companyName argument
  if (!companyName || typeof companyName !== "string") {
    throw "The companyName argument must be a string.";
  }

  companyName = companyName.trim();
  if (companyName.length === 0) {
    throw "The companyName argument cannot be empty or just spaces.";
  }

  // Find the company in a case-insensitive manner
  const lowercasedCompanyName = companyName.toLowerCase();
  const company = corps.find(
    (comp) => comp.name.toLowerCase() === lowercasedCompanyName
  );

  // Throw an error if the company is not found
  if (!company) {
    throw `No company found with the name '${companyName}'.`;
  }

  // Find all employees for that company
  const employees = ppl.filter((person) => person.company_id === company.id);

  // Sort employees alphabetically by last name
  employees.sort((a, b) => a.last_name.localeCompare(b.last_name));

  // Format the employee names
  const employeeNames = employees.map(
    (emp) => `${emp.first_name} ${emp.last_name}`
  );

  // Construct the final object
  const result = {
    ...company,
    employees: employeeNames,
  };

  return result;
};

export const sameIndustry = async (industry) => {
  if (!corps) await getAllCorps();

  // Error checking for the industry argument
  if (!industry || typeof industry !== "string") {
    throw "The industry argument must be a string.";
  }

  industry = industry.trim();
  if (industry.length === 0) {
    throw "The industry argument cannot be empty or just spaces.";
  }

  const lowercasedIndustry = industry.toLowerCase();

  // Filter the companies by industry
  const companiesInIndustry = corps.filter(
    (company) => company.industry.toLowerCase() === lowercasedIndustry
  );

  // If no companies are found for the given industry, throw an error
  if (companiesInIndustry.length === 0) {
    throw `Error: No companies found in the '${industry}' industry.`;
  }

  return companiesInIndustry;
};

export const getCompanyById = async (id) => {
  if (!corps) await getAllCorps();

  // Error checking for the id argument
  if (!id || typeof id !== "string") {
    throw "The id argument must be a string.";
  }

  id = id.trim();
  if (id.length === 0) {
    throw "The id argument cannot be an empty string or just spaces.";
  }

  // Find the company with the matching id
  const company = corps.find((c) => c.id === id);

  // If no company is found, throw an error
  if (!company) {
    throw "Company not found";
  }

  return company;
};
