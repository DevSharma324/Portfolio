;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		var loadStartTime = Date.now();
		var codeLoaderShown = false;
		var loaderHidden = false;
		
		// Function to hide the loader
		var hideLoader = function() {
			if (!loaderHidden) {
				loaderHidden = true;
				$(".fh5co-loader").fadeOut("slow");
			}
		};
		
		// Check if page load takes more than 3 seconds
		var checkLoadTime = function() {
			var elapsedTime = Date.now() - loadStartTime;
			
			if (elapsedTime >= 3000 && !codeLoaderShown && !loaderHidden) {
				// Show code typing animation after 3 seconds
				$(".fh5co-loader .loader-code").addClass("show");
				codeLoaderShown = true;
			}
			
			// Continue checking until page is fully loaded or we've shown code animation
			if (document.readyState !== 'complete' && !loaderHidden) {
				setTimeout(checkLoadTime, 100);
			}
		};
		
		// Start checking load time
		setTimeout(checkLoadTime, 100);
		
		// Hide loader when page is ready
		var pageLoadHandler = function() {
			var elapsedTime = Date.now() - loadStartTime;
			
			if (elapsedTime < 3000) {
				// Page loaded in less than 3 seconds - hide immediately
				hideLoader();
			} else if (codeLoaderShown) {
				// Code animation was shown - give it a moment to be visible
				setTimeout(hideLoader, 800);
			} else {
				// Edge case - hide after a short delay
				setTimeout(hideLoader, 300);
			}
		};
		
		// Listen for page load
		if (document.readyState === 'complete') {
			// Page already loaded
			pageLoadHandler();
		} else {
			$(window).on('load', pageLoadHandler);
		}
		
		// Fallback: if load event doesn't fire, hide after a reasonable time
		setTimeout(function() {
			if (!loaderHidden) {
				hideLoader();
			}
		}, 10000);
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());