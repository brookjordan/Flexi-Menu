myApp.controller('HeroController', [ 'muMenus',
function( muMenus ){

	var self = this;

	function getHeroHeight () {
		var height = (
				muMenus.containerHeight -
				muMenus.sizeOf('top') -
				muMenus.sizeOf('bottom')
			) * 0.5;

		return {
			height: height + 'px'
		};
	}

	this.contentHeight = getHeroHeight;

	this.title = 'Hero Title';


}]);