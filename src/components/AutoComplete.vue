<template>
  <div class="autocomplete">
    <label>Country:</label>
    <input
      class="input"
      type="text"
      name="country"
      autocomplete="off"
      @input="onChange"
      v-model="search"
      @keydown.down="increment"
      @keydown.up="decrement"
      @keydown.enter="onEnter"
    />
    <span v-if="errors.country" class="errorMessage">{{ errors.country }}</span>
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="result.code"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === counter }"
      >
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
import useAutoComplete from "@/modules/useAutoComplete";
import useSearchResults from "@/modules/useSearchResults";
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  setup(props) {
    let search = ref(null);
    const { counter, increment, decrement, reset } = useAutoComplete();
    const { validateCountryField, errors } = useFormValidation();
    const { results, filterResults } = useSearchResults(props.items);

    const filterResult = () => {
      filterResults(search.value);
    };
    const validateInput = () => {
      validateCountryField("country", search.value, props.items);
    };
    return {
      search,
      errors,
      validateInput,
      counter,
      increment,
      decrement,
      results,
      filterResult,
      reset,
    };
  },
  name: "AutoComplete",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    setResult(result) {
      this.search = result.name;
      this.isOpen = false;
      this.$emit("update:modelValue", this.search);
      this.validateInput();
    },
    onChange() {
      this.$emit("update:modelValue", this.search);
      this.validateInput();

      this.filterResult();
      this.isOpen = true;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.validateInput("blur");
        this.reset();
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter].name;
      this.isOpen = false;
      this.reset();
      this.$emit("update:modelValue", this.search);
    },
  },
};
</script>

<style scoped>
.autocomplete {
  position: relative;
}
.input {
  display: block;
  width: 100%;
  border: 1px solid #ddd;
  padding: 1rem 0.5rem;
  border-radius: 0.25rem;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  position: absolute;
  z-index: 20;
  background-color: white;
  width: 100%;
  font-size: 0.75rem;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4f85c6;
  color: white;
}

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
