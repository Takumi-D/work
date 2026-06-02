# Work

React + Express + PostgreSQL + Prisma

## Установка и запуск

### 1. Клонирование проекта

```bash
git clone https://github.com/Takumi-D/work.git
cd work
```

### 2. Настройка сервера

Перейдите в папку сервера:

```bash
cd server
```

Создайте файл `.env`:

```env
DATABASE_URL="postgresql://postgres:ВАШ_ПАРОЛЬ@localhost:5432/ВАША_БАЗА_ДАННЫХ"
```

Установите зависимости:

```bash
npm install
```

Сгенерируйте Prisma Client:

```bash
npx prisma generate
```

Примените миграции:

```bash
npx prisma migrate dev
```

Запустите сервер:

```bash
npm start
```

### 3. Запуск клиента

Откройте новый терминал:

```bash
cd client
npm install
npm run dev
```

## Технологии

- React
- React-hook-form для удобной обработки формы
- Redux toolkit для удобной работы с данными и запросами
- Express - легко написать сервер
- PostgreSQL
- Prisma ORM - для удобной работы с БД
