var myApp = angular.module('myApp', ['MU']);
;myApp.controller('GameGridController', [ 'muMenus', '$scope', "$interval",
function( muMenus, $scope, $interval ){

	var self = this,
		i = 0;

	this.games = [];

	for (; i<20; i+=1) {
		this.games.push({
			id: i,
			bg: 'rgb(' +
				(110 + Math.floor(Math.random()*30)) + ',' +
				(110 + Math.floor(Math.random()*30)) + ',' +
				(110 + Math.floor(Math.random()*30)) +
			')'
		});
	}


}]);
;myApp.controller('HeroController', [ 'muContent',
function( muContent ){

	var self = this;

	function getHeroHeight () {
		var height = Math.max(
				200,
				Math.min( muContent.contentHeight * 0.6, muContent.contentWidth )
			);

		return {
			height: height + 'px'
		};
	}

	this.contentHeight = getHeroHeight;

	this.title = 'Hero Title';


}]);
;myApp.controller('MUMenuLeftController', [ 'muMenus', '$scope',
function( muMenus, $scope ){

	var self = this;

	this.items = [0,1];
	this.openItem = -1;

	this.toggle = function ( $index ) {
		if ( self.openItem === $index ) {
			self.openItem = -1;
			muMenus.toggleState( 'left', 'closed' );
		} else {
			self.openItem = $index;
			muMenus.toggleState( 'left', 'open' );
		}
	};

	$scope.$on('MU_stateToggled', function( event, args ){
		if ( args.menuID === 'left' && args.newState === 'closed' ) {
			self.openItem = -1;
		}
	});



}]);
;myApp.controller('MUMenuRightController', [ 'muMenus', '$scope',
function( muMenus, $scope ){

	var self = this;

	this.items = [0,1,2,3,4];
	this.openItem = -1;

	this.toggle = function ( $index ) {
		if ( self.openItem === $index ) {
			self.openItem = -1;
			muMenus.toggleState( 'right', 'closed' );
		} else {
			self.openItem = $index;
			muMenus.toggleState( 'right', 'open' );
		}
	};

	$scope.$on('MU_stateToggled', function( event, args ){
		if ( args.menuID === 'right' && args.newState === 'closed' ) {
			self.openItem = -1;
		}
	});



}]);
;myApp.controller('MUSystemController', [ 'muMenus', 'muContent', '$scope', "$interval",
function( muMenus, muContent, $scope, $interval ){

	var self = this;

	function capitalise ( string ) {
		return string.substr(0,1).toUpperCase() + string.substr(1);
	}

	this.getClassName = function () {
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
	this.linkMenus = function (which) {
		muMenus.link( which, prompt() );
	};

	this.unlinkMenus = function (which) {
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

	muContent.addQuery( 'w', '100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700' );



	//	Setting menus to be in HTML
	this.menus = muMenus;
	this.content = muContent;

	this.leftIcons = '0 1 2 3 4'.split(' ');
	this.rightIcons = '0 1 2 3'.split(' ');

	this.leftOpen = -1;
	this.rightOpen = -1;

	this.selectLeft = function ( $index ) {
		if (self.leftOpen !== $index) {
			self.leftOpen = $index;
		} else {
			self.leftOpen = -1;
		}
	};
	this.selectRight = function ( $index ) {
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