import { countriesList } from "../data";

export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
  };
  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `The ${fieldName} field must be atleast ${min} characters long`
      : "";
  };
  const validCountry = (fieldName, fieldValue, countries) => {
    return countries.find((country) => country.name === fieldValue)
      ? ""
      : "Please select a valid country.";
  };
  const taxInput = (fieldName, fieldValue, country) => {
    const message = `${fieldName} number is not valid.`;
    if (!country) return message;
    const selectedCountry = countriesList.find(
      (countries) => countries.name === country
    );
    if (!selectedCountry) return message;
    return RegExp(selectedCountry.tax).test(fieldValue) ? "" : message;
  };
  return { isEmpty, minLength, validCountry, taxInput };
}
