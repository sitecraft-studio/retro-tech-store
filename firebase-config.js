/* ============================================================
   FIREBASE CONFIG — ВСТАВЬТЕ СЮДА КЛЮЧИ ВАШЕГО ПРОЕКТА
   ============================================================

   Этот файл подключён и к витрине (index.html), и к админке
   (admin.html). Менять ключи нужно только здесь.

   КАК СОЗДАТЬ ПРОЕКТ И ВКЛЮЧИТЬ СЕРВИСЫ
   -------------------------------------
   1. Откройте https://console.firebase.google.com/ и войдите
      в аккаунт Google.
   2. Нажмите «Создать проект» (Add project). Название любое,
      например retro-store. Google Analytics можно отключить.
   3. В меню «Build» откройте «Firestore Database» →
      «Create database» → Production mode → выберите регион
      (например, europe-west3).
   4. В меню «Build» откройте «Storage» → «Get started».
      Storage нужен для загрузки фотографий товаров.
   5. В меню «Build» откройте «Authentication» → «Get started» →
      вкладка «Sign-in method» → включите Email/Password.
   6. На вкладке «Users» нажмите «Add user» и создайте
      администратора:
         Email: admin@retro.ru
         Пароль: придумайте надёжный пароль (не admin123)
      Если нужен другой email — измените ADMIN_EMAIL в admin.html
      и email в правилах Firestore/Storage.
   7. Откройте «Project settings» (шестерёнка) → «General» →
      «Your apps» → Web </> → зарегистрируйте приложение.
      Firebase покажет объект firebaseConfig.
   8. Замените значения ниже на свои из firebaseConfig.
      apiKey не является секретом — доступ защищают правила
      Firestore, Storage и Firebase Authentication.
   9. Опубликуйте правила Firestore (Firestore Database → Rules):

         rules_version = '2';
         service cloud.firestore {
           match /databases/{database}/documents {
             match /products/{productId} {
               allow read: if true;
               allow write: if request.auth != null
                            && request.auth.token.email == 'admin@retro.ru';
             }
             match /settings/{settingId} {
               allow read: if true;
               allow write: if request.auth != null
                            && request.auth.token.email == 'admin@retro.ru';
             }
           }
         }

  10. Опубликуйте правила Storage (Storage → Rules):

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

  11. Если сайт размещён на GitHub Pages, добавьте домен
      ВАШ_ЛОГИН.github.io в Authentication → Settings →
      Authorized domains.

   Пока значения ниже остаются заглушками, сайт работает
   в демо-режиме: товары и фото хранятся в localStorage браузера.
   После замены ключей админка автоматически переключится
   на Firestore и Firebase Storage.
   ============================================================ */

window.RETRO_FIREBASE_CONFIG = {
    apiKey: "ВСТАВЬТЕ_API_KEY",
    authDomain: "ВАШ_ПРОЕКТ.firebaseapp.com",
    projectId: "ВАШ_ПРОЕКТ",
    storageBucket: "ВАШ_ПРОЕКТ.firebasestorage.app",
    messagingSenderId: "ВСТАВЬТЕ_SENDER_ID",
    appId: "ВСТАВЬТЕ_APP_ID"
};
