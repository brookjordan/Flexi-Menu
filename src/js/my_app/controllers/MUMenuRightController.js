myApp.controller('MUMenuRightController', [ 'muMenus', '$scope',
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