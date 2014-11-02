myApp

.directive('gameGrid', function() {
	return {
		controller: 'GameGridController',
		controllerAs: 'gameGrid',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/heroAreaDirective.html'
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


}]);