<template>
  <div :class="['toast', type]">
    {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    message: String,
    type: String,
  },
};
</script>
<style>
.toast {
  width: 100%;
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #444;
  font-size: 0.7rem;
  text-align: left;
}
.error {
  background-color: rgba(221, 52, 68, 0.2);
}
.success {
  background-color: rgba(25, 135, 83, 0.2);
}
</style>
