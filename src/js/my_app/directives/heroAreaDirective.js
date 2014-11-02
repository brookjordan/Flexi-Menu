myApp

.directive('heroArea', function() {
	return {
		controller: 'HeroController',
		controllerAs: 'hero',
		bindToController: true,

		replace: true,
		templateUrl: 'templates/directives/heroAreaDirective.html'
	};
})

.controller('HeroController', [ 'muContent',
function( muContent ){

	var self = this;

	function getHeroHeight () {
		var height = Math.max(
				200,
				Math.min( muContent.contentHeight * 0.6, muContent.contentWidth )
			);

		return {
			height: height + 'px'
		};
	}

	this.contentHeight = getHeroHeight;

	this.title = 'Hero Title';


}]);