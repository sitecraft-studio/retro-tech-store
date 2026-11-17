# Retro — комиссионный магазин техники

Светлая витрина магазина проверенной техники и админ-панель для управления каталогом.
Сайт полностью статический: `index.html` и `admin.html` можно открыть локально или разместить на GitHub Pages.

## Демо-режим

Firebase пока не подключён, поэтому сайт работает на данных из `localStorage` браузера.

- Витрина: `index.html`
- Админка: `admin.html`
- Демо-пароль: `admin123`
- Товары и фото сохраняются только в текущем браузере.

## Возможности

- Светлый фиолетово-лаймовый дизайн, анимации появления и стеклянные кнопки.
- Каталог с фильтрами по категориям и карточками без фотографий.
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
4. Скопируйте `firebaseConfig` из настроек проекта и замените заглушку в блоках `firebaseConfig` в `index.html` и `admin.html`.
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

1. Загрузите `index.html`, `admin.html` и `README.md` в репозиторий GitHub.
2. Откройте **Settings → Pages**.
3. В разделе **Build and deployment** выберите **Deploy from a branch**, ветку `main` и папку `/ (root)`.
4. Сохраните настройки и дождитесь публикации.

## Структура

```text
index.html   — витрина, каталог, модальное окно товара и формы
admin.html   — вход, управление товарами, фото и настройками магазина
```
