import { ref } from "vue";

export default function useAutoComplete() {
  const counter = ref(0);

  const increment = () => {
    counter.value += 1;
  };

  const decrement = () => {
    if (counter.value === 0) return;
    counter.value = counter.value - 1;
  };

  const reset = () => {
    counter.value - 0;
  };

  return { counter, increment, decrement, reset };
}
