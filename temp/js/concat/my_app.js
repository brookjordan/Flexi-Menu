var myApp = angular.module('myApp', ['MU']);;
angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/content/center.html',
    "<div hero-area></div>\n" +
    "\n" +
    "<p class=\"widthDisplay\"></p>\n" +
    "\n" +
    "<div game-grid></div>\n" +
    "\n" +
    "<div test-buttons></div>"
  );


  $templateCache.put('templates/directives/gameGridDirective.html',
    "<div class=\"gameGrid\">\n" +
    "\t<div class=\"gameGrid__game\" ng-repeat=\"game in gameGrid.games track by game.id\">\n" +
    "\t\t<div class=\"gameGrid__game__inner\" ng-style=\"{ 'background-color': game.bg }\"></div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/heroAreaDirective.html',
    "<div class=\"hero\" ng-style=\"hero.contentHeight()\">\n" +
    "\t<h1 class=\"hero__title\">{{ hero.title }}</h1>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/leftMenuDirective.html',
    "<div class=\"MU__menu-left MU__menu-left--{{ !MU_left.menus.isVisible( 'left' ) && 'hidden' || MU_left.menus.state( 'left' ) }}\" ng-style=\"MU_left.leftStyle()\">\n" +
    "\t<div class=\"MU__menu-left__inner\">\n" +
    "\t\t<div class=\"MU__navIcons MU__navIcons-left\">\n" +
    "\t\t\t<button class=\"MU__navIcons__item\" ng-click=\"MU_left.toggle( $index )\" ng-repeat=\"button in MU_left.items\" ng-class=\"{ 'MU__navIcons-left__item--active': MU_left.openItem === $index }\">\n" +
    "\t\t\t\t{{ $index }}\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<div class=\"MU-you\">\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/muSystemDirective.html',
    "<div class=\"MU {{ MU.content.contentClass }} {{ MU.getClassName() }}\" id=\"MU\" ng-style=\"MU.systemStyle()\">\n" +
    "\n" +
    "\t<div class=\"MU__menu-top MU__menu-top--{{ !MU.menus.isVisible( 'top' ) && 'hidden' || MU.menus.state( 'top' ) }}\" ng-style=\"MU.topStyle()\">\n" +
    "\t\t<div class=\"MU__menu-top__inner\" ng-include=\" 'templates/menus/top.html' \"></div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div left-menu></div>\n" +
    "\t<div right-menu></div>\n" +
    "\n" +
    "\t<div class=\"MU__menu-bottom MU__menu-bottom--{{ !MU.menus.isVisible( 'bottom' ) && 'hidden' || MU.menus.state( 'bottom' ) }}\" ng-style=\"MU.bottomStyle()\">\n" +
    "\t\t<div class=\"MU__menu-bottom__inner\" ng-include=\" 'templates/menus/bottom.html' \"></div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div class=\"MU__center\">\n" +
    "\t\t<div class=\"MU__center__scroll\">\n" +
    "\t\t\t<div class=\"MU__center__content\" ng-include=\" 'templates/content/center.html' \"></div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/rightMenuDirective.html',
    "<div class=\"MU__menu-right MU__menu-right--{{ !MU_right.menus.isVisible( 'right' ) && 'hidden' || MU_right.menus.state( 'right' ) }}\" ng-style=\"MU_right.rightStyle()\">\n" +
    "\t<div class=\"MU__menu-right__inner\">\n" +
    "\t\t<div class=\"MU__navIcons MU__navIcons-right\">\n" +
    "\t\t\t<button class=\"MU__navIcons__item\" ng-click=\"MU_right.toggle( $index )\" ng-repeat=\"button in MU_right.items\" ng-class=\"{ 'MU__navIcons-right__item--active': MU_right.openItem === $index }\">\n" +
    "\t\t\t\t{{ $index }}\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\n" +
    "\t\t<div class=\"MU-me\">\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/testButtonsDirective.html',
    "<div class=\"testButtons\">\n" +
    "\t<hr style=\"clear: both\">\n" +
    "\n" +
    "\t<span>Toggle open:</span>\n" +
    "\t<br>\n" +
    "\t<button ng-repeat=\"(title, menu) in testButtons.menus.menus track by title\" ng-click=\"testButtons.menus.toggleState( title )\">\n" +
    "\t\t{{ title }}\n" +
    "\t</button>\n" +
    "\n" +
    "\t<hr>\n" +
    "\n" +
    "\n" +
    "\t<span>Toggle visiblity:</span>\n" +
    "\t<br>\n" +
    "\t<button ng-repeat=\"(title, menu) in testButtons.menus.menus track by title\" ng-click=\"testButtons.menus.toggleVisibility( title )\">\n" +
    "\t\t<span ng-if=\"testButtons.menus.isVisible( title )\">Hide {{ title }}</span>\n" +
    "\t\t<span ng-if=\"!testButtons.menus.isVisible( title )\">Show {{ title }}</span>\n" +
    "\t</button>\n" +
    "\n" +
    "\t<hr>\n" +
    "\n" +
    "\n" +
    "\t<span>Prioritise:</span>\n" +
    "\t<br>\n" +
    "\t<button ng-repeat=\"(title, menu) in testButtons.menus.menus track by title\" ng-click=\"testButtons.menus.reorder( title )\">\n" +
    "\t\tLift {{ title }}\n" +
    "\t</button>\n" +
    "\n" +
    "\t<hr>\n" +
    "\n" +
    "\n" +
    "\t<span>Link:</span>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['left'] && testButtons.menus.menus['right']\" ng-click=\"testButtons.linkMenus( 'left right' )\">\n" +
    "\t\tleft and right\n" +
    "\t</button>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['top'] && testButtons.menus.menus['bottom']\" ng-click=\"testButtons.linkMenus( 'top bottom' )\">\n" +
    "\t\ttop and bottom\n" +
    "\t</button>\n" +
    "\n" +
    "\t<br>\n" +
    "\n" +
    "\n" +
    "\t<span>Unlink:</span>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['left'] && testButtons.menus.menus['right']\" ng-click=\"testButtons.unlinkMenus( 'left right' )\">\n" +
    "\t\tleft and right\n" +
    "\t</button>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['top'] && testButtons.menus.menus['bottom']\" ng-click=\"testButtons.unlinkMenus( 'top bottom' )\">\n" +
    "\t\ttop and bottom\n" +
    "\t</button>\n" +
    "\t<button ng-click=\"testButtons.menus.unlink()\">\n" +
    "\t\tall\n" +
    "\t</button>\n" +
    "</div>"
  );


  $templateCache.put('templates/menus/bottom.html',
    "- -- --- -- - Cookies - -- --- -- -\n" +
    "<button class=\"MU__menu-bottom__switch\" ng-click=\"MU.menus.toggleVisibility( 'bottom' )\">\n" +
    "</button>"
  );


  $templateCache.put('templates/menus/top.html',
    "<nav class=\"MU__menu-top__nav\">\n" +
    "\tONE - - TWO - - THREE - - FOUR\n" +
    "</nav>\n" +
    "<div class=\"MU__menu-top__switch\">\n" +
    "\n" +
    "\t<button class=\"MU__menu-top__switch__right\" ng-click=\"MU.menus.toggleState( 'top' )\">\n" +
    "\t\tToggle Nav\n" +
    "\t</button>\n" +
    "</div>"
  );

}]);
;
myApp

.directive('gameGrid', function() {
	return {
		controller: 'GameGridController',
		controllerAs: 'gameGrid',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/gameGridDirective.html'
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


}]);;
myApp

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


}]);;
myApp

.directive('leftMenu', function() {
	return {
		controller: 'MUMenuLeftController',
		controllerAs: 'MU_left',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/leftMenuDirective.html'
	};
})

.controller('MUMenuLeftController', [ 'muMenus', '$scope',
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



}]);;
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

}]);;
myApp

.directive('rightMenu', function() {
	return {
		controller: 'MUMenuRightController',
		controllerAs: 'MU_right',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/rightMenuDirective.html'
	};
})

.controller('MUMenuRightController', [ 'muMenus', '$scope',
function( muMenus, $scope ){

	var self = this;

	this.items = [0,1,2,3,4];
	this.openItem = -1;
	this.menus = muMenus;

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
}]);;
myApp

.directive('testButtons', function() {
	return {
		controller: 'TestButtonsController',
		controllerAs: 'testButtons',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/testButtonsDirective.html'
	};
})

.controller('TestButtonsController', [ 'muMenus',
function( muMenus ){

	var self = this,
		i = 0;

	this.menus = muMenus;

}]);
//# sourceMappingURL=my_app.js.map