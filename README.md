# Журнал работ

## Запуск

```bash
# Клонировать
git clone https://github.com/Takumi-D/work.git
cd work

# Сервер
cd server

# создать файл .env и добавить DATABASE_URL="postgresql://user:pass@localhost:5432/work"

npm install
npx prisma generate
npx prisma migrate dev --name init
npm start

# Клиент (новый терминал)
cd client
npm install
npm run dev
