# Ретро — комиссионный магазин

Витрина ретро-магазина и админ-панель для управления каталогом: посуда, книги, пластинки, сувениры, значки, открытки, CD и DVD.
Сайт полностью статический: `index.html` и `admin.html` можно открыть локально или разместить на GitHub Pages.

## Магазин

- Название: **Ретро**
- Адрес: Ленинский проспект, 62/1. Вход со двора между 10 и 11 подъездом.
- Режим работы: ежедневно с 11:00 до 20:00, без выходных и перерыва на обед.
- Телефон: 8 926 221 7420.
- Покупаем и принимаем вещи на комиссию.

## Демо-режим

Пока ключи Firebase не заполнены, сайт работает на данных из `localStorage` браузера.

- Витрина: `index.html`
- Админка: `admin.html`
- Демо-пароль: `admin123`
- Товары и фото сохраняются только в текущем браузере.

## Возможности

- Светлый фиолетово-лаймовый дизайн, анимации появления и стеклянные кнопки.
- Каталог с фильтрами: посуда, книги, пластинки, сувениры, значки, открытки, CD и DVD.
- Галерея из нескольких фото в карточке товара (до 6 изображений, первое — обложка).
- Оформление заказа и форма обратной связи.
- Админка: добавление, редактирование, удаление и дублирование товаров.
- Загрузка фото через выбор файлов или drag-and-drop, выбор обложки.
- Поиск по названию, фильтры по категории и видимости, сортировка по дате и цене.
- Скрытие товаров с витрины без удаления.
- Статистика каталога и экспорт товаров в JSON.
- Настройка названия магазина, которое отображается на витрине.

## Подключение Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/).
2. Включите **Authentication** (Email/Password), **Firestore Database** и **Storage**.
3. Создайте администратора с email `admin@retro.ru`.
4. Скопируйте `firebaseConfig` из настроек проекта и вставьте значения в файл `firebase-config.js`. Оба HTML-файла читают ключи оттуда.
5. Опубликуйте правила Firestore:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == 'admin@retro.ru';
    }
    match /settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == 'admin@retro.ru';
    }
  }
}
```

6. Опубликуйте правила Storage:

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == 'admin@retro.ru';
    }
  }
}
```

После подключения Firebase админка переключится в облачный режим автоматически.

## Публикация на GitHub Pages

1. Загрузите `index.html`, `admin.html`, `firebase-config.js` и `README.md` в репозиторий GitHub.
2. Откройте **Settings → Pages**.
3. В разделе **Build and deployment** выберите **Deploy from a branch**, ветку `main` и папку `/ (root)`.
4. Сохраните настройки и дождитесь публикации.

## Структура

```text
index.html         — витрина, каталог, модальное окно товара и формы
admin.html         — вход, управление товарами, фото и настройками магазина
firebase-config.js — ключи Firebase и инструкция по настройке
```
