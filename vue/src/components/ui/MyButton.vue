<script>
export default {
  name: 'my-button'
}
</script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  margin-top: 15px;
  padding: 10px 15px;
  background: white;
  color: teal;
  border: 1px solid teal;
}
</style>
