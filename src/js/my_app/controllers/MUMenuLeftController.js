myApp.controller('MUMenuLeftController', [ 'muMenus', '$scope',
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