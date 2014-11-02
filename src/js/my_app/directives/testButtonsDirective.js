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