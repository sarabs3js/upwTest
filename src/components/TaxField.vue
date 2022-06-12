<template>
  <div>
    <label>Tax:</label>
    <input
      type="text"
      name="tax"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="validateInput($event.target.value)"
      @blur="validateInput($event.target.value)"
    />
    <span v-if="errors.tax" class="errorMessage">{{ errors.tax }}</span>
  </div>
</template>

<script>
import useFormValidation from "@/modules/useFormValidation";
import { ref } from "vue";
export default {
  setup(props) {
    const touched = ref(false);
    const { validateTaxField, errors } = useFormValidation();
    const validateInput = (value) => {
      touched.value = true;
      validateTaxField("tax", value, props.country);
    };
    return { errors, validateInput, touched };
  },

  props: {
    country: {
      type: String,
    },
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  // HANDLE EDGE CASE IF USER TRIES TO CHANGE COUNTRY AFTER TAX FIELD
  watch: {
    country: function (newVal, oldVal) {
      if (this.touched) {
        console.log("Prop changed: ", newVal, " | was: ", oldVal);
        this.validateInput(this.$props.modelValue);
      }
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
