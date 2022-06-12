import { computed } from "vue";

export default function useSubmitButton(fields, errors) {
  const isButtonDisabled = computed(() => {
    let disabled = true;
    for (let prop in fields) {
      if (!fields[prop] || errors[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });

  return { isButtonDisabled };
}
