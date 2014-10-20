myApp.controller('MUMenuRightController', [ 'muMenus', '$scope',
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