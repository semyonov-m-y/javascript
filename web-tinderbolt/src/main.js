//Подключаем остальные файлы
const {HtmlTelegramBot, userInfoToString} = require("./bot");
const ChatGptService = require("./gpt");

class MyTelegramBot extends HtmlTelegramBot {
    constructor(token) {
        super(token);
        this.mode = null;
        this.list = []
        this.user = {}
        //Добавим счетчик номера вопроса
        this.count = 0;
    }

    //Напишем обработчик команды start для бота
    async start(msg) {
        this.mode = "main"
        const text = this.loadMessage("main")
        await this.sendImage("main")
        await this.sendText(text)

        //Добавим меню
        await this.showMainMenu({
            "start": "главное меню бота",
            "profile": "генерация Tinder-профиля 😎",
            "opener": "сообщение для знакомства 🥰",
            "message": "переписка от вашего имени 😈",
            "date": "переписка со звездами 🔥",
            "gpt": "задать вопрос чату GPT 🧠",
            "html": "Демонстрация HTML"
        })
    }

    //Обработчик команды html
    async html(msg) {
        await this.sendHTML('<h3 style="color:#1558b0"> Привет! </h3>')
        const html = this.loadHtml("main")
        await this.sendHTML(html, {theme: "dark"})
    }

    //Обработчик команды /gpt
    async gpt(msg) {
        this.mode = "gpt"
        const text = this.loadMessage("gpt")
        await this.sendImage("gpt")
        await this.sendText(text)
    }

    //Организуем общение пользователя с чатом GPT
    async gptDialog(msg) {
        const text = msg.text
        const myMessage = await this.sendText("Ваше сообщение было переслано ChatGPT. Ожидайте...")
        const answer = await chatgpt.sendQuestion("Ответь на вопрос", text)
        await this.editText(myMessage, answer)
    }

    //Опишем кнопки для приглашения на свидания
    async date(msg) {
        this.mode = "date"
        const text = this.loadMessage("date")
        await this.sendImage("date")
        await this.sendTextButtons(text, {
            "date_grande":"Ариана Гранде",
            "date_robbie":"Марго Робби",
            "date_zendaya":"Зендея",
            "date_gosling":"Райн Гослинг",
            "date_hardy":"Том Харди",
        })
    }

    //Опишем реакцию системы на нажатие кнопок с приглашением на свидание
    async dateButton(callbackQuery) {
        const query = callbackQuery.data;
        await this.sendImage(query)
        await this.sendText("Отличный выбор! Пригласи девушку/парня на свидание за 5 сообщений:")
        const prompt = this.loadPrompt(query)
        chatgpt.setPrompt(prompt)
    }

    async dateDialog(msg) {
        const text = msg.text
        const myMessage = await this.sendText("Девушка набирает текст...")
        const answer = await chatgpt.addMessage(text)
        await this.editText(myMessage, answer)
    }

    //Добавим функцию переписки бота от нашего имени с подстановкой по одному сообщению
    async message(msg) {
        this.mode = "message"
        const text = this.loadMessage("message")
        await this.sendImage("message")
        await this.sendTextButtons(text, {
            "message_next":"Следующее сообщение",
            "message_date":"Пригласить на свидание",
        })
        this.list = []
    }

    //Добавим реакцию на кнопки переписки от нашего имени
    async messageButton(callbackQuery) {
        const query = callbackQuery.data;
        const prompt = this.loadPrompt(query)
        //Всю переписку из списка преобразуем в одно сообщение (\n\n - это пустая строка)
        const userChatHistory = this.list.join("\n\n");

        const myMessage = await this.sendText("ChatGPT думает над вариантами ответа...")
        const answer = await chatgpt.sendQuestion(prompt, userChatHistory)
        await this.editText(myMessage, answer)
    }

    async messageDialog(msg) {
        const text = msg.text
        this.list.push(text)
    }

    //Создадим функцию добавления профиля для Tinder
    async profile(msg) {
        this.mode = "profile"
        const text = this.loadMessage("profile")
        await this.sendImage("profile")
        await this.sendText(text)

        this.user = {}
        this.count = 0;
        await this.sendText("Сколько вам лет?")
    }

    async profileDialog(msg) {
        const text = msg.text
        this.count++;

        if (this.count === 1) {
            this.user["age"] = text;
            await this.sendText("Кем вы работаете?")
        }
        if (this.count === 2) {
            this.user["occupation"] = text;
            await this.sendText("Какое у вас хобби?")
        }
        if (this.count === 3) {
            this.user["hobby"] = text;
            await this.sendText("Что вам не нравится в людях?")
        }
        if (this.count === 4) {
            this.user["annoys"] = text;
            await this.sendText("Какие у вас цели знакомства?")
        }
        if (this.count === 5) {
            this.user["goals"] = text;

            //Загрузим промпт
            const prompt = this.loadPrompt("profile")
            //Соберем всю информацию в одну строку
            const info = userInfoToString(this.user);
            const myMessage = await this.sendText("ChatGPT занимается генерацией вашего профиля...")
            const answer = await chatgpt.sendQuestion(prompt, info);
            await this.sendText(myMessage, answer)
        }
    }

    //Добавим генерацию сообщения, которое как бы будет открывать наш диалог с другим человеком
    async opener(msg) {
        this.mode = "opener"
        const text = this.loadMessage("opener")
        await this.sendImage("opener")
        await this.sendText(text)

        this.user = {}
        this.count = 0;
        await this.sendText("Имя девушки?")
    }

    async openerDialog(msg) {
        const text = msg.text
        this.count++;

        if (this.count === 1) {
            this.user["name"] = text;
            await this.sendText("Сколько ей лет?")
        }
        if (this.count === 2) {
            this.user["age"] = text;
            await this.sendText("Оцените её внешность: 1-10 баллов?")
        }
        if (this.count === 3) {
            this.user["handsome"] = text;
            await this.sendText("Кем она работает?")
        }
        if (this.count === 4) {
            this.user["occupation"] = text;
            await this.sendText("Цель знакомства?")
        }
        if (this.count === 5) {
            this.user["goals"] = text;

            //Загрузим промпт
            const prompt = this.loadPrompt("opener")
            //Соберем всю информацию в одну строку
            const info = userInfoToString(this.user);
            const myMessage = await this.sendText("ChatGPT занимается генерацией вашего opener-а...")
            const answer = await chatgpt.sendQuestion(prompt, info);
            await this.editText(myMessage, answer)
        }
    }

    //Используем асинхронную функцию, тк она наиболее эффективно использует время простоя
    async hello(msg) {
        if (this.mode === "gpt") {
            await this.gptDialog(msg);
        } else if (this.mode === "date") {
            await this.dateDialog(msg);
        } else if (this.mode === "message") {
            await this.messageDialog(msg);
        } else if (this.mode === "profile") {
            await this.profileDialog(msg);
        } else if (this.mode === "opener") {
            await this.openerDialog(msg);
        } else {
            const text = msg.text;
            //Если мы вызываем асинхронную функцию, то нужно писать await, чтобы код подождал, пока функция отработает
            //Добавим теги <b> для жирного и <i> для курсивного текстов, как в html
            await this.sendText("<b>Приветтт!</b>");
            await this.sendText("<i>Как делааа?</i>");
            //Добавим текст, обрамленный обратными ковычками (не одинарные) - на кнопке Ё, чтобы сразу использовать константу
            await this.sendText(`Вы писали: ${text}`);
            //Добавим картинку
            await this.sendImage("avatar_main")
            //Добавим кнопки
            await this.sendTextButtons("Какая у вас тема в Телеграм?", {
                "theme_light": "Светлая",
                "theme_dark": "Темная",

            })
        }
    }

    //Добавим функцию обработки кнопок из метода hello
    async helloButton(callbackQuery) {
        const query = callbackQuery.data;
        if (query === "theme_light") {
            await this.sendText("Ваша тема светлая!")
        }
        if (query === "theme_dark") {
            await this.sendText("Ваша тема тёмая!")
        }
    }
}

const chatgpt = new ChatGptService("gpt:AI6Jk5emA0osUkc2nivglWTowjq5GNCo2bpddaqxeEU8Jc4C4Zde0k5yHYJFkblB3TZ4vjiZ2EYkjx9hF0XMim3ZuBv5PzgpjMDJRq1trkAElmp9iUdQKCs0HqDc")
const bot = new MyTelegramBot("7937195594:AAHvGkyn-jnSsnMUWmhCdyIR6TnUGti6ohQ");

//Вызов команды /start
bot.onCommand(/\/start/, bot.start)
//Вызов команды /html
bot.onCommand(/\/html/, bot.html)
//Вызов команды /gpt
bot.onCommand(/\/gpt/, bot.gpt)
//Вызов команды date
bot.onCommand(/\/date/, bot.date)
//Вызов команды message
bot.onCommand(/\/message/, bot.message)
//Вызов команды profile
bot.onCommand(/\/profile/, bot.profile)
//Вызов команды opener
bot.onCommand(/\/opener/, bot.opener)

//Пишем после bot hello без скобок, иначе вызовем функцию, а нам лишь нужно передать на нее ссылку
//Функция hello будет вызываться каждый раз, как пользователь будет отправлять сообщение
bot.onTextMessage(bot.hello)

//Функция dateButton будет вызываться для всех кнопок с префиксом date
bot.onButtonCallback(/^date_.*/, bot.dateButton)

//Функция messageButton будет вызываться для всех кнопок с префиксом message
bot.onButtonCallback(/^message_.*/, bot.messageButton)

//Функция helloButton будет вызываться каждый раз при нажатии на кнопки
//Регулярка - ^ (началос троки), . (любой символ), * (любое кол-во), те любое количество любых символов в названии кнопки
bot.onButtonCallback(/^.*/, bot.helloButton)
