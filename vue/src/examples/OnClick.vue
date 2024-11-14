<template>
  <div>
    <div>
      <button v-on:click="addLike">Like</button>
      <button v-on:click="addDislike">Dislike</button>
    </div>
    <div>Likes count: <strong>{{ likes }}</strong></div>
    <div>Dislikes count: <strong>{{ dislikes }}</strong></div>
  </div>
</template>

<script>
// В этой секции мы по дефолту должны объявить объект. По сути он и будет являться компонентом
export default {
  // А внутри этого компонента можем создавать функции
  data () {
    // И объявлять необходимые поля
    return {
      // Например, поле likes с дефолтным значением ноль. Чтобы это количество встроить в шаблон, есть спец синтаксис - ИНТЕРПОЛЯЦИЯ,
      // то есть просто объявление внутри div нашего поля - {{ likes }}
      likes: 0,
      dislikes: 0
    }
  },
  // Функции создаются внутри блока methods:
  methods: {
    addLike () {
      this.likes += 1
    },
    addDislike () {
      this.dislikes += 1
    }
  }
}
</script>

<style scoped>

</style>
