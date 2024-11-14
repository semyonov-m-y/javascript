<template>
  <div v-if="posts.length > 0">
    <h3>Posts list</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else
      style="color: red;">Posts list is empty!</h2>
</template>

<script>
import PostItem from '@/components/PostItem.vue'

export default {
  components: { PostItem },
  // Аргументы элементов называются ПРОПСЫ - их в дочернем компоненте изменять нельзя, они должны изменяться лишь в
  // родительском, а тут мы их будем получать уже в измененном виде
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active, .post-list-leave-active {
  transition: all 3s ease;
}

.post-list-enter-from, .post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 1s ease;
}
</style>
