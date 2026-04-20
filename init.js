$(document).ready(function(){
	$('.table-responsive', '.editor').table({
		className: 'table-responsive-wrapper',
		width: 768		
	});

	$('select').selectbox();

	window.disableScroll = (snap = false) => {
		// Get the current page scroll position
		$('html').addClass('noscroll');
		$('html').css('padding-right', getScrollbarWidth());
		$('header').css('padding-right', getScrollbarWidth());
		$('.backtoTop_container .container').css('padding-right', getScrollbarWidth());
		$('.whatsapp_container .container').css('padding-right', getScrollbarWidth());
		/* $('.pulldown .pulldown_wrapper > *').css('padding-right', getScrollbarWidth()); */
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		if(!snap){
			// if any scroll is attempted, set this to the previous value
			window.onscroll = e => {
				e.preventDefault();
				$('html, body').animate({scrollTop: scrollTop},0)
			};
		}
	}

	window.enableScroll = () => {
		$('html').removeClass('noscroll');
		$('html').css('padding-right', '');
		$('header').css('padding-right', '');
		$('.backtoTop_container .container').css('padding-right', '');
		$('.whatsapp_container .container').css('padding-right', '');
		$('.pulldown .pulldown_wrapper > *').css('padding-right', '');
		window.onscroll = () => {};
	}

	getScrollbarWidth = () => {
		// Creating invisible container
		const outer = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'scroll'; // forcing scrollbar to appear
		outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
		outer.style.position = 'absolute';
		outer.style.top = '0';
		outer.style.left = '0';
		outer.style.width = '100%';
		
		document.body.appendChild(outer);

		// Creating inner element and placing it in the container
		const inner = document.createElement('div');
		outer.appendChild(inner);
		//console.log(outer.offsetWidth , inner.offsetWidth);

		// Calculating difference between container's full width and the child width
		const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

		// Removing temporary elements from the DOM
		outer.parentNode.removeChild(outer);
		return scrollbarWidth;
	}
});