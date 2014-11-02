var myApp = angular.module('myApp', ['MU']);
;angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/content/center.html',
    "<div hero-area></div><p class=widthDisplay></p><div ng-controller=\"GameGridController as GG\" class=gameGrid><div class=gameGrid__game ng-repeat=\"game in GG.games track by game.id\"><div class=gameGrid__game__inner ng-style=\"{ 'background-color': game.bg }\"></div></div><hr style=\"clear: both\"><span>Toggle open:</span><br><button ng-repeat=\"(title, menu) in MU.menus.menus track by title\" ng-click=\"MU.menus.toggleState( title )\">{{ title }}</button><hr><span>Toggle visiblity:</span><br><button ng-repeat=\"(title, menu) in MU.menus.menus track by title\" ng-click=\"MU.menus.toggleVisibility( title )\"><span ng-if=\"MU.menus.isVisible( title )\">Hide {{ title }}</span> <span ng-if=\"!MU.menus.isVisible( title )\">Show {{ title }}</span></button><hr><span>Prioritise:</span><br><button ng-repeat=\"(title, menu) in MU.menus.menus track by title\" ng-click=\"MU.menus.reorder( title )\">Lift {{ title }}</button><hr><span>Link:</span> <button ng-show=\"MU.menus.menus['left'] && MU.menus.menus['right']\" ng-click=\"MU.linkMenus( 'left right' )\">left and right</button> <button ng-show=\"MU.menus.menus['top'] && MU.menus.menus['bottom']\" ng-click=\"MU.linkMenus( 'top bottom' )\">top and bottom</button><br><span>Unlink:</span> <button ng-show=\"MU.menus.menus['left'] && MU.menus.menus['right']\" ng-click=\"MU.unlinkMenus( 'left right' )\">left and right</button> <button ng-show=\"MU.menus.menus['top'] && MU.menus.menus['bottom']\" ng-click=\"MU.unlinkMenus( 'top bottom' )\">top and bottom</button> <button ng-click=MU.menus.unlink()>all</button></div>"
  );


  $templateCache.put('templates/content/hero.html',
    ""
  );


  $templateCache.put('templates/directives/heroAreaDirective.html',
    "<div class=hero ng-style=hero.contentHeight()><h1 class=hero__title>{{ hero.title }}</h1></div>"
  );


  $templateCache.put('templates/menus/bottom.html',
    "- -- --- -- - Cookies - -- --- -- - <button class=MU__menu-bottom__switch ng-click=\"MU.menus.toggleVisibility( 'bottom' )\"></button>"
  );


  $templateCache.put('templates/menus/left.html',
    "<div ng-controller=\"MUMenuLeftController as ML\"><div class=\"MU__navIcons MU__navIcons-left\"><button class=MU__navIcons__item ng-click=\"ML.toggle( $index )\" ng-repeat=\"button in ML.items\" ng-class=\"{ 'MU__navIcons-left__item--active': ML.openItem === $index }\">{{ $index }}</button></div><div class=MU-you><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p></div></div>"
  );


  $templateCache.put('templates/menus/right.html',
    "<div ng-controller=\"MUMenuRightController as MR\"><div class=\"MU__navIcons MU__navIcons-right\"><button class=MU__navIcons__item ng-click=\"MR.toggle( $index )\" ng-repeat=\"button in MR.items\" ng-class=\"{ 'MU__navIcons-right__item--active': MR.openItem === $index }\">{{ $index }}</button></div><div class=MU-me><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p></div></div>"
  );


  $templateCache.put('templates/menus/top.html',
    "<nav class=MU__menu-top__nav>ONE - - TWO - - THREE - - FOUR</nav><div class=MU__menu-top__switch><button class=MU__menu-top__switch__right ng-click=\"MU.menus.toggleState( 'top' )\">Toggle Nav</button></div>"
  );

}]);

;myApp

.directive('gameGrid', function() {
	return {
		controller: 'GameGridController',
		controllerAs: 'gameGrid',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/heroAreaDirective.html'
	};
})

.controller('GameGridController', [ 'muMenus', '$scope', "$interval",
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
;myApp

.directive('heroArea', function() {
	return {
		controller: 'HeroController',
		controllerAs: 'hero',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/heroAreaDirective.html'
	};
})

.controller('HeroController', [ 'muContent',
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
;
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
		if ( args.menuID === 'left' ) {
			if ( args.newState === 'closed' ) {
				self.openItem = -1;
			} else if ( self.openItem === -1 ) {
				self.openItem = 0;
			}
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
		if ( args.menuID === 'right' ) {
			if ( args.newState === 'closed' ) {
				self.openItem = -1;
			} else if ( self.openItem === -1 ) {
				self.openItem = 0;
			}
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