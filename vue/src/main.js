//ДО СОЗДАНИЯ СПИСКА СТРАНИЦ ВСЁ РАБОТАЛО
import { createApp } from 'vue'
// Автозавершение кода, например import можно делать через Alt+Enter
import App from '@/App.vue'
import components from '@/components/ui'
import router from '@/router/router'

const app = createApp(App)

// Глобально зарегистрируем наши компоненты, чтобы каждый раз руками это не делать
components.forEach(component => {
  app.component(component.name, component)
})

app
  // Подключим новый модуль Main через use. Так можно подключить плагины, модули, библиотеки и тд
  .use(router)
  .mount('#app')
