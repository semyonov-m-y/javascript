<template>
  <div>
    <h1>Page with posts</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Search..."/>
    <div class="app__btns">
      <my-button
        @click="showDialog"
      >Create post
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
        @create="createPost"/>
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading is in process...</div>
    <div ref="observer" class="observer">

    </div>
    <!--    <div class="page__wrapper">
        <div
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{
            'current-page': page === pageNumber
          }"
          @click="changePage(pageNumber)"
          >{{ pageNumber }}</div>
      </div> -->
  </div>
</template>

<script>
// Тут @ - это элиас, который ссылается на папку src
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import MyDialog from '@/components/ui/MyDialog'
import MyButton from '@/components/ui/MyButton'
import axios from 'axios'
import MySelect from '@/components/ui/MySelect'
import MyInput from '@/components/ui/MyInput'

// В этой секции мы по дефолту должны объявить объект. По сути он и будет являться компонентом
export default {
  // Чтобы добавить компоненты PostForm и PostList, нужно их зарегистрировать в блоке components
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostForm,
    PostList
  },
  // А внутри этого компонента можем создавать функции
  data () {
    // И объявлять необходимые поля
    return {
      // Например, поле likes с дефолтным значением ноль. Чтобы это количество встроить в шаблон, есть спец синтаксис - ИНТЕРПОЛЯЦИЯ,
      // то есть просто объявление внутри div нашего поля - {{ likes }}
      // Не переносим этот список постов (модель) в PostList, тк он должен получать список постов извне
      posts: [],
      dialogVisible: false,
      // Создадим еще одну модель, чтобы пользователь видел, что посты загружаются. Будем отображать посты лишь
      // когда isPostsLoading = true
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'By title' },
        { value: 'body', name: 'By body' }
      ]
    }
  },
  // Функции создаются внутри блока methods:
  methods: {
    createPost (post) {
      this.posts.push(post)
      this.dialogVisible = false
      // Создадим объект нашего поста. id всегда должен быть уникальным, поэтому привяжем его к дате
      /* const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      // Добавляем объект (наш пост) в массив posts
      this.posts.push(newPost)
      // Чтобы в input текст очищался после создания поста
      this.title = ''
      this.body = '' */
    },
    removePost (post) {
      // Нужно, чтобы остальные id постов не совпадали с id поста, который удаляем
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog () {
      this.dialogVisible = true
    },
    // Создадим список страниц и добавим для этого выше блок <div class="page__wrapper"
    /*    changePage (pageNumber) {
      this.page = pageNumber
      this.fetchPosts()
    }, */
    // Реализуем запросы постов с сервера
    async fetchPosts () {
      // Для запроса постов используем библиотеку axios. Установим ее через npm i axios
      try {
        this.isPostsLoading = true
        // Сделаем динамическую задержку перед прогрузкой постов
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            // Добавим конфигурацию отображаемых страниц и лимит
            _page: this.page,
            _limit: this.limit
          })
          // Чтобы посчитать количество страниц, нужно поделить общее количество постов (можно найти в консоли) на лимит
          // Например, 101 : 10 = 11 страниц
          this.totalPages = Math.ceil(100 / this.limit)
          // Перезаписываем посты
          this.posts = response.data
          this.isPostsLoading = false
        }, 1000)
      } catch (e) {
        alert('Error')
      } finally {
        // Добавили отключение процесса загрузки в finally, чтобы оно отрабатывало независимо от того ошибка или нет
        // Но если используем setTimeout, то переносим эту строку в блок setTimeout
        // this.isPostsLoading = false
      }
    },
    // Блок для подгрузки постов по достижению низа экрана
    async loadMorePosts () {
      // Для запроса постов используем библиотеку axios. Установим ее через npm i axios
      try {
        this.page += 1
        // this.isPostsLoading = true
        // Сделаем динамическую задержку перед прогрузкой постов
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            // Добавим конфигурацию отображаемых страниц и лимит
            _page: this.page,
            _limit: this.limit
          })
          // Чтобы посчитать количество страниц, нужно поделить общее количество постов (можно найти в консоли) на лимит
          // Например, 101 : 10 = 11 страниц
          this.totalPages = Math.ceil(100 / this.limit)
          // Добавляем посты в конец списка
          this.posts = [...this.posts, ...response.data]
          // this.isPostsLoading = false
        }, 1000)
      } catch (e) {
        alert('Error')
      } finally {
        // Добавили отключение процесса загрузки в finally, чтобы оно отрабатывало независимо от того ошибка или нет
        // Но если используем setTimeout, то переносим эту строку в блок setTimeout
        // this.isPostsLoading = false
      }
    }
  },
  mounted () {
    // Чтобы посты подгружались сразу после загрузки/обновления страницы
    this.fetchPosts()
    // Блок для loadMorePosts
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    // callback отрабатывает, когда мы пересекаем определенный элемент
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },
  // Сотрировку массива можно сделать как через watch, так и через compute
  /*  watch: {
    selectedSort (newValue) {
      // Нужно просто сравнить 2 поста между собой
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue])
      })
    }
  }, */
  computed: {
    // Сортировка постов
    sortedPosts () {
      // Разворачиваем наш массив в массив постов
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    // Сортировка и поиск постов
    sortedAndSearchedPosts () {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    },
    watch: {
      // Для списка страниц
      /*      page () {
        this.fetchPosts()
      } */
    }
  }
}
</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current__page {
  border: 3px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
