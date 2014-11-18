//	Any controller containing this service should have this line of code:
//		$scope.$on( 'MU_windowResized', function() { $scope.$apply(); });

MU_System.factory('muContent', [ '$window', '$rootScope', '$timeout', 'muMenus',
	function( $window, $rootScope, $timeout, muMenus ) {

	/*
	 *	Box Sizes
	 */
	function setSystemMetrics () {
		var offsetLeft    = getSize('left'),
			offsetRight   = getSize('right'),
			offsetTop     = getSize('top'),
			offsetBottom  = getSize('bottom');

		if ( offsetLeft + offsetRight > muContent.containerWidth ) {
			if ( offsetLeft > muContent.containerWidth ) {
				offsetRight = 0;
				offsetLeft = muContent.containerWidth;
			} else {
				offsetRight = muContent.containerWidth - offsetLeft;
			}
		}

		systemMetrics = {
			top:     offsetTop,
			right:   offsetRight,
			bottom:  offsetBottom,
			left:    offsetLeft,
			order:   0
		};
	}

	function getSize ( menuID ) {
		var size;

		if ( menus.items[ menuID ] && menus.items[ menuID ].visible ) {
			size = menus.items[ menuID ].styles[ menus.items[ menuID ].state ];
		} else {
			size = 0;
		}

		return size;
	}

	function getOpenSize ( menuID ) {
		var size;

		size = menus.items[ menuID ].styles.open;

		return size;
	}





	/*
	 *	Element queries
	 */
	function resizeHandler () {
		var resizeIntervalLimit = 16,
			timeNow = +new Date();


		if ( timeNow - lastResize > resizeIntervalLimit ){

			runResize();

		} else {

			if ( delayBroadcastResize ) {
				$timeout.cancel(delayBroadcastResize);
			}
			delayBroadcastResize = $timeout(function() {
				runResize();
				delayBroadcastResize = false;
			}, resizeIntervalLimit - (timeNow - lastResize));

		}
	}
	function runResize () {
		findContentSize();
		setQueryStrings();
		$rootScope.$broadcast( 'MU_windowResized' );


		lastResize = +new Date();
	}

	function findContentSize () {
		var MUContiner = document.getElementById('MU').parentNode,
			containerWidth =
				MUContiner.getBoundingClientRect().right -
				MUContiner.getBoundingClientRect().left,
			containerHeight =
				MUContiner.getBoundingClientRect().bottom -
				MUContiner.getBoundingClientRect().top,
			contentWidth =
				containerWidth -
				getSize( 'left' ) -
				getSize( 'right' ),
			contentHeight =
				containerHeight -
				getSize( 'top' ) -
				getSize( 'bottom' );

		muContent.containerWidth = containerWidth;
		muContent.contentWidth = contentWidth;

		muContent.containerHeight = containerHeight;
		muContent.contentHeight = contentHeight;

		return contentWidth;
	}

	function addQuery ( options ) {
		var i = 1, j;
		var	args = arguments;
		var	arg;
		var	queries, query;
		var	o = options || {};
		var	dir = typeof o === 'string' ?
				o :
				o.dir || 'w';
		var	context = o.context || 'content';
		var	callback = o.callback || undefined;


		for (; i<args.length; i+=1 ) {
			arg = args[i];

			switch ( typeof arg ) {
				case 'string':
				case 'number':
					queries = ( '' + arg ).split( ' ' );
					break;

				default:
					queries = arg;
					break;
			}

			for ( j=0; j<queries.length; j+=1 ) {
				query = queries[j];

				if ( context === 'content' ) {

					contentQueries[ dir ].push( +query );

				} else if ( context === 'container' ) {
					containerQueryCallbacks[ query ] = containerQueryCallbacks[ query ] || [];
					if ( callback ) {
						containerQueryCallbacks[ query ].push( callback );
					}
					containerQueries[ dir ].push( +query );
				}
			}
		}

		//	Sort the relevant queries array
		if ( context === 'content' ) {
			contentQueries[ dir ].sort(sortNumber);
		} else if ( context === 'content' ) {
			containerQueries[ dir ].sort(sortNumber);
		}

		setQueryStrings();

		$rootScope.$broadcast( 'MU_windowResized' );

		return muContent;
	}

	function setQueryStrings () {
		setContentQueryString();
		setContainerQueryString();
	}

	function setContentQueryString () {
		var greaterThan = '',
			i = 0,
			query, prevQuery;

		for (; i < contentQueries.w.length; i+=1 ) {
			query = contentQueries.w[i];

			if ( query > muContent.contentWidth ) {
				break;
			} else {
				greaterThan += ' content-minWidth' + query;
			}
		}

		muContent.contentClass = greaterThan;
	}

	function setContainerQueryString () {
		var greaterThan = '',
			i = 0,
			query, prevQuery;


		for (; i < containerQueries.w.length; i+=1 ) {
			query = containerQueries.w[i];

			if ( query > muContent.containerWidth ) {
				break;
			} else {
				greaterThan += ' container-minWidth' + query;
			}

			prevQuery = query;
		}

		muContent.containerClass = greaterThan;

		if ( prevQuery ) {
			runContainerQueryCallbacks( prevQuery );
		}
	}

	function runContainerQueryCallbacks ( querySize ) {
		var i = 0,
			callbacks = containerQueryCallbacks[ querySize ],
			callback;

		if ( callbacks ) {
			for (; i<callbacks.length; i+=1 ) {
				callback = callbacks[i];

				callback( querySize );
			}
		}
	}

	function runContentQueryCallbacks ( querySize ) {
		var i = 0,
			callbacks = contentQueryCallbacks[ querySize ],
			callback;

		if ( callbacks ) {
			for (; i<callbacks.length; i+=1 ) {
				callback = callbacks[i];

				callback( querySize );
			}
		}
	}



	/*
	 *	Array sorying numerically
	 */
	function sortNumber ( a, b ) {
		return a - b;
	}

	function muContent () {}

	var systemMetrics = {};
	var	menus = muMenus.menusBase;
	var	contentQueries = {
			w: [],
			h: []
		};
	var	containerQueries = {
			w: [],
			h: []
		};
	var	containerQueryCallbacks = {};
	var	delayBroadcastResize = false;
	var	lastResize = +new Date();



	angular.element($window).bind('resize', resizeHandler );
	$rootScope.$on( 'MU_menuAdded', function() {
		findContentSize();
	});
	$rootScope.$on( 'MU_visibilityToggled', function() {
		setSystemMetrics();
		findContentSize();
	});
	$rootScope.$on( 'MU_stateToggled', function() {
		setSystemMetrics();
		findContentSize();
	});





	findContentSize();
	muContent.addQuery = addQuery;
	muContent.metrics = function () {
		return systemMetrics;
	};
	muContent.contentClass = '';
	muContent.containerClass = '';

	muContent.containerWidth = 0;
	muContent.contentWidth = 0;

	muContent.containerHeight = 0;
	muContent.contentHeight = 0;





	return muContent;

}]);