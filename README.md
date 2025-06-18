# Тестовое задание в компанию Only

## Описание проекта
Реализация адаптивного слайдера с:
- Плавными переходами между слайдами
- Кастомной пагинацией
- Навигационными кнопками
- Оптимизированной производительностью

## Технологии
- React 19
- Swiper
- GSAP
- SCSS modules
- Webpack
- TypeScript

## Установка
1. Клонировать репозиторий:
```bash
git clone https://github.com/atimrish/only-test-task.git
cd only-test-task
```
2. Установить зависимости:
```bash
npm i
```
3. Запустить локальный dev-server
```bash
npm run serve
```
4. Открыть localhost:8000 в браузере

## Оптимизации
- Аппаратное ускорение анимаций (will-change, transform, transition)
- Дебаунс обработчиков событий

## Структура Feature-Sliced Design

Для удобства файл с содержимым слайдов находится по пути: @src/pages/main-page/config/slides.ts
