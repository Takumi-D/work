# Журнал работ

## Запуск

```bash
# Клонировать
git clone https://github.com/Takumi-D/work.git
cd work

# Сервер
cd server

# создать файл .env и добавить DATABASE_URL="postgresql://postgres:ВАШ_ПАРОЛЬ@localhost:5432/ВАША_БАЗА_ДАННЫХ"

npm install
npx prisma generate
npx prisma migrate dev --name init
npm start

# Клиент (новый терминал)
cd client
npm install
npm run dev
