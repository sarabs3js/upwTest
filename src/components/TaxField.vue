<template>
  <div>
    <label>Tax:</label>
    <input
      type="text"
      name="tax"
      v-model="tax"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="validateInput"
      @blue="validateInput"
    />
    <span v-if="errors.tax" class="errorMessage">{{ errors.tax }}</span>
  </div>
</template>

<script>
import { ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
export default {
  setup(props) {
    let tax = ref(null);
    const { validateTaxField, errors } = useFormValidation();
    const validateInput = () => {
      validateTaxField("tax", tax.value, props.country);
    };
    return { tax, errors, validateInput };
  },

  props: {
    country: {
      type: String,
    },
  },
};
</script>
<style scoped>
label {
  margin: 1rem 0 0.25rem;
  color: #444;
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
}
input {
  display: block;
  width: 100%;
  border: 1px solid #ddd;
  padding: 1rem 0.5rem;
  border-radius: 0.25rem;
}

.errorMessage {
  color: #ff661a;
  font-size: 0.7rem;
  text-align: left;
}
</style>
