import axios from "axios";

let ppl = null;
const getAllPeople = async () => {
  if (!ppl) {
    try {
      const res = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
      );

      if (res.data) {
        ppl = res.data;
      } else {
        console.error("No data recieved from the API!");
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }

  return ppl;
};

//Export the following functions using ES6 Syntax
export const getPersonById = async (id) => {
  if (!ppl) await getAllPeople();

  if (!id || typeof id !== "string") {
    throw `id parameter must be a string, but received a ${typeof id}`;
  }

  id = id.trim();
  if (id.length === 0) {
    throw "id parameter cannot be empty";
  }

  const person = ppl.find((p) => p.id === id);

  // If the id is not found, throw an error
  if (!person) {
    throw "Person not found";
  }

  return person;
};

export const sameJobTitle = async (jobTitle) => {
  if (!ppl) await getAllPeople();

  // Error checking for the jobTitle argument
  if (!jobTitle || typeof jobTitle !== "string") {
    throw "jobTitle argument must be a string.";
  }

  jobTitle = jobTitle.trim();
  if (jobTitle.length === 0) {
    throw "jobTitle argument cannot be empty";
  }

  // Find people with the same job title (case-insensitive)
  const lowercasedJobTitle = jobTitle.toLowerCase();
  const result = ppl.filter(
    (person) => person.job_title.toLowerCase() === lowercasedJobTitle
  );

  // Check if at least two people were found
  if (result.length < 2) {
    throw `Less than two people found with the job title '${jobTitle}'.`;
  }

  return result;
};

export const getPostalCodes = async (city, state) => {
  if (!ppl) await getAllPeople();

  // Error checking for city argument
  if (!city || typeof city !== "string") {
    throw "The city argument must be a string.";
  }

  city = city.trim();
  if (city.length === 0) {
    throw "The city argument cannot be empty or just spaces.";
  }

  // Error checking for state argument
  if (!state || typeof state !== "string") {
    throw "The state argument must be a string.";
  }

  state = state.trim();
  if (state.length === 0) {
    throw "The state argument cannot be empty or just spaces.";
  }

  // Normalize inputs for case-insensitive
  const lowerCaseCity = city.toLowerCase();
  const lowerCaseState = state.toLowerCase();

  const postalCodes = ppl
    .filter(
      (person) =>
        person.city.toLowerCase() === lowerCaseCity &&
        person.state.toLowerCase() === lowerCaseState
    )
    .map((person) => person.postal_code);

  if (postalCodes.length === 0) {
    throw "There are no postal_code for the given city and state.";
  }

  // Sort the array from lowest to highest
  postalCodes.sort((a, b) => Number(a) - Number(b));

  return postalCodes;
};

export const sameCityAndState = async (city, state) => {
  if (!ppl) await getAllPeople();

  // Error checking for city argument
  if (!city || typeof city !== "string") {
    throw "The city argument must be a string.";
  }

  city = city.trim();
  if (city.length === 0) {
    throw "The city argument cannot be empty or just spaces.";
  }

  // Error checking for state argument
  if (!state || typeof state !== "string") {
    throw "The state argument must be a string.";
  }

  state = state.trim();
  if (state.length === 0) {
    throw "The state argument cannot be empty or just spaces.";
  }

  // Normalize inputs for case-insensitive
  const lowerCaseCity = city.toLowerCase();
  const lowerCaseState = state.toLowerCase();

  // Filter people by city and state
  const peopleInLocation = ppl.filter(
    (person) =>
      person.city.toLowerCase() === lowerCaseCity &&
      person.state.toLowerCase() === lowerCaseState
  );

  // Check if at least two people were found
  if (peopleInLocation.length < 2) {
    throw `There are not at least two people who live in ${city}, ${state}.`;
  }

  // Sort the array alphabetically by last name
  peopleInLocation.sort((a, b) => a.last_name.localeCompare(b.last_name));

  // Map the sorted array to "FirstName LastName" strings
  const result = peopleInLocation.map(
    (person) => `${person.first_name} ${person.last_name}`
  );

  return result;
};
