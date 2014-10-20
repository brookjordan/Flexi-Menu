myApp.controller('HeroController', [ 'muContent',
function( muContent ){

	var self = this;

	function getHeroHeight () {
		var height = muContent.contentHeight * 0.5;

		return {
			height: muContent.metrics + 'px'
		};
	}

	this.contentHeight = getHeroHeight;

	this.title = 'Hero Title';


}]);