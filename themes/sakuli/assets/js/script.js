jQuery(function ($) {
	"use strict";

	/* ========================================================================= */
	/*	Bootstrap Tooltipps and Popovers
	/* ========================================================================= */
	$(document).ready(function () {
		/*
		//activate for tooltip functionality
		$('[data-toggle="tooltip"]').tooltip({
			animation: true
		});
		*/
		//Popovers - like tooltips but more awesome
		$('[data-toggle="popover"]').popover({
			container: 'body',
			animation: true,
			trigger: 'hover',
			offset: 5,
			template: '<div class="popover" role="tooltip"><div class="arrow"></div> <h3 class="popover-header"></h3> <div class="popover-body"></div></div> '
		});

	});
	/* ========================================================================= */
	/*	counter up
	/* ========================================================================= */
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 2500,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	$(window).on('scroll', function () {
		counter();
	});

	/* ========================================================================= */
	/*	Page Preloader
	/* ========================================================================= 

	// Preloader js
	$(window).on('load', function () {
		$('#preloader').fadeOut(700);
	});*/


	

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */

	/*//Init the carousel
	$("#success_stories").slick({
		infinite: true,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 4000
	});*/

	/* ========================================================================= */
	/*   Contact Form Validating
	/* ========================================================================= */


});
// End Jquery Function


/* ========================================================================= */
/*	Animated section
/* ========================================================================= */

var wow = new WOW({
	offset: 100, // distance to the element when triggering the animation (default is 0)
	mobile: false // trigger animations on mobile devices (default is true)
});

//https://github.com/matthieua/WOW/issues/196#issuecomment-348734401
var scrolled = false;
$(window).on('scroll', function () {
	if (!scrolled) {
		scrolled = true;
		wow.init();
	}
})

/* ========================================================================= */
/*	Staticman comments reply
/* ========================================================================= */
function changeValue(elementName, newValue) {
	document.getElementsByName(elementName)[0].value = newValue;
};

/* ========================================================================= */
/*	custom function to close burger menue after clicking a navigation item
/* ========================================================================= */
function closeBurgerjs () {
	if (document.getElementById('burger-button').getAttribute('aria-expanded') == "true") {
		document.getElementById('burger-button').click();
	}
};
