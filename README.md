<div align="center" style="display: flex; align-items: center;">
  <h1>
    Дипломный проект "Магазин музыкальных инструментов"
  </h1>
</div>

<div align="center" style="display: flex; align-items: center;">
  <h2>:hammer_and_wrench: Фреймворки и библиотеки</h3>
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/vuejs/vuejs-original.svg" title="Vue" alt="Vue" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/quasar/quasar-original.svg" title="Quasar" alt="Quasar" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" title="PostgreSQL"  alt="PostgreSQL" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nestjs/nestjs-original.svg" title="Nest" alt="Nest" width="40" height="40"/>&nbsp;
</div>


### Как запустить
#### 1. Перейдите в корневой каталог `cd ./glebatti`
#### 2. Установите необходимые зависимости глобально `npm i -g @quasar/cli @nestjs/cli cross-env`
#### 3. Установите необходимые зависимости проекта командой `npm install` в папках `front` (`cd ./front`) и `back` (`cd ./back`)
#### 4. Пропишите команду `copy .env-example .env` и вставьте свои данные для подключения к БД и SMTP
#### 5. Запуск сервера - `cd ./back` и `npm run start:dev`
#### 6. Запуск клиента - `cd ./front` и `npm run dev`
#### 7. Чтобы развернуть тестовую базу данных введите команду `psql -h postgres_host -p postgres_port -U postgres_name -d name_db -f dump.sql`

### Пользователи
#### Логин `user` и пароль `test` - ***Покупатель***
#### Логин `test` и пароль `test` - ***Продавец 1***
#### Логин `seller` и пароль `test` - ***Продавец 2***
#### Логин `admin` и пароль `test` - ***Администратор***

