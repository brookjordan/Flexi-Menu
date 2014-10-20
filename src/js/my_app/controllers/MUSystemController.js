myApp.controller('MUSystemController', [ 'muMenus', '$scope',
function( muMenus, $scope ){

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
		.add('bottom', {
			visible: false,
			state: 'open',

			sizeOpen: 100,
			sizeClosed: 10
		})
		.add('right', {
			state: 'closed',

			sizeOpen: 320,
			sizeClosed: 50
		})
		.add('top', {
			sizeOpen: 150,
			sizeClosed: 50
		})
		.add('left', {
			state: 'closed',

			sizeOpen: 320,
			sizeClosed: 50
		});



	//	Setting menus to be in HTML
	this.menus = muMenus;



	$scope.$on( 'MU_windowResized', function() {
		$scope.$apply();
	});

}]);