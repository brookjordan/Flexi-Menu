myApp.controller('MUMenuLeftController', [ 'muMenus', '$scope',
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