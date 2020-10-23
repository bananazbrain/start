# WEb Start Template (WEST)

## Файловая структура
```
src/                          - Исходный код проекта
    template/                 - Изменяемые файлы шаблона
             fonts/           - Шрифты
             imgs/            - Изображения подключаемые через стили
             libs/            - Библиотеки
             markup/          - Разметка PUG
                      pages/  - Страницы
                      parts/  - Части
                      mixins/ - Миксины
             scripts/         - Скрипты
                      js/     - JS исходники
                      ts/     - TS исходники
             styles/
                      css/    - CSS преобразованные через   SASS
                      sass/   - SASS исходники
    upload/                   - Подключаемые файлы через атрибуты 

dist/                         - Конечные файлы проекта
node/                         - node scripts
```

## Команды
`gulp` - запускает проект в браузере

`gulp page -n ...` - создает страницы, где ... список создаваемых страниц через запятую и без пробелов
`gulp page -n about,contacts,catalog` - пример использования