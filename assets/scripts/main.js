;(function($, window, document, undefined) {

	"use strict"; 

	/* ================================
	===  VARIABLES              ====
	=================================== */
	var $win = $(window),
		$doc = $(document),
		$body = $('body'),
		$bodyHtml = $('body,html');
	var winW, winH, winTop;

	$doc.on('ready', function(){

		/* ================================
		===  SCROLLSPY INIT            ====
		=================================== */
		var scrollSpy;

		scrollSpy = new ScrollSpy({
			linksContainerSelector: '#scroll-spy',
			sectionSelector: '.section'
		});
	
		scrollSpy.init();

		/* ================================
		===  SPYBUTTONS                ====
		=================================== */
		var spyButtons = $('.spy-buttons a'),
			scrollDuration = 700;

		spyButtons.each(function(){
			var $this = $(this);

			$this.on('click', function(event) {
				event.preventDefault();
				var currentLink = $this.attr('href');
				var currentSection = $body.find('section' + currentLink);
				var newPos = currentSection.offset().top;
				
				$bodyHtml.animate({
					scrollTop: newPos,
				 	}, scrollDuration
				);

			});
		});

		/* ================================
		===  OWL CAROUSELS             ====
		=================================== */

		var owl = $("#owl-consta"),
			owlTeam = $('#owl-team'),
			animStyle = "fadeInRight";

		owl.owlCarousel({
		    navigation : false, 
		    smartSpeed : 500,
		    paginationSpeed : 2500,
		    autoplay: true,
		    loop : true,
		    items : 1, 
		    itemsDesktop : false,
		    itemsDesktopSmall : false,
		    itemsTablet: false,
		    itemsMobile : false,
		    onInitialize : doAnimation(animStyle)
		});

		owl.on('changed.owl.carousel', function(event) {
		    doAnimation(animStyle);
		});

	    function doAnimation(animName) {
	    	var animEnd = 'webkitAnimationEnd animationend';
			var target1 = $('.item .caption-text h1'), 
				target2 = $('.item .caption-text h3'),
				target3 = $('.item .caption-text p');

		   	target1.addClass('animated '+animName+'').one(animEnd, function () {
		    	target1.removeClass('animated '+animName+'')
		    });

		    target2.addClass('animated '+animName+'').one(animEnd, function () {
		    	target2.removeClass('animated '+animName+'')
		    }); 

		    target3.addClass('animated '+animName+'').one(animEnd, function () {
		    	target3.removeClass('animated '+animName+'')
		    });  
	   	}
		  
	   	owlTeam.owlCarousel({
		    loop: true,
		    nav: true,
		    navText: false,
		    responsive:{
		        0:{
		            items:1
		        },
		        
		        600:{
		            items:2
		        },

		        767:{
		            items:3
		        },

		        1000:{
		            items:4
		        }
		    }
		});

		/* ================================
		===  SLIDING NAVIGATION        ====
		=================================== */
	    var navTrigger = $('.nav-trigger'),
	    	langTrigger = $('.lang-trigger'),
	        overlay = $('.overlay'),
	        overlayLang = $('.overlay-lang'),
	        navigationLiNot = $('#navigation li:not(.menu-item-has-children)'),
	        menuItemHasChildren = $('.menu-item-has-children');
	        

	        function toggleNavigation( event ) {
	            event.preventDefault();
	            $body.toggleClass('nav-open');
	        }

	        function overlayFunction() {
	            $body.toggleClass('nav-open');
	        }

	        navTrigger.on('click',toggleNavigation);
	        overlay.on('click',overlayFunction);
	        

	        navigationLiNot.each(function(){  
	            $(this).on('click',function(){
	                $body.toggleClass('nav-open');
	            });
	        });

	    //open (or close) submenu items in the mobile menu. Close all the other open submenu items.
		menuItemHasChildren.children('a').on('click', function(event){
			event.preventDefault();
			$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.menu-item-has-children').siblings('.menu-item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
		});

		function toggleLang() {
			$body.toggleClass('lang-open');
		}

		function overlayLangFunction() {
            $body.toggleClass('lang-open');
        }

		langTrigger.on('click',toggleLang);
		overlayLang.on('click',overlayLangFunction);
		
		/* ================================
		===  PARALLAXIFY               ====
		=================================== */

		$.parallaxify({
			positionProperty: 'transform',
			responsive: true,
			motionType: 'natural',
			mouseMotionType: 'performance',
			motionAngleX: 70,
			motionAngleY: 70,
			alphaFilter: 0.5,
			adjustBasePosition: true,
			alphaPosition: 0.025
		});

		/* ================================
		=== HEADER ANIMATION           ====
		=================================== */
		var iScrollPos = 0,
			scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 0,
			scrollOffset = 500,
			mainHeader = $('header'),
			headerHeight = mainHeader.height();

		function scrollEffect() {

			var iCurScrollPos = $(this).scrollTop();
			
			if (iCurScrollPos > iScrollPos && iCurScrollPos > 120) {

		        mainHeader.addClass('scrolling');
		      
		    } else if ( iCurScrollPos < 120) {

		       mainHeader.removeClass('scrolling');
		    }

		    iScrollPos = iCurScrollPos;	
		}

		function autoHideHeader() {
			var currentTop = $(window).scrollTop();

			checkDirection(currentTop);

		   	previousTop = currentTop;
			scrolling = false;
		}

		function checkDirection(currentTop) {
		    if (previousTop - currentTop > scrollDelta) {
		    	//if scrolling up...
		    	mainHeader.removeClass('is-hidden');
		    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
		    	//if scrolling down...
		    	mainHeader.addClass('is-hidden');
		    }
		}
		
		$win.on('scroll',scrollEffect);

		$win.on('scroll', function(){
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});

		$win.on('resize', function(){
			headerHeight = mainHeader.height();
		});

		/* ================================
		===  Fullscreen Modal Boxes    ====
		=================================== */

		var modal = $('.modal'),
			modalBox = $(".modal-fullscreen"),
			modals = $("div[id^='serviceModal'],div[id^='projectModal']"),
			modalBackdrop = $(".modal-backdrop"),
			modalBackdropIn = $(".modal-backdrop.in"),
			modalVisible = $('.modal:visible');

		modalBox.on('show.bs.modal', function () {
			setTimeout( function() {
				modalBackdrop.addClass("modal-backdrop-fullscreen");
			},0);
		});

		modalBox.on('hidden.bs.modal', function () {
			modalBackdrop.addClass("modal-backdrop-fullscreen");
		});

		modals.each(function(){
			var currentModal = $(this);
			//click next
			currentModal.find('.btn-next').on('click', function(){
				currentModal.modal('hide');
			    var closestModal = currentModal.closest(modals).nextAll(modals).first();
			    closestModal.modal('show');
			});
			//click prev
			currentModal.find('.btn-prev').on('click', function(){
				currentModal.modal('hide');
			    var closestModal = currentModal.closest(modals).prevAll(modals).first();
			    closestModal.modal('show');
			    if(closestModal.hasClass('projects') || closestModal.hasClass('container')) {
			    	var currentBackdrop = $('.modal-backdrop');
			    	currentBackdrop.remove();
			    }
			});
		});

		// This just makes all bootstrap native .modals live together
		modal.on("hidden.bs.modal", function (e) {
		    if(modalVisible.length)
		    {
		        modalBackdrop.first().css('z-index', parseInt(modalVisible.last().css('z-index')) - 10);
		        $body.addClass('modal-open');
		    }
		}).on("show.bs.modal", function (e) {
		    if(modalVisible.length)
		    {
		        modalBackdropIn.first().css('z-index', parseInt(modalVisible.last().css('z-index')) + 10);
		        $(this).css('z-index', parseInt(modalBackdropIn.first().css('z-index')) + 10);
		    }
		});

		/* ================================
		===  Projects Isotope(Style)   ====
		=================================== */

		var $projects = $('#isotope'),
			loadMoreLink = $(".load-more"),
			projectFilterUl = $('.project-filter ul');

		$win.on('load resize', function(event) {
			winW = $win.width();
			winH = $win.height();

			if( event.type === 'load' ) {
				$projects.isotope({
					itemSelector: '.col-md-3',
					layoutMode: 'masonry'
				}).addClass('projects-loaded');
			} else {
				setTimeout(function() {
					$projects.isotope('layout');
				}, 700);
			}
			scrollSpy.refreshPositions();

			//ISOTOPE LOAD MORE FUNCTION
			var initShow = 8; //number of items loaded on init & onclick load more button
			var counter = initShow; //counter for load more button
			var iso = $projects.data('isotope'); // get Isotope instance
			loadMore(initShow); //execute function onload

			function loadMore(toShow) {
			    $projects.find(".hidden").removeClass("hidden");

			    var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
			      return item.element;
			    });
			    $(hiddenElems).addClass('hidden');
			    $projects.isotope('layout');

			    //when no more to load, hide show more button
			    if (hiddenElems.length == 0) {
			      jQuery(".load-more").hide();
			    } else {
			      jQuery(".load-more").show();
			    };
			}
			 
			//when load more button clicked
			loadMoreLink.on('click', function() {
			    if (projectFilterUl.data('clicked')) {
			      //when filter button clicked, set initial value for counter
			      counter = initShow;
			      projectFilterUl.data('clicked', false);
			    } else {
			      counter = counter;
			    };
			    counter = counter + initShow;
			    loadMore(counter);
			});

			//when filter button clicked
			projectFilterUl.on('click', function() {
			    $(this).data('clicked', true);

			    loadMore(initShow);
			});
		});

		$projects.on('arrangeComplete', function() {
			scrollSpy.refreshPositions();
		});

		// filter items on button click
		projectFilterUl.on( 'click', 'button', function() {
		  var filterValue = $(this).attr('data-filter');
		  $projects.isotope({ filter: filterValue });
		});

		/* ================================
		===  BACK TO TOP ANIMATION     ====
		=================================== */
		var offset = 700,
			offsetOpacity = 1200,
			scrollTopDuration = 700,
			backToTop = $('.back-to-top');

		//hide or show the "back to top" link
		$win.scroll(function(){
			( $(this).scrollTop() > offset ) ? backToTop.addClass('is-visible') : backToTop.removeClass('is-visible fade-out');
			if( $(this).scrollTop() > offsetOpacity ) { 
				backToTop.addClass('fade-out');
			}
		});

		//smooth scroll to top
		backToTop.on('click', function(event){
			event.preventDefault();
			$bodyHtml.animate({
				scrollTop: 0 ,
			 	}, scrollTopDuration
			);
		});

		/* ================================
		===  Animation on Scroll       ====
		=================================== */
		AOS.init({
	    	duration: 1000,
	    	easing: 'ease-in-out',
	    });
	
	    /* ================================
		===  RETINA READY              ====
		=================================== */
		retinajs();

		/* ================================
		===  Browser and Device Fixing ====
		=================================== */
		Modernizr.addTest('backgroundclip',function() {

		    var div = document.createElement('div');

		    if ('backgroundClip' in div.style)
		      return true;

		    'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g,function(val) { 
		      if (val+'BackgroundClip' in div.style) return true;
		    });

		});

		var placeholderSupport = ("placeholder" in document.createElement("input"));
			if(!placeholderSupport){
				
			  //This browser does not support the placeholder attribute
			  //use javascript instead
			  $('[placeholder]').focus(function() {
			    var input = $(this);
			    if (input.val() === input.attr('placeholder')) {
			      input.val('');
			      input.removeClass('placeholder');
			    }
			  }).blur(function() {
			    var input = $(this);
			    if (input.val() === '' || input.val() === input.attr('placeholder')) {
			      input.addClass('placeholder');
			      input.val(input.attr('placeholder'));
			    }
			  }).blur().parents('form').submit(function() {
			    $(this).find('[placeholder]').each(function() {
			      var input = $(this);
			      if (input.val() === input.attr('placeholder')) {
			        input.val('');
			      }
			    })
			});
		}

		if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) || navigator.userAgent.match(/iPhone;.*CPU.*OS 7_\d/i) ) {
		    $('.section-slider').height(window.innerHeight);
		    window.scrollTo(0, 0);
		}


	});

	/* ================================
	===  GOOGLE MAP AND STYLE      ====
	=================================== */
	var mapStyle = [
		{
			featureType: 'all',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#ededed'
				}
			]
		},
		{
			featureType: 'all',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#b7b7b7'
				}
			]
		},
		{
			featureType: 'road',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#FFFFFF'
				}
			]
		},
		{
			featureType: 'water',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#cfcfcf'
				}
			]
		},
		{
			featureType: 'all',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#333333'
				}
			]
		},
		{
			featureType: 'all',
			elementType: 'labels.text.stroke',
			stylers: [
				{
					visibility: 'off'
				}
			]
		},
		{
			featureType: 'poi',
			elementType: 'all',
			stylers: [
				{
					visibility: 'off'
				}
			]
		},
		{
			featureType: 'transit',
			elementType: 'all',
			stylers: [
				{
					visibility: 'off'
				}
			]
		}
	];

	function initMaps() {
		var geocoder = new google.maps.Geocoder();

		var $maps = $('.map');

		if($maps.length) {
			$maps.each(function() {
				var map = this;
				var $map = $(this);
				var address = $map.data('address');
				var latLng, gMap, pin;

				geocoder.geocode({ 'address' : address }, function(results, status) {
					if( status == google.maps.GeocoderStatus.OK ) {
						latLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
					} else {
						console.log("Geocoding unsuccessful. Reason: " + status);

						latLng = new google.maps.LatLng(48.104786, 16.049149);
					}

					var styledMap = new google.maps.StyledMapType(mapStyle, { name: 'Styled Map' });

					gMap = new google.maps.Map(map, {
						center: latLng,
						zoom: 16,
						disableDefaultUI: true,
						scrollwheel: false
					});

					gMap.mapTypes.set('map_style', styledMap);
					gMap.setMapTypeId('map_style');

					pin = new google.maps.Marker({
						position: latLng,
						map: gMap,
						icon: 'assets/images/google-map/map-pin.png'
					});
				});
			});
		}
	}

	window.initMaps = initMaps;

	/* ================================
	===  MAILCHIMP                 ====
	=================================== */
	var mailChimp = $('.mailchimp');
	mailChimp.ajaxChimp({
	    callback: mailchimpCallback,
	    url: "http://arifevrenerdem.us11.list-manage.com/subscribe/post?u=406e31254715533ce9d357b56&id=a088eee114" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
	});

	function mailchimpCallback(resp) {
	     if (resp.result === 'success') {
	        $('.subscription-success').html(resp.msg).fadeIn(1000);
	        $('.subscription-error').fadeOut(500);
	        
	    } else if(resp.result === 'error') {
	        $('.subscription-error').html(resp.msg).fadeIn(1000);
	    }  
	}

	/* =================================
	===  SUBSCRIPTION FORM          ====
	==================================== */
	var subscribeForm = $("#subscribe");
	subscribeForm.submit(function (e) {
	    e.preventDefault();
	    var email = $("#subscriber-email").val();
	    var dataString = 'email=' + email;

	    function isValidEmail(emailAddress) {
	        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	        return pattern.test(emailAddress);
	    };

	    if (isValidEmail(email)) {
	        $.ajax({
	            type: "POST",
	            url: "subscribe/subscribe.php",
	            data: dataString,
	            success: function () {
	                $('.subscription-success').fadeIn(1000);
	                $('.subscription-error').fadeOut(500);
	                $('.hide-after').fadeOut(500);
	            }
	        });
	    } else {
	        $('.subscription-error').fadeIn(1000);
	    }

	    return false;
	});

	/* ================================
	===  CONTACT FORM              ====
	=================================== */
 	var contactForm = $("#contact");
	contactForm.submit(function (e) {
	    e.preventDefault();
	    var name = $("#name").val();
	    var companyname = $("#companyname").val();
	    var phone = $("phone").val();
	    var email = $("#email").val();
	    var message = $("#message").val();
	    var dataString = 'name=' + name + '&companyname=' + companyname + '&phone=' + phone + '&email=' + email + '&message=' + message;

	    function isValidEmail(emailAddress) {
	        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	        return pattern.test(emailAddress);
	    };

	    if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
	        $.ajax({
	            type: "POST",
	            url: "sendmail.php",
	            data: dataString,
	            success: function () {
	                $('.success').fadeIn(1000);
	                $('.error').fadeOut(500);
	            }
	        });
	    } else {
	        $('.error').fadeIn(1000);
	        $('.success').fadeOut(500);
	    }

	    return false;
	});

	/* ================================
	===  SCROLLSPY CORE FUNCTIONS  ====
	=================================== */
	var ScrollSpy = function(options) {
		var _spy = this;
		
		_spy.linksContainerSelector = options.linksContainerSelector;
		_spy.sectionSelector = options.sectionSelector;
		
		_spy.$linksContainer = $(_spy.linksContainerSelector);
		_spy.$links = _spy.$linksContainer.find('li:not(.menu-item-has-children) a');
		_spy.$sections = $(_spy.sectionSelector);
		_spy.headerOffset = options.headerOffset;
		
		_spy.current;
		_spy.data = {};
	};
	
	ScrollSpy.prototype.getPositions = function() {
		var _spy = this;
		var data = _spy.data;

		_spy.$links.each(function() {
			var $link = $(this);
			var $section = $($link.attr('href'));

			data[$section.attr('id')] = $section.offset().top;
		});
	};
	
	ScrollSpy.prototype.refreshPositions = function() {
		var _spy = this;
		var data = _spy.data;
		
		_spy.$links.each(function() {
			var $link = $(this);
			var $section = $($link.attr('href'));

			data[$section.attr('id')] = $section.offset().top;
		});
	};
	
	ScrollSpy.prototype.getCurrentSection = function() {
		var _spy = this;
		var data = _spy.data;
		var scrollTop = $(window).scrollTop();

		for( var section in data ) {
			var $currentSection = $('#' + section);
			var $nextSection = $currentSection.next('.section');

			if( scrollTop >= $currentSection.offset().top - winH / 5 && $nextSection.length > 0 && $nextSection.offset().top >= scrollTop || scrollTop >= $currentSection.offset().top - winH / 5 && $nextSection.length === 0 ) {
				_spy.current = '#' + section;
			}
		}
		
		_spy.setCurrent();
	};
	
	ScrollSpy.prototype.setCurrent = function() {
		var _spy = this;

		_spy.$links.parents('ul:eq(0)').find('.active').removeClass('active');

		if( _spy.$linksContainer.find('a[href="' + _spy.current + '"]').length ) {
			_spy.$linksContainer.find('a[href="' + _spy.current + '"]').addClass('active');
		}
	};
	
	ScrollSpy.prototype.scrollToCurrentSection = function() {
		var _spy = this;
		
		var $section = $( _spy.current );
		var newTop = $section.offset().top;

		if( winW < 768 ) {
			newTop += $('.header').height();
		 } // else {
		// 	newTop -= 62;
		// }
		
		$('html, body').animate({
			scrollTop: newTop
		}, {
			duration: 700,
			queue: false
		});
	};
	
	ScrollSpy.prototype.bindEvents = function() {
		var _spy = this;
		
		_spy.$links
			.on('click.scrollSpy', function(e) {
				e.preventDefault();
				
				_spy.current = $(this).attr('href');
				_spy.scrollToCurrentSection();

				if( $('.navbar-collapse').hasClass('in') ) {
					$('.navbar-toggle').trigger('click');
				}
			});
		
		$win.on('scroll.scrollSpy', function() {
			_spy.getCurrentSection();
		});
	};
	
	ScrollSpy.prototype.init = function() {
		var _spy = this;
		
		_spy.getPositions();
		_spy.getCurrentSection();
		_spy.setCurrent();
		_spy.bindEvents();
	};

})(jQuery, window, document);