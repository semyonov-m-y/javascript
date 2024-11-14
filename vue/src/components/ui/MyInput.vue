<script>
export default {
  name: 'my-input',
  // Организуем двустороннее связывание
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <input class="input" type="text" :value="modelValue" @input="updateInput" />
</template>

<style scoped>

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-bottom: 15px;
}
</style>
