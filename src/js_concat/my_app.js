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
;myApp.controller('HeroController', [ 'muMenus',
function( muMenus ){

	var self = this;

	function getHeroHeight () {
		var height = (
				muMenus.containerHeight -
				muMenus.sizeOf('top') -
				muMenus.sizeOf('bottom')
			) * 0.5;

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
		if ( this.openItem === $index ) {
			this.openItem = -1;
			muMenus.toggleState( 'left', 'closed' )
		} else {
			this.openItem = $index;
			muMenus.toggleState( 'left', 'open' )
		}
	};

	$scope.$on('MU_stateToggled_left', function( event, newState ){
		if ( newState === 'closed' ) {
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
		if ( this.openItem === $index ) {
			this.openItem = -1;
			muMenus.toggleState( 'right', 'closed' )
		} else {
			this.openItem = $index;
			muMenus.toggleState( 'right', 'open' )
		}
	};

	$scope.$on('MU_stateToggled_right', function( event, newState ){
		if ( newState === 'closed' ) {
			self.openItem = -1;
		}
	});



}]);
;myApp.controller('MUSystemController', [ 'muMenus', '$scope', "$interval",
function( muMenus, $scope, $interval ){

	var self = this;

	//	Creating styles
	this.leftStyle = function () {
		var metrics = muMenus.menus.left.metrics;

		return {
			'width':          metrics.size + 'px',
			'left':           metrics.left + 'px',
			'padding-top':    metrics.top + 'px',
			'padding-bottom': metrics.bottom + 'px',
			'z-index':        metrics.order
		};
	};
	this.rightStyle = function () {
		var metrics = muMenus.menus.right.metrics;

		return {
			'width':          metrics.size + 'px',
			'right':          metrics.right + 'px',
			'padding-top':    metrics.top + 'px',
			'padding-bottom': metrics.bottom + 'px',
			'z-index':        metrics.order
		};
	};
	this.topStyle = function () {
		var metrics = muMenus.menus.top.metrics;

		return {
			'height':        metrics.size + 'px',
			'top':           metrics.top + 'px',
			'padding-left':  metrics.left + 'px',
			'padding-right': metrics.right + 'px',
			'z-index':       metrics.order
		};
	};
	this.bottomStyle = function () {
		var metrics = muMenus.menus.bottom.metrics;

		return {
			'height':        metrics.size + 'px',
			'bottom':        metrics.bottom + 'px',
			'padding-left':  metrics.left + 'px',
			'padding-right': metrics.right + 'px',
			'z-index':       metrics.order
		};
	};
	this.systemStyle = function () {
		var metrics = muMenus.metrics();

		return {
			'padding-top':    metrics.top + 'px',
			'padding-right':  metrics.right + 'px',
			'padding-left':   metrics.left + 'px',
			'padding-bottom': metrics.bottom + 'px',
			'z-index':        metrics.order
		};
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

			sizeOpen: 40,
			sizeClosed: 40
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



	//	Setting menus to be in HTML
	this.menus = muMenus;

	this.leftIcons = '0 1 2 3 4'.split(' ');
	this.rightIcons = '0 1 2 3'.split(' ');

	this.leftOpen = -1;
	this.rightOpen = -1;

	this.selectLeft = function ( $index ) {
		if (self.leftOpen !== $index) {
			self.leftOpen = $index
		} else {
			self.leftOpen = -1
		}
	}
	this.selectRight = function ( $index ) {
		if (self.rightOpen !== $index) {
			self.rightOpen = $index
		} else {
			self.rightOpen = -1
		}
	}



	$scope.$on( 'MU_windowResized', function() {
		$scope.$apply();
	});

}]);