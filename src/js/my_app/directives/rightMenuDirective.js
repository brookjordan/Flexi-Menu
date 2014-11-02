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
}]);