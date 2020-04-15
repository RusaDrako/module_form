# Модуль оформления формы (module_form) ver: 0.0.3
____

![license](https://img.shields.io/github/license/RusaDrako/module_form?style=plastic)
![release](https://img.shields.io/github/v/release/RusaDrako/module_form?style=plastic)

## Оглавление

- [Запуск модуля](#Запуск-модуля)
- [Заголовок для поле заполнения](#Заголовок-для-поле-заполнения)
- [Программное ограничение количества символов в поле заполнения](#Программное-ограничение-количества-символов-в-поле-заполнения)
- [Вывод количества символов в поле заполнения](#Вывод-количества-символов-в-поле-заполнения)
- [Вывод оставшегося количества символов в поле заполнения](#Вывод-оставшегося-количества-символов-в-поле-заполнения)

## Запуск модуля
```JavaScript
module_form.start()
```

[:arrow_up: Оглавление](#Оглавление)

## Заголовок для поле заполнения

Для добавления заголовка к полю, в теге необходимо указать атрибут **module_form__placeholder**.
В атрибут заносится выводимый текст заголовка.

```html
<input type="user" value="" module_form__placeholder="Пользователь"/>
<textarea module_form__placeholder="Сообщение"></textarea>
```

[:arrow_up: Оглавление](#Оглавление)


## Программное ограничение количества символов в поле заполнения

Для добавления ограничителя количества символов, в теге поля необходимо указать атрибут **module_form__limiter**.
В атрибут заносится максимальное количество символов.

```html
<input type="user" value="" module_form__limiter="20"/>
```

```html
<textarea module_form__limiter="256"></textarea>
```

[:arrow_up: Оглавление](#Оглавление)


## Вывод количества символов в поле заполнения

Для добавления вывода количества символов, в теге поля необходимо указать атрибут **module_form__count**.
В атрибут заносится id элемента в который будет выводиться значение.

```html
<input type="user" value="" module_form__count="count_1"/>
<span id="count_1"></span>
```

```html
<textarea module_form__count="count_2"></textarea>
<span id="count_2"></span>
```

[:arrow_up: Оглавление](#Оглавление)


## Вывод оставшегося количества символов в поле заполнения

Для добавления вывода количества оставшихся символов, в теге поля необходимо указать атрибут **module_form__countdown**.
В атрибут заносится id элемента в который будет выводиться значение и через запятую контрольное количество символов.

```html
<input type="user" value="" module_form__countdown="countdown_1,20"/>
<span id="countdown_1"></span>
```

```html
<textarea module_form__countdown="countdown_2,256"></textarea>
<span id="countdown_2"></span>
```


[:arrow_up: Оглавление](#Оглавление)

[![Logo](https://avatars0.githubusercontent.com/u/32844979?s=50 "RusaDrako")](https://github.com/RusaDrako/)
