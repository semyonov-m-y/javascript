<template>
  <form @submit.prevent>
    <h4>Posts creating</h4>
    <my-input
      v-model="post.title"
      type="text"
      placeholder="Post title" />
    <my-input
      v-model="post.body"
      type="text"
      placeholder="Post description" />
    <my-button
      class="btn"
      style="align-self: flex-end; margin-left: 15px"
      @click="createPost">Create</my-button>
  </form>
</template>

<script>

export default {
  data () {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost () {
      this.post.id = Date.now()
      // Для того, чтобы сгенерировать событие, на которое родительский компонент сможет подписаться, используется $emit
      this.$emit('create', this.post)
      // Очищаем post, чтобы input-ы стали пустыми
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}

</style>
