var vw = $(window).width();
var vh = $(window).height();

jQuery(document).ready(function ($) {

	$body = $('body');

	/* PARAMS */

	$(window).resize(function () {
		vw = $(window).width();
		vh = $(window).height();
	});

	InitInput();

	/* ACTIONS */

	// disable empty links
	$('a[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// placeholders
	(function () {
		var placeholder = '';
		$(document).on('focusin', 'input, textarea', function () {
			placeholder = $(this).attr('placeholder');
			$(this).attr('placeholder', '');
		});
		$(document).on('focusout', 'input, textarea', function () {
			$(this).attr('placeholder', placeholder);
		});
	})();

	// main menu
	$('.header-main-menu__bg, .header-main-menu__toggle').click(function (e) {
		e.preventDefault();
		$body.toggleClass('is-menu-open');
	});

	// filter toggle
	$('.filter__header').click(function () {
		var $block = $(this).closest('.filter__block'),
			$body = $block.find('.filter__body'),
			$arrow = $block.find('.filter__arrow');

		$body.slideToggle(200, function () {
			$body.toggleClass('is-open');
		});
		$arrow.toggleClass('is-open');
	});

	// product text toggle
	$('.product-text__header').click(function () {
		var $block = $(this).closest('.product-text__block'),
			$body = $block.find('.product-text__body'),
			$arrow = $block.find('.product-text__arrow');

		$body.slideToggle(200, function () {
			$body.toggleClass('is-open');
		});
		$arrow.toggleClass('is-open');
	});

	// product images
	(function() {
		var img = new Swiper('.product-img__swiper', {
			simulateTouch: true,
			slidesPerView: 1,
			spaceBetween: 0,
			navigation: true,
			effect: 'slide',
			autoHeight: false,
			pagination: {
				el: '.product-img__pagination',
				type: 'bullets',
				clickable: true
			},
			on: {
				slideChange: function() {
					$('.product-thumbs__item:not(:eq('+this.realIndex+')) .product-thumbs__img').removeClass('is-active');
					$('.product-thumbs__item:eq('+this.realIndex+') .product-thumbs__img').addClass('is-active');
				}
			}
		});
		$('.product-thumbs__img').click(function(e) {
			e.preventDefault();
			var $this = $(this),
				i = $(this).closest('.product-thumbs__item').index();

			$('.product-thumbs__img').not($this).removeClass('is-active');
			$this.addClass('is-active');
			img.slideTo(i);
		});
	})();
});

/* FUNCTIONS */

function InitInput() {
	if ($().mask) {
		$(".phone").mask("+7 (999) 999 99 99", { placeholder: "+7 (   )          " });
	}
	if ($().styler) {
		setTimeout(function () {
			$("select:not(.nostyle), input[type='checkbox']:not(.nostyle), input[type='radio']:not(.nostyle)").styler({
				singleSelectzIndex: 10
			});
		}, 100);
	}
}