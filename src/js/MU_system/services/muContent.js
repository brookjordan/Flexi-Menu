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
		var resizeIntervalLimit = 333,
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
		setContentQueryString();
		setContainerQueryString();
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
		var i = 1, j,
			args = arguments, arg,
			queries, query,
			o = options || {},
			type = typeof o === 'string' ?
				o :
				o.type,
			callback = o.callback || undefined;

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

				contextQueries[ type ].push( +query );

				queryCallbacks[ query ] = queryCallbacks[ query ] || [];
				if ( callback ) {
					queryCallbacks[ query ].push( callback );
				}
			}
		}

		contextQueries[ type ].sort(sortNumber);
		setContentQueryString();
		setContainerQueryString();

		$rootScope.$broadcast( 'MU_windowResized' );

		return muContent;
	}

	function setContentQueryString () {
		var greaterThan = '',
			i = 0,
			query, prevQuery;

		for (; i < contextQueries.w.length; i+=1 ) {
			query = contextQueries.w[i];

			if ( query > muContent.contentWidth ) {
				break;
			} else {
				greaterThan += ' media__min-width__' + query;
			}
		}

		muContent.contentClass = greaterThan;
	}

	function setContainerQueryString () {
		var greaterThan = '',
			i = 0,
			query, prevQuery;

		for (; i < contextQueries.w.length; i+=1 ) {
			prevQuery = query;
			query = contextQueries.w[i];

			if ( query > muContent.containerWidth ) {
				break;
			} else {
				greaterThan += ' media__min-width__' + query;
			}
		}

		muContent.containerlass = greaterThan;

		if ( prevQuery ) {
			runQueryCallbacks( prevQuery );
		}
	}

	function runQueryCallbacks ( querySize ) {
		var i = 0,
			callbacks = queryCallbacks[ querySize ],
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

	var systemMetrics = {},
		menus = muMenus.menusBase,
		contextQueries = {
			w: [],
			h: []
		},
		queryCallbacks = {},
		delayBroadcastResize = false,
		lastResize = +new Date();



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
	muContent.containerlass = '';

	muContent.containerWidth = 0;
	muContent.contentWidth = 0;

	muContent.containerHeight = 0;
	muContent.contentHeight = 0;





	return muContent;

}]);