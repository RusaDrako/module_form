// Включаем строгий режим
"use strict";

/** */
(function($) {
	/** Имя модуля */
	var MODULE_NAME = 'module_form';
	/** Версия модуля */
	var MODULE_VERSION = '1.0.0';
	/** Автор модуля */
	var MODULE_AUTHOR = 'Петухов Леонид';
	/** Дата релиза модуля */
	var MODULE_DATE = '2020-04-15';
	/** Описание модуля */
	var MODULE_DESCRIPTION = 'Модуль оформления формы.';

	/** Объект */
	var object_module = {};


	/** Создание элемента обёртки */
	function _create_wrap($_item_obj) {
		var $display =  $_item_obj.css('display');
		$display = ($_item_obj.is("textarea")
				&& ($display == 'inline'
						|| $display == 'inline-block'))
			? 'inline-flex'
			: $display;
		var $_warp = $('<div></div>')
			.css({
				'position': 'relative',
				'display': $display,
			})
			.attr(MODULE_NAME + '__wrap', '')
			;
		$_item_obj.wrap($_warp);
	}

	/** Создание элемента заголовка */
	function _create_title($_item_obj) {
			var $_padding = Number.parseInt($_item_obj.css('paddingTop'));
			var $_title = $('<div></div>')
				.html($_item_obj.attr(MODULE_NAME + '__placeholder'))
				.attr(MODULE_NAME + '__title', '')
				;
			$_item_obj.before($_title);
			return $_title;
	}

	/** Получение отступа сверху для title */
	function _get_padding_title_null($_item_obj, $_title) {
		var $h = Number.parseInt($_title.outerHeight(true));
		var $_padding_top_new = $h;
		var $_padding = Number.parseInt($_item_obj.css('paddingTop'));
		if ($_padding > $h) {
			var $_padding_top_new = $_padding;
		}
		return $_padding_top_new;
	}

	/** Получение среднее значение padding (верх/низ) для элемента */
	function _get_padding_middle($_obj) {
		var $_padding_t = Number.parseInt($_obj.css('paddingTop'));
		var $_padding_b = Number.parseInt($_obj.css('paddingBottom'));
		var $_padding = ($_padding_t + $_padding_b) / 2 ;
		return $_padding;
	}

	/** Очищает от элементов надстройки для заголвка поля */
	function _add_title_clean($_obj) {
		$('[' + MODULE_NAME + '__title]').replaceWith('');
		$_obj.parent('[' + MODULE_NAME + '__wrap]').children($_obj).unwrap();
	}

	/** Формирует элементы надстройки для заголвка поля + реакции */
	function _add_title() {
		// Массив обрабатываемых элементов
		var $_obj = $('[' + MODULE_NAME + '__placeholder' + ']');
		// Чистим предыдущие настройки
		_add_title_clean($_obj);
//		console.log($_obj);
		// Проходим по элементам списка
		$_obj.each(function(index) {
			// Конкретный элемент списка
			var $_item_obj = $(this);
			// Создаём обёртку
			_create_wrap($_item_obj);
			// Создаём заголовок
			var $_title = _create_title($_item_obj);
			// Получаем padding-top в режиме заполнения
			var $_padding_top_new = _get_padding_title_null($_item_obj, $_title);
			// Задаём верхний отступ в поле (для заголовка)
			$_item_obj.css('paddingTop', $_padding_top_new);
			// Функция настроек при режиме редактирования или заполненом поле
			var $func_title_not_null = function() {
				$_title.css('paddingTop', '');
				$_title.css('fontSize', '');
			};
			// Функция настроек при пустом поле
			var $func_title = function() {
				// Значение пустое и это не выпадающий список
				if (!$_item_obj.val()
						&& !$_item_obj.is('select')
					) {
					$_title.css('paddingTop', _get_padding_middle($_item_obj));
					$_title.css('fontSize', $_item_obj.css('fontSize'));
				// Значение заполнено
				} else {
					$func_title_not_null();
				}
			};
			// Установка реакции на событие фокус
			$_item_obj.focus($func_title_not_null);
			// Установка реакции на событие снятие фокуса
			$_item_obj.focusout($func_title);
			// Абработка поля
			$func_title();
		});
	}



	/** Формирует элементы ограничивающий длинну строки */
	function _add_limiter() {
		// Массив обрабатываемых элементов
		var $_obj = $('[' + MODULE_NAME + '__limiter' + ']');
		// Чистим предыдущие настройки
		_add_title_clean($_obj);
//		console.log($_obj);
		// Проходим по элементам списка
		$_obj.each(function(index) {
			// Конкретный элемент списка
			var $_item_obj = $(this);
			var $_item_count = $_item_obj.attr(MODULE_NAME + '__limiter');

			var $func = function() {
				var text = $_item_obj.val();
				var count = text.length;
				if (count > $_item_count) {
					$_item_obj.val(text.substr(0,$_item_count));
				}
			}

			$_item_obj.keydown($func);
			$_item_obj.keyup($func);
			$_item_obj.change($func);
			// Абработка поля
			$func();
		});
	}

	/** Формирует события для вывод оставшегося кол-ва символов */
	function _add_countdown() {
		// Массив обрабатываемых элементов
		var $_obj = $('[' + MODULE_NAME + '__countdown' + ']');
		// Чистим предыдущие настройки
		_add_title_clean($_obj);
//		console.log($_obj);
		// Проходим по элементам списка
		$_obj.each(function(index) {
			// Конкретный элемент списка
			var $_item_obj = $(this);
			var $_item_set = $_item_obj.attr(MODULE_NAME + '__countdown').split(',');
			if ($_item_set.length == 2) {
				var $_target = $_item_set[0];
				var $_count = $_item_set[1];
				var $func = function() {
					var count = $_item_obj.val().length;
					$('#' + $_target).html($_count - count);
				}

				$_item_obj.keydown($func);
				$_item_obj.keyup($func);
				$_item_obj.change($func);
				// Абработка поля
				$func();
			}
		});
	}

	/** Формирует события для вывод кол-ва символов */
	function _add_count() {
		// Массив обрабатываемых элементов
		var $_obj = $('[' + MODULE_NAME + '__count' + ']');
		// Чистим предыдущие настройки
		_add_title_clean($_obj);
//		console.log($_obj);
		// Проходим по элементам списка
		$_obj.each(function(index) {
			// Конкретный элемент списка
			var $_item_obj = $(this);
			var $_target = $_item_obj.attr(MODULE_NAME + '__count');
			var $func = function() {
				var count = $_item_obj.val().length;
				$('#' + $_target).html(count);
			}

			$_item_obj.keydown($func);
			$_item_obj.keyup($func);
			$_item_obj.change($func);
			// Абработка поля
			$func();
		});
	}



	/** Открытие модуля */
	object_module.start = function() {
		// Присвоение событий подсчёта символов
		_add_limiter();
		_add_count();
		_add_countdown();
		// Создание заголовков
		// _add_title - должна быть последней (иначе не отрабатывает)
		_add_title();
	};

	/** Возвращает объект с информацией о модуле */
	object_module.info = function() {
		return {
			module: MODULE_NAME,
			version: MODULE_VERSION,
			date: MODULE_DATE,
			author: MODULE_AUTHOR,
			description: MODULE_DESCRIPTION
		};
	};

	/** Выводит сообщение с информацией о модуле */
	object_module.about = function() {
		alert(MODULE_NAME + '\nВерсия: ' + MODULE_VERSION + '\nДата: ' + MODULE_DATE + '\nРазработчик: ' + MODULE_AUTHOR + '\n\n' + MODULE_DESCRIPTION);
	};

	window[MODULE_NAME] = object_module;

/**/
}(jQuery));
