var MU_System = angular.module('MU', []);
;MU_System.factory('muMenus', [ '$rootScope', '$timeout',
	function( $rootScope, $timeout ) {


	/*
	 *	Add a new menu
	 */
	function addMenu ( menuID, options ) {
		var o = options || {},

			visible = typeof o.visible === 'boolean' ?
				o.visible :
				true,
			state = o.state || 'open',

			//	TODO: Remove when muContent has a better way of getting sizes
			sizeOpen = o.sizeOpen || 50,
			sizeClosed = o.sizeClosed || 10;
			//	ENDTODO: Remove when muContent has a better way of getting sizes


		menus.items[ menuID ] = {
			visible: visible,
			state: state,
			children: {},

			//	TODO: Remove when muContent has a better way of getting sizes
			styles: {
				open: sizeOpen,
				closed: sizeClosed
			}
			//	ENDTODO: Remove when muContent has a better way of getting sizes
		};
		menus.order.push( menuID );


		setAllOrders();

		$rootScope.$broadcast( 'MU_menuAdded', { menuID: menuID } );


		return muSystem;
	}





	/*
	 *	Menu ordering
	 */
	function setOrder ( menuID ) {
		var oldOrder	= angular.copy( menus.order ),
			thisMenu    = menus.items[ menuID ],
			order       = orderOf( menuID );

		thisMenu.order = order;

		$rootScope.$broadcast( 'MU_menuReordered', { menuID: menuID, oldOrder: oldOrder, newOrder: menus.order } );

		return muSystem;
	}

	function setAllOrders () {
		var i;

		for ( i in menus.items ) {
			setOrder( i );
		}

		return muSystem;
	}

	function orderOf ( menuID ) {
		var order = 4 - menus.order.indexOf( menuID );

		return order;
	}

	function reorderMenus ( requestedOrder ) {
		var ro,
			newOrder = [],

			item,
			i = 0;

		if ( typeof requestedOrder === 'undefined' ) {
			ro = [];
		} else if ( typeof requestedOrder === 'string' ) {
			ro = requestedOrder.split(' ');
		} else {
			ro = requestedOrder;
		}

		for (; i < ro.length; i+=1 ) {
			item = ro[i];

			if ( menus.order.indexOf( item ) > -1 ) {
				newOrder.push( item );
			}
		}

		if ( newOrder.length !== menus.order.length ) {
			for ( i=0; i<menus.order.length; i+=1 ) {
				item = menus.order[i];

				if ( newOrder.indexOf( item ) === -1 ) {
					newOrder.push( item );
				}
			}
		}

		menus.order = newOrder;

		setAllOrders();

		return muSystem;
	}

	function menuIndex ( reference ) {
		if ( typeof reference === 'number' ) {
			return reference;
		} else {
			return menus.order.indexof( reference );
		}
	}





	/*
	 *	Visibility
	 */
	function toggleVisibility ( menuID, to ) {
		if ( typeof to === 'boolean' ) {
			menus.items[ menuID ].visible = to;
		} else {
			menus.items[ menuID ].visible = !menus.items[ menuID ].visible;
		}

		handleLinks( menuID );
		setAllOrders();

		$rootScope.$broadcast( 'MU_visibilityToggled', { menuID: menuID });

		return muSystem;
	}

	function isVisible ( menuID ) {
		return menus.items[ menuID ].visible;
	}





	/*
	 *	State manipulation
	 */
	function toggleState ( menuID, to ) {
		var thisMenu = menus.items[ menuID ];

		if ( typeof to === 'string' ) {
			thisMenu.state = to;
		} else {
			thisMenu.state = thisMenu.state === 'open' ?
				'closed' :
				'open';
		}

		handleLinks( menuID );
		setAllOrders();

		$rootScope.$broadcast( 'MU_stateToggled', { menuID: menuID, newState: thisMenu.state} );

		return muSystem;
	}

	function stateOf ( menuID ) {
		return menus.items[ menuID ].state;
	}

	function isOfState ( menuID, state ) {
		return stateOf( menuID ) === state;
	}





	/*
	 *	State Linking
	 */
	function linkMenus ( which, how, options ) {
		var o     = options || {},
			linksMenus = typeof which === 'string' ?
				which.split(' ') :
				which;

		links.push({
			menus: linksMenus,
			how:   how
		});

		handleLink ( how, linksMenus[0], linksMenus[1] );

		return muSystem;
	}

	function unlinkMenus ( which, how ) {
		var i     = 0,
			thisLink,

			linkAIndex,
			linkBIndex,

			menuIDs;


		if ( !which ) {
			links = [];
			return muSystem();
		} else if ( typeof which === 'string' ) {
			menuIDs = which.split(' ');
		} else {
			menuIDs = which;
		}


		for (; i < links.length; i+=1 ) {
			thisLink = links[i];
			linkAIndex = thisLink.menuIDs.indexOf( menuIDs[0] );
			linkBIndex = thisLink.menuIDs.indexOf( menuIDs[1] );

			if (	linkAIndex !== -1 &&
					linkBIndex !== -1 &&
					linkAIndex !== linkBIndex &&
					!how || how === thisLink.how ) {
				links.splice( i, 1 );
			}

		}

		return muSystem;
	}

	function handleLinks ( menuID ) {
		var i = 0,
			thisLink,
			thisMenuLinkIndex,
			otherMenuLinkIndex,
			othermenuID,

			thisMenu = menus.items[menuID],
			otherMenu;

		for (; i<links.length; i+=1) {
			thisLink           = links[i];
			thisMenuLinkIndex  = thisLink.menus.indexOf( menuID );

			if ( thisMenuLinkIndex > -1 ) {
				otherMenuLinkIndex = 1-thisMenuLinkIndex;
				othermenuID      = thisLink.menus[ 1-thisMenuLinkIndex ];

				handleLink ( thisLink.how, menuID, othermenuID );
			}
		}
	}

	function handleLink ( how, A, B ) {
		switch ( how ) {
			case 'one open':
				handleLink_oneOpen( A, B );
				break;

			case 'one closed':
				handleLink_oneClosed( A, B );
				break;

			case 'one visible':
				handleLink_oneVisible( A, B );
				break;

			case 'one hidden':
				handleLink_oneHidden( A, B );
				break;

			default:
				break;
		}
	}
	function handleLink_oneOpen ( A, B ) {
		var thisMenu = menus.items[A],
			otherMenu = menus.items[B];

		if ( thisMenu.state === 'open' ) {
			toggleState( B, 'closed' );
		}
	}
	function handleLink_oneClosed ( A, B ) {
		var thisMenu = menus.items[A],
			otherMenu = menus.items[B];

		if ( thisMenu.state === 'closed' ) {
			toggleState( B, 'open' );
		}
	}
	function handleLink_oneVisible ( A, B ) {
		var thisMenu = menus.items[A],
			otherMenu = menus.items[B];

		if ( thisMenu.visible ) {
			toggleVisibility( B, false );
		}
	}
	function handleLink_oneHidden ( A, B ) {
		var thisMenu = menus.items[A],
			otherMenu = menus.items[B];

		if ( !thisMenu.visible ) {
			toggleVisibility( B, true );
		}
	}






	/*
	 *	Menu system function
	 *	May well stay empty, but allows it to be a function in future
	 */
	function muSystem () {
		return menus;
	}

	var menus = {
			items: {},
			order: []
		},
		links = [];










	muSystem.add = addMenu;
	muSystem.link = linkMenus;
	muSystem.unlink = unlinkMenus;
	muSystem.reorder = reorderMenus;

	muSystem.toggleState = toggleState;
	muSystem.toggleVisibility = toggleVisibility;

	muSystem.setOrder = setOrder;

	muSystem.isVisible = isVisible;
	muSystem.is = isOfState;
	muSystem.state = stateOf;
	muSystem.menus = menus.items;
	muSystem.menusBase = menus;

	return muSystem;
}]);
;//	Any controller containing this service should have this line of code:
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
		var timeNow = +new Date(),
			oldContainerClass;

		if ( timeNow - lastResize > 300 ){
			oldContainerClass = muContent.mediaClass;
			findContentSize();

			if ( delayBroadcastResize ) {
				$timeout.cancel(delayBroadcastResize);
			}
			delayBroadcastResize = $timeout(function() {
				resizeHandler();
				$rootScope.$broadcast( 'MU_windowResized' );
				delayBroadcastResize = false;
			}, 300);
		}
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

		setContextQueryString();

		return contentWidth;
	}

	function addQuery ( type ) {
		var i = 1, j,
			args = arguments, arg,
			queries, query;

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
				contextQueries[ type ].push( +queries[j] );
			}
		}

		contextQueries[ type ].sort(sortNumber);
		setContextQueryString();

		$rootScope.$broadcast( 'MU_windowResized' );

		return muContent;
	}

	function setContextQueryString () {
		var greaterThan = '',
			i = 0, query;

		for (; i < contextQueries.w.length; i+=1 ) {
			query = contextQueries.w[i];

			if ( query <= muContent.contentWidth ) {
				greaterThan += ' media__min-width__' + query;
			} else {
				break;
			}
		}

		muContent.mediaClass = greaterThan;
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
	muContent.mediaClass = '';





	return muContent;

}]);