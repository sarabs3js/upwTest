<template>
  <div>
    <label>Username:</label>
    <input
      type="text"
      name="username"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="validateInput"
      @blur="validateInput"
    />
    <span v-if="errors.username" class="errorMessage">{{
      errors.username
    }}</span>
  </div>
</template>
<script>
import { ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
export default {
  setup() {
    const dirty = ref(false);
    const { validateNameField, errors } = useFormValidation();
    const validateInput = (e) => {
      if (!dirty.value && e.type !== "blur") {
        return;
      }
      validateNameField("username", e.target.value);
      dirty.value = true;
    };
    return { errors, validateInput, dirty };
  },

  props: ["modelValue"],
  emits: ["update:modelValue"],
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
