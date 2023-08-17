# NOTES Project
# Описание проекта
Данный проект является убийцей трелло. Пока что в нем ничео не реализовано, но на рынке России аналогов трелло нет, поэтому у вас нет выбора

# Установка
1. Склонируйте проект при помощи git clone https://github.com/KarenGrigoryan1999/pern.git
2. Установите пакеты для frontend и backend:
```
cd backend
npm i
cd ../frontend
npm i
```
3. Настройка переменных окружения։

```
cp .env.example .env.development
cd ../backend
cp .example.env .development.env
```

# Запуск в dev режиме
1. Введите команду npm run start:dev в директории backend:
   ```
   npm run start:dev
   ```
3. Введите команду npm run dev для старта фронтенда в dev режиме в директории frontend:
   ```
   npm run dev
   ```

# Запуск в prod режиме
1. Введите команду npm run build в директории backend:
   ```
   npm run build
   ```
3. Введите команду npm run build для сборки проекта в директории frontend:
   ```
   cd ../frontend
   npm run build
   ```
5. Используйте npm run start для старта собранного проекта в директории backend:
   ```
   cd ../backend
   npm run start
   ```
7. Используйте веб сервер (например nginx) для раздачи собранной статики из директории frontend
