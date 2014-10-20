myApp.controller('MUSystemController', [ 'muMenus', '$scope', "$interval",
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