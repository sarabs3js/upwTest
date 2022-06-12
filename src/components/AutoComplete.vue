<template>
  <div class="autocomplete">
    <label>Country:</label>
    <input
      class="input"
      type="text"
      name="country"
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <span v-if="errors.country" class="errorMessage">{{ errors.country }}</span>
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="result.code"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
export default {
  data() {
    return {
      isOpen: false,
      results: [],
      arrowCounter: 0,
    };
  },
  setup(props) {
    let search = ref(null);
    const { validateCountryField, errors } = useFormValidation();
    const validateInput = () => {
      validateCountryField("country", search.value, props.items);
    };
    return { search, errors, validateInput };
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
    filterResults() {
      this.results = this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    onChange() {
      this.$emit("update:modelValue", this.search);
      this.validateInput();

      this.filterResults();
      this.isOpen = true;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = 0;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter].name;
      this.isOpen = false;
      this.arrowCounter = 0;
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
  background-color: #4aae9b;
  color: white;
}

label {
  margin: 1rem 0 0.25rem;
  color: #444;
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
}
input,
select,
.submitButton {
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
