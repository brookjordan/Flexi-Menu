myApp

.directive('muSystem', function() {
	return {
		controller: 'MUSystemController',
		controllerAs: 'MU',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/muSystemDirective.html'
	};
})

.controller('MUSystemController', [ 'muMenus', 'muContent', '$scope', "$interval",
function( muMenus, muContent, $scope, $interval ){
	var self = this;

	function capitalise ( string ) {
		return string.substr(0,1).toUpperCase() + string.substr(1);
	}

	function callback ( querySize ) {
		switch ( querySize ) {
			case 100:
			case 200:
			case 300:
			case 400:
			case 500:
			case 600:
			case 700:
				muMenus
					.unlink()
					.link('left right', 'one open');

				break;
			default:
				muMenus
					.unlink();
				break;
		}
	}



	self.getClassName = function () {
		var className = "",
			i, j, menu, menu2;

		for ( i in muMenus.menus ) {
			menu = muMenus.menus[i];

			className += ' MU-' + i + '--' +
				(menu.visible ?
					menu.state :
					'hidden');

			className += ' MU-' + i + "Order" + menu.order;

			for ( j in muMenus.menus ) {
				if (j !== i) {
					menu2 = muMenus.menus[j];

					if ( menu.order > menu2.order ) {
						className += ' MU-' + i + "Above" + capitalise( j );
					} else {
						className += ' MU-' + i + "Below" + capitalise( j );
					}
				}
			}
		}

		return className;
	};



	//	Creating flexible link and unlink functions
	self.linkMenus = function (which) {
		muMenus.link( which, prompt() );
	};

	self.unlinkMenus = function (which) {
		muMenus.unlink( which, prompt() );
	};



	//	Adding menus
	muMenus
		.add('top', {
			sizeOpen: 80,
			sizeClosed: 50
		})
		.add('bottom', {
			//visible: false,
			state: 'open',

			sizeOpen: 60,
			sizeClosed: 50
		})
		.add('right', {
			state: 'closed',
			sizeOpen: 260,
			sizeClosed: 50
		})
		.add('left', {
			state: 'closed',
			sizeOpen: 260,
			sizeClosed: 50
		})
		.link( 'left right', 'one open' );

	muContent
		.addQuery( {
			type: 'w',
			context: 'content',
			callback: callback
		}, '100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700' );



	//	Setting menus to be in HTML
	self.menus = muMenus;
	self.content = muContent;

	self.leftIcons = '0 1 2 3 4'.split(' ');
	self.rightIcons = '0 1 2 3'.split(' ');

	self.leftOpen = -1;
	self.rightOpen = -1;

	self.selectLeft = function ( $index ) {
		if (self.leftOpen !== $index) {
			self.leftOpen = $index;
		} else {
			self.leftOpen = -1;
		}
	};
	self.selectRight = function ( $index ) {
		if (self.rightOpen !== $index) {
			self.rightOpen = $index;
		} else {
			self.rightOpen = -1;
		}
	};



	$scope.$on( 'MU_windowResized', function() {
		$scope.$apply();
	});

}]);