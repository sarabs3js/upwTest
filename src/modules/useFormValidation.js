import { reactive } from "@vue/reactivity";
import useValidators from "@/modules/useValidators";

const errors = reactive({});

export default function useFormValidation() {
  const { isEmpty, minLength, validCountry, taxInput } = useValidators();
  const validateNameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 3);
  };
  const validateTaxField = (fieldName, fieldValue, country) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : taxInput(fieldName, fieldValue, country);
  };
  const validateCountryField = (fieldName, fieldValue, countriesList) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : validCountry(fieldName, fieldValue, countriesList);
  };
  return { errors, validateNameField, validateTaxField, validateCountryField };
}
