import { ref } from "vue";

export default function useSearchResults(items) {
  const results = ref([]);

  const filterResults = (search) => {
    if (!search) return;
    results.value = items.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  };

  return { results, filterResults };
}
