jQuery(document).ready(function ($) {

	/*********************************************************************************/
	/* JS declaration                                                                */
	/*********************************************************************************/
	
		var clickTouchAction      = 'click touch';
		var mouseTouchEnterAction = 'mouseenter touchstart';
		var mouseTouchLeaveAction = 'mouseleave touchend';
	
	/*********************************************************************************/
	/* Webkit mobile                                                                 */
	/*********************************************************************************/
	
		var ua = navigator.userAgent,
		isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
	
	/*********************************************************************************/
	/* Html declaration                                                              */
	/*********************************************************************************/
		
		/* Html dom */
	    var mywindow 	= $(window);
	    var htmlbody 	= $('html,body');
		/* Navigation */
	    var links 		= $('.navigation').find('li');
	    var ahrefs 		= $('a[href^="#"]');
	    var menu 		= $('nav.menu');
	    /* Slides */
	    var mbslide  	= $('.mbslide');
	    var rslide 		= $('.rslides');
	    var resume 		= $('#resume');
	    /* First Slide */
	    var meSlide 	= $('#me');
	    /* Nudges */
	    var box 		= $('.box');
	    var story 		= $('.story');
	    /* Progress bar */
	    var skiller		= $('.skiller');
	    var skillexpand = $('#skill .expand');
	    /* Contact form */
	    var contact     = $("#contact");
	    var contactform	= $('#contactform');
	    
	    //var button 		= $('.button');
	    
	    /*Do not forget the waipoints http://imakewebthings.com/jquery-waypoints/ */
		

	/*********************************************************************************/
	/* Parallax                                                                      */
	/*********************************************************************************/
		
		if (!isMobileWebkit) {
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0,
				responsive: true
			});
		}
			    
	/*********************************************************************************/
	/* Images slides                                                                 */
	/*********************************************************************************/
		
		rslide.responsiveSlides({
		  auto: true,             // Boolean: Animate automatically, true or false
		  speed: 1000,            // Integer: Speed of the transition, in milliseconds
		  timeout: 30000,         // Integer: Time between slide transitions, in milliseconds
		  pager: false,           // Boolean: Show pager, true or false
		  nav: false,             // Boolean: Show navigation, true or false
		  random: false,          // Boolean: Randomize the order of the slides, true or false
		  pause: false,           // Boolean: Pause on hover, true or false
		  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		  prevText: "Previous",   // String: Text for the "previous" button
		  nextText: "Next",       // String: Text for the "next" button
		  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
		  manualControls: "",     // Selector: Declare custom pager navigation
		  namespace: "rslides",   // String: Change the default namespace used
		  before: function(){},   // Function: Before callback
		  after: function(){}     // Function: After callback
		});
		
		
	/*********************************************************************************/
	/* BxSlider                                                                      */
	/*********************************************************************************/
	
		$('.bxslider').bxSlider({
			slideWidth: 2000,
			minSlides: 2,
			maxSlides: 2,
			moveSlides: 1,
			auto: true,
			pause: 10000,
			slideMargin: 0,
			pager: true
		});
		
		
	/*********************************************************************************/
	/* Nudge                                                                         */
	/*********************************************************************************/
	
		//Define the plugin
		$.fn.nudge = function(params) {
			//set default parameters
			params = $.extend({
				amount: 20,					//amount of pixels to pad / marginize
				duration: 300,				//amount of milliseconds to take
				property: 'margin', 		//the property to animate (could also use margin)
				direction: 'left',			//direction to animate (could also use right)
				myProperty: 'margin', 	    //the property to animate (could also use margin)
				myDirection: 'right',		//direction to animate (could also use right)
				toCallback: function() {},	//function to execute when MO animation completes
				fromCallback: function() {}	//function to execute when MOut animation completes
			}, params);
			// For every element meant to nudge...
			this.each(function() {
				// Variables
				var $t = $(this);
				var $p = params;
				var dir = $p.direction;
				var prop = $p.property + dir.substring(0,1).toUpperCase() + dir.substring(1,dir.length);
				var initialValue = $t.css(prop);
				// Added variables for second moves
				var myProrperty = $p.myProperty;
				var myDirection = $p.myDirection;
				var myProp = myProrperty + myDirection.substring(0,1).toUpperCase() + myDirection.substring(1,myDirection.length); 
				var myInitialValue = $t.css(myProp);			
				/* fx */
				var go = {}; go[prop] = parseInt($p.amount) + parseInt(initialValue);
				var bk = {}; bk[prop] = initialValue;
							 // Second move
							 go[myProp] = (parseInt($p.amount) * -1) + parseInt(myInitialValue);
							 bk[myProp] = myInitialValue;			
				
				//Proceed to nudge on hover			
				$t.bind(mouseTouchEnterAction,function(){
					$t.stop().animate(go, $p.duration, '', $p.toCallback);
				});
				
				$t.bind(mouseTouchLeaveAction,function(){
					$t.stop().animate(bk, $p.duration, '', $p.fromCallback);
				});
				
			});
			return this;
		};
		
		
		/*==================================*/
		/* Box nudge                        */
		/*==================================*/
		if (!isMobileWebkit) {
		
			box.nudge({
				property: 'margin',
				direction: 'top',
				myProperty: 'margin',
				myDirection: 'bottom',
				amount: -20,
				duration: 200,
				toCallback: function() {  },
				fromCallback: function() { }
			});
		
		}
		
		/*==================================*/
		/* Box nudge                        */
		/*==================================*/
		if (!isMobileWebkit) {
		
			$('.story-body').nudge({
				property: 'margin',
				direction: 'right',
				myProperty: 'margin',
				myDirection: 'left',
				amount: -10,
				duration: 400,
				toCallback: function() {  },
				fromCallback: function() { }
			});
		
		}
		
		
	/*********************************************************************************/
	/* Squeeze                                                                       */
	/*********************************************************************************/
	
		//Define the plugin
		$.fn.squeeze = function(params) {
			//set default parameters
			params = $.extend({
				amount: 20,					//amount of pixels to pad / marginize
				duration: 300,				//amount of milliseconds to take
				property: 'margin', 		//the property to animate (could also use margin)
				direction: 'left',			//direction to animate (could also use right)
				myProperty: 'margin', 	    //the property to animate (could also use margin)
				myDirection: 'right',		//direction to animate (could also use right)
				myClass: ''					//the default class is null
			}, params);
			
			// For every element meant to squeeze...
			this.each(function() {
				// Variables
				var $p = params;
				// We want to move another class
				var $t = (!$p.myClass)? $(this) : $(this).find($p.myClass);
				var dir = $p.direction;
				var prop = $p.property + dir.substring(0,1).toUpperCase() + dir.substring(1,dir.length);
				var initialValue = $t.css(prop);
				// Added variables for second moves
				var myProrperty = $p.myProperty;
				var myDirection = $p.myDirection;
				var myProp = myProrperty + myDirection.substring(0,1).toUpperCase() + myDirection.substring(1,myDirection.length); 
				var myInitialValue = $t.css(myProp);			
				/* fx */
				var go = {};
				var bk = {};
				var fw = {};
				go[prop] = parseInt($p.amount) + parseInt(initialValue);
				fw[prop] = (parseInt($p.amount) * -1) + parseInt(initialValue);
				bk[prop] = initialValue;
				 // Second move
				 go[myProp] = (parseInt($p.amount) * -1) + parseInt(myInitialValue);
				 fw[myProp] = parseInt($p.amount) + parseInt(myInitialValue);
				 bk[myProp] = myInitialValue;
				
				$(this).bind(mouseTouchEnterAction, function(){
					$t.stop().animate(go, $p.duration, 'easeInQuad', function() {
						$(this).stop().animate(fw, $p.duration, 'easeOutQuad', function() {	
							$(this).stop().animate(bk, $p.duration, 'easeOutQuad');
						});
					});
				});
				
				$(this).bind(mouseTouchLeaveAction, function(){
					$t.stop(false, true);
				});
				
			});
			
			return this;
		};
		
		/*==================================*/
		/* Image squeeze                    */
		/*==================================*/
		if (!isMobileWebkit) {
			box.squeeze({
				property: 'margin',
				direction: 'left',
				myProperty: 'margin',
				myDirection: 'right',
				amount: -15,
				duration: 100,
				myClass: '.image-centered'
			});
		}
		
		/*==================================*/
		/* Calendar squeeze                 */
		/*==================================*/
		if (!isMobileWebkit) {
			story.squeeze({
				property: 'margin',
				direction: 'left',
				myProperty: 'margin',
				myDirection: 'right',
				amount: -15,
				duration: 100,
				myClass: '.story-img'
			});
		}
	
	
	
	
	/*********************************************************************************/
	/* Skill bars                                                                    */
	/*********************************************************************************/
	
	    
	    /*==================================*/
		/* Reload animtion function         */
		/*==================================*/
	    function reloadAnimation(element, className) {
		    //event.preventDefault;
			// -> removing the class
			element.classList.remove(className);
			// -> triggering reflow The actual magic
			// without this it wouldn't work. 
			element.offsetWidth = element.offsetWidth;
			// -> and re-adding the class
			element.classList.add(className);
	    }
	    
	    function expandProgBar() {
		    // Search for all the expand class
			skillexpand.each(function() {
				if($(this).hasClass('begin') ) {
					$(this).removeClass('begin');
					// Search for the second propoerty
					var myClass = $(this).attr('class').split(' ')[2];
					// If the second property exists
					if(myClass){
						// Get the HTML representation 
						var element = $(this).get(0)
						// Reload the animation 
						reloadAnimation(element, myClass);
					}
				}
			});
	    }
	    
	    /*==================================*/
		/* Waypoint top                     */
		/*==================================*/
		/* Top hit the top of slide */
		skiller.waypoint(function(direction) {
			// We are going down touching the upper edge
			if(direction === 'down' || direction === 'up') {
				expandProgBar();
			}
		}, { offset:'70%' });
		
		/* Top hit the top of skiller */
		skiller.waypoint(function(direction) {
			// We are going down touching the upper edge
			if(direction === 'down' || direction === 'up') {
				expandProgBar();
			}
		});
		
		/*==================================*/
		/* Waypoint bottom                  */
		/*==================================*/
		
		/* Bottom hit the top of resume */
		resume.waypoint(function(direction) {
			// Search for all the expand class
			skillexpand.each(function() {
				// Begin state is back, no animation
				$(this).addClass('begin');
			});
		}, { offset:function() {
				return window.innerHeight;
		   }
		});
		
		/* Top hit the bottom of resume */
		resume.waypoint(function(event, direction) {
			// Search for all the expand class
			skillexpand.each(function() {
				// Begin state is back, no animation
				$(this).addClass('begin');
			});
		}, { offset:function() {
				return - $(this).outerHeight();
		   }
		});
		
		
		
	/*********************************************************************************/
	/* Links animation                                                               */
	/*********************************************************************************/
   
		/*==================================*/
		/* Goto hrefs function              */
		/*==================================*/
		
		function goToHrefByScroll(target) {
			var animationSpeed = 1000;
			$target = $(target);
			htmlbody.stop().animate({
			    'scrollTop': $target.offset().top
			}, animationSpeed, 'easeInOutCubic', function () {
			    window.location.hash = target;
			});
		}
	    
	    /*==================================*/
		/* Scroll to hrefs                  */
		/*==================================*/
		ahrefs.bind(clickTouchAction,function (e) {
		    e.preventDefault();
		    var target = this.hash;
			goToHrefByScroll(target);
		});
		
		/*==================================*/
		/* Active menu                      */
		/*==================================*/
		
		// For a better responsiveness play this with waypoints 
		// For each slides : put a waypoint on top and bottom
	    mbslide.each(function(){
	        
	        $(this).waypoint(function(direction){
	        	if(direction === 'down') {
		        	$('.navigation a').removeClass('active');
		        	$('.navigation a[href="#'+ this.id +'"]').addClass('active');
		        	if (!isMobileWebkit)
		        		{ window.location.hash = '#'+ this.id; }
		        }
			}, {offset: '1%'});
			
			$(this).waypoint(function(direction) {
				if(direction === 'up') {
					$('.navigation a').removeClass('active');
					$('.navigation a[href="#'+ this.id +'"]').addClass('active');
					/*alert("Bootom " + this.id);*/
				}
			}, { offset:function() {
						return - $(this).outerHeight();
					}
			});
	    });
		
		
	/*********************************************************************************/
	/* Menu opacity                                                                  */
	/*********************************************************************************/
		
		menu.waypoint(function(direction){
			// We are going down touching the upper edge
			if(direction === 'down') {
				menu.addClass('m-shadow');
				menu.addClass('menu-header');
				menu.removeClass('menu');
				
			}
			else {
				menu.addClass('menu');
				menu.removeClass('menu-header');
				menu.removeClass('m-shadow');
			}
		}, {offset: '0'});
		
		contact.waypoint(function(direction){
			// We are going down touching the upper edge
			if(direction === 'down') {
				menu.removeClass('menu');
				menu.removeClass('menu-header');
				menu.addClass('menu-footer');
				menu.addClass('m-shadow');
			}
			else {
				menu.removeClass('menu');
				menu.removeClass('menu-footer');
				menu.addClass('menu-header');
				menu.addClass('m-shadow');
			}
		}, {offset: '1%'});
		
		
		/*==================================*/
		/* First slide responsive height    */
		/*==================================*/
		if (!isMobileWebkit) {
			var meSlidePaddingTop 	 = meSlide.css('padding-top').replace("px", "");
			var meSlidePaddingBottom = meSlide.css('padding-bottom').replace("px", "");
			
			function sliderHeight() {
				wh = mywindow.height() - meSlidePaddingTop - meSlidePaddingBottom;
				meSlide.css({height:wh});
			}
			
			sliderHeight();
			
			mywindow.bind('resize',function() {
				sliderHeight();
			});
		}
	
	/*********************************************************************************/
	/* Form validation                                                               */
	/*********************************************************************************/
	
		// Important ! Needed for the construction of the html mailto
		// construction to avoid bots
		var _myMailTo;
		
		var mailSent  = "Your mail has been sent.";
		var mailError = "There was an error sending your mail.";
		
		/*==================================*/
		/* Form validation function         */
		/*==================================*/
		contactform.validate({
		
			errorClass: "contactformerror",
			errorPlacement: function(error, element) {
			    error.insertBefore(element);
			},
			onfocusout: function(element) {
							$("label.contactformerror[for='" + element.id + "']").remove();
							this.element(element); 
			},
			rules: {
				// Name
				name: {
					required: true
				},
				// Email
				email: {
				  required: true,
				  email: true
				},
				// Subject
				subject: {
				  required: true,
				  minlength: 5
				},
				// Message
				message: {
				  required: true,
				  minlength: 10
				}
			},
			submitHandler: function(form) {
				mailSender();
				contactform.trigger("reset");
			}
		});
	
		/*==================================*/
		/* Get the current date             */
		/*==================================*/
		function getCurrentDate() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
			return today;
		}
	
		/*==================================*/
		/* Send mail through AJAX post      */
		/*==================================*/
		
		function mailSender() {
		
			// Transform the action attribute to prevent spams
			var str = contactform.attr('action');
			
			// Get the fields values 
			var cname = $('#cname').val();
			var cemail = $('#cemail').val();
			var csubject = $('#csubject').val();
			var cmessage = $('#cmessage').val();
			
			// Get the values in each fields and post the value with HTTP protocol
			$.post("../php/mailService.php", 
			{ name: cname, email: cemail, subject: csubject, message: cmessage, sendmail: 'sendmail' })
			.done(function(data) {
				cmessage = $('#cmessage');
				cmessage.focus();
				if(data.success == true) {
					cmessage.before('<label for="' + cmessage.attr('id') + '" class="contactformerror">' + mailSent + '</label>');
				}
				else {
					cmessage.before('<label for="' + cmessage.attr('id') + '" class="contactformerror">"' + mailError + '</label>');
				}
			});
		}
	
});