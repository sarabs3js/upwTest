<template>
  <form @submit.prevent ref="submitForm">
    <h3>Register Form</h3>
    <NotificationMessage
      message="Error in submitting the form"
      type="error"
      v-if="error"
    />
    <NotificationMessage
      message="User is registered Successfully!"
      type="success"
      v-if="success"
    />
    <UsernameField v-model="fields.username" />
    <AutoComplete :items="countriesList" v-model="fields.country" />
    <TaxField v-model="fields.tax" :country="fields.country" />
    <button
      id="submitButton"
      class="submitButton"
      @click="submitForm"
      type="submit"
      :disabled="isButtonDisabled"
    >
      Submit
    </button>
  </form>
</template>

<script>
import UsernameField from "@/components/UsernameField.vue";
import AutoComplete from "@/components/AutoComplete.vue";
import NotificationMessage from "@/components/NotificationMessage.vue";
import TaxField from "@/components/TaxField.vue";
import { reactive, ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
import useSubmitButton from "@/modules/useSubmitButton";
import { countriesList } from "@/data";
import registerForm from "@/network/registerUser";
export default {
  components: { UsernameField, TaxField, AutoComplete, NotificationMessage },
  setup() {
    const initialState = {
      username: "",
      country: "",
      tax: "",
    };
    const fields = reactive({ ...initialState });
    let error = ref(false);
    let success = ref(false);
    let loading = ref(false);

    function resetForm() {
      Object.assign(fields, initialState);
    }

    const { errors } = useFormValidation();
    const { isButtonDisabled } = useSubmitButton(fields, errors);

    return {
      fields,
      isButtonDisabled,
      error,
      success,
      resetForm,
      loading,
    };
  },
  data() {
    return {
      countriesList: countriesList,
    };
  },
  methods: {
    submitForm: async function () {
      const response = await registerForm(this.fields);
      if (!response.status) {
        this.error = true;
        this.success = false;
        this.loading = false;
        return;
      }
      this.error = false;
      this.success = true;
      this.loading = false;
      this.$refs.submitForm.reset();
    },
  },
};
</script>
<style scoped>
form {
  max-width: 420px;
  margin: 100px auto;
  border-radius: 1rem;
  background-color: white;
  padding: 4rem;
}
h3 {
  font-weight: 800;
  margin-bottom: 2rem;
}
h3::after {
  height: 4px;
  width: 60px;
  background-color: #ff661a;
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
}

.submitButton {
  margin-top: 1rem;
  cursor: pointer;
  background-color: #fe6419;
  transition: 0.3s;
  font-weight: bolder;
  border: none;
}
.submitButton:hover {
  background-color: #cf4b09;
}
.submitButton {
  display: block;
  width: 100%;
  padding: 1rem 0.5rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  cursor: pointer;
  background-color: #fe6419;
  transition: 0.3s;
  font-weight: bolder;
  border: none;
}
.submitButton:disabled {
  opacity: 0.5;
}
.submitButton:hover {
  background-color: #cf4b09;
}
</style>
