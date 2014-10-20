var MU_System = angular.module('MU', []);
;//	Any controller containing this service should have this line of code:
//		$scope.$on( 'MU_windowResized', function() { $scope.$apply(); });

MU_System.factory('muMenus', [ '$window', '$rootScope', '$timeout',
	function( $window, $rootScope, $timeout ) {

	function setMetrics ( menuSide ) {
		var thisMenu     = menus[ menuSide ],
			size         = getSize( menuSide ),
			openSize     = getOpenSize( menuSide ),
			order        = orderOf( menuSide ),
			offset = {};


		offset[ menuSide ] = size - openSize;

		switch ( menuSide ) {
			case 'bottom':
			case 'top':
				offset.left   = 0;
				offset.right  = 0;

				if ( order <= orderOf('left') ) {
					offset.left = getSize('left');
				}

				if ( order <= orderOf('right') ) {
					offset.right = getSize('right');
				}
				break;

			case 'left':
			case 'right':
				offset.top     = 0;
				offset.bottom  = 0;

				if ( order <= orderOf('top') ) {
					offset.top = getSize('top');
				}

				if ( order <= orderOf('bottom') ) {
					offset.bottom = getSize('bottom');
				}
				break;
		}

		thisMenu.metrics = {
			size:    openSize,
			top:     offset.top,
			bottom:  offset.bottom,
			left:    offset.left,
			right:   offset.right,
			order:   order
		};
	}
	function setSystemMetrics () {
		var paddingLeft    = getSize('left'),
			paddingRight   = getSize('right'),
			paddingTop     = getSize('top'),
			paddingBottom  = getSize('bottom');

		if ( paddingLeft + paddingRight > muSystem.containerWidth ) {
			if ( paddingLeft > muSystem.containerWidth ) {
				paddingRight = 0;
				paddingLeft = muSystem.containerWidth;
			} else {
				paddingRight = muSystem.containerWidth - paddingLeft;
			}
		}

		systemMetrics = {
			top:     paddingTop,
			right:   paddingRight,
			bottom:  paddingBottom,
			left:    paddingLeft,
			order:   0
		};
	}
	function setAllMetrics () {
		var i;

		for ( i in menus ) {

			setMetrics( i );
		}
		setSystemMetrics();
	}



	function getSize ( menuSide ) {
		var size;

		if ( menus[ menuSide ] && menus[ menuSide ].visible ) {
			size = menus[ menuSide ].styles[ menus[ menuSide ].state ];
		} else {
			size = 0;
		}

		return size;
	}

	function getOpenSize ( menuSide ) {
		var size;

		size = menus[ menuSide ].styles.open;

		return size;
	}

	function orderOf ( menuSide ) {
		var order = 4 - menuOrder.indexOf( menuSide );

		return order;
	}

	function toggleState ( menuSide, to ) {
		var thisMenu = menus[ menuSide ];

		if ( typeof to === 'string' ) {
			thisMenu.state = to;
		} else {
			thisMenu.state = thisMenu.state === 'open' ?
				'closed' :
				'open';
		}

		handleLinks( menuSide );
		setAllMetrics();
		findContentSize();

		$rootScope.$broadcast( 'MU_stateToggled_' + menuSide, thisMenu.state );

		return muSystem;
	}
	function handleLinks ( menuSide ) {
		var i = 0,
			thisLink,
			thisMenuLinkIndex,
			otherMenuLinkIndex,
			otherMenuSide,

			thisMenu = menus[menuSide],
			otherMenu;

		for (; i<links.length; i+=1) {
			thisLink           = links[i];
			thisMenuLinkIndex  = thisLink.menus.indexOf( menuSide );

			if ( thisMenuLinkIndex > -1 ) {
				otherMenuLinkIndex = 1-thisMenuLinkIndex;
				otherMenuSide      = thisLink.menus[ 1-thisMenuLinkIndex ];

				handleLink ( thisLink.how, menuSide, otherMenuSide );
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
		var thisMenu = menus[A],
			otherMenu = menus[B];

		if ( thisMenu.state === 'open' ) {
			toggleState( B, 'closed' );
		}
	}
	function handleLink_oneClosed ( A, B ) {
		var thisMenu = menus[A],
			otherMenu = menus[B];

		if ( thisMenu.state === 'closed' ) {
			toggleState( B, 'open' );
		}
	}
	function handleLink_oneVisible ( A, B ) {
		var thisMenu = menus[A],
			otherMenu = menus[B];

		if ( thisMenu.visible ) {
			toggleVisibility( B, false );
		}
	}
	function handleLink_oneHidden ( A, B ) {
		var thisMenu = menus[A],
			otherMenu = menus[B];

		if ( !thisMenu.visible ) {
			toggleVisibility( B, true );
		}
	}



	function toggleVisibility ( menuSide, to ) {
		if ( typeof to === 'boolean' ) {
			menus[ menuSide ].visible = to;
		} else {
			menus[ menuSide ].visible = !menus[ menuSide ].visible;
		}

		handleLinks( menuSide );
		setAllMetrics();
		findContentSize();

		return muSystem;
	}

	function isVisible ( menuSide ) {
		return menus[ menuSide ].visible;
	}

	function stateOf ( menuSide ) {
		return menus[ menuSide ].state;
	}

	function isOfState ( menuSide, state ) {
		return stateOf( menuSide ) === state;
	}

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

			menuSides


		if ( !which ) {
			links = [];
			return muSystem();
		} else if ( typeof which === 'string' ) {
			menuSides = which.split(' ');
		} else {
			menuSides = which;
		}


		for (; i < links.length; i+=1 ) {
			thisLink = links[i];
			linkAIndex = thisLink.menuSides.indexOf( menuSides[0] );
			linkBIndex = thisLink.menuSides.indexOf( menuSides[1] );

			if (	linkAIndex !== -1 &&
					linkBIndex !== -1 &&
					linkAIndex !== linkBIndex &&
					!how || how === thisLink.how ) {
				links.splice( i, 1 );
			}

		}

		return muSystem;
	}

	function addMenu ( menuSide, options ) {
		var o = options || {},

			visible = typeof o.visible === 'boolean' ?
				o.visible :
				true,
			state = o.state || 'open',
			sizeOpen = o.sizeOpen || 50,
			sizeClosed = o.sizeClosed || 10;


		menus[ menuSide ] = {
			visible: visible,
			state: state,

			styles: {
				open: sizeOpen,
				closed: sizeClosed
			}
		};
		menuOrder.push( menuSide );


		setAllMetrics();
		findContentSize();


		return muSystem;
	}

	function reorderMenu ( requestedOrder ) {
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

		for (; i<ro.length; i+=1 ) {
			item = ro[i];

			if ( menuOrder.indexOf( item ) > -1 ) {
				newOrder.push( item );
			}
		}

		for ( i=0; i<menuOrder.length; i+=1 ) {
			item = menuOrder[i];

			if ( newOrder.indexOf( item ) === -1 ) {
				newOrder.push( item );
			}
		}

		menuOrder = newOrder;

		setAllMetrics();

		return muSystem;
	}

	function menuIndex ( reference ) {
		if ( typeof reference === 'number' ) {
			return reference;
		} else {
			return menuOrder.indexof( reference );
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
			greaterThan = '',
			i = 100;

		while ( i < contentWidth  ) {
			greaterThan += ' media__min-width__' + i;
			i += 100;
		}

		muSystem.mediaClass = greaterThan;
		muSystem.containerWidth = containerWidth;
		muSystem.contentWidth = contentWidth;

		muSystem.containerHeight = containerHeight;

		return contentWidth;
	}

	function resizeHandler () {
		var timeNow = +new Date(),
			oldContainerClass;

		if ( timeNow - lastResize > 300 ){
			oldContainerClass = muSystem.mediaClass;
			findContentSize();

			if ( broadcastResize ) {
				$timeout.cancel(broadcastResize);
			}
			broadcastResize = $timeout(function() {
				resizeHandler();
				$rootScope.$broadcast( 'MU_windowResized' );
				broadcastResize = false;
			}, 300);
		}

	}

	function getSystemMetrics () {
		return systemMetrics;
	}

	function muSystem () {}





	var menus = {},
		systemMetrics = {},
		links = [],
		menuOrder = [],
		broadcastResize = false,
		lastResize = +new Date();





	angular.element($window).bind('resize', resizeHandler );





	muSystem.add = addMenu;
	muSystem.link = linkMenus;
	muSystem.unlink = unlinkMenus;
	muSystem.reorder = reorderMenu;
	muSystem.mediaClass = '';

	findContentSize();

	muSystem.toggleState = toggleState;
	muSystem.toggleVisibility = toggleVisibility;

	muSystem.setMetrics = setMetrics;

	muSystem.isVisible = isVisible;
	muSystem.is = isOfState;
	muSystem.state = stateOf;
	muSystem.menus = menus;
	muSystem.metrics = getSystemMetrics;
	muSystem.sizeOf = getSize;

	muSystem.number = 100;

	return muSystem;
}]);