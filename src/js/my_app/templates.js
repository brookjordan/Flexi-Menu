angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/content/center.html',
    "<div hero-area></div><p class=widthDisplay></p><div game-grid></div><div><hr style=\"clear: both\"><span>Toggle open:</span><br><button ng-repeat=\"(title, menu) in MU.menus.menus track by title\" ng-click=\"MU.menus.toggleState( title )\">{{ title }}</button><hr><span>Toggle visiblity:</span><br><button ng-repeat=\"(title, menu) in MU.menus.menus track by title\" ng-click=\"MU.menus.toggleVisibility( title )\"><span ng-if=\"MU.menus.isVisible( title )\">Hide {{ title }}</span> <span ng-if=\"!MU.menus.isVisible( title )\">Show {{ title }}</span></button><hr><span>Prioritise:</span><br><button ng-repeat=\"(title, menu) in MU.menus.menus track by title\" ng-click=\"MU.menus.reorder( title )\">Lift {{ title }}</button><hr><span>Link:</span> <button ng-show=\"MU.menus.menus['left'] && MU.menus.menus['right']\" ng-click=\"MU.linkMenus( 'left right' )\">left and right</button> <button ng-show=\"MU.menus.menus['top'] && MU.menus.menus['bottom']\" ng-click=\"MU.linkMenus( 'top bottom' )\">top and bottom</button><br><span>Unlink:</span> <button ng-show=\"MU.menus.menus['left'] && MU.menus.menus['right']\" ng-click=\"MU.unlinkMenus( 'left right' )\">left and right</button> <button ng-show=\"MU.menus.menus['top'] && MU.menus.menus['bottom']\" ng-click=\"MU.unlinkMenus( 'top bottom' )\">top and bottom</button> <button ng-click=MU.menus.unlink()>all</button></div>"
  );


  $templateCache.put('templates/content/hero.html',
    ""
  );


  $templateCache.put('templates/directives/gameGridDirective.html',
    "<div class=gameGrid><div class=gameGrid__game ng-repeat=\"game in gameGrid.games track by game.id\"><div class=gameGrid__game__inner ng-style=\"{ 'background-color': game.bg }\"></div></div></div>"
  );


  $templateCache.put('templates/directives/heroAreaDirective.html',
    "<div class=hero ng-style=hero.contentHeight()><h1 class=hero__title>{{ hero.title }}</h1></div>"
  );


  $templateCache.put('templates/directives/leftMenuDirective.html',
    ""
  );


  $templateCache.put('templates/menus/bottom.html',
    "- -- --- -- - Cookies - -- --- -- - <button class=MU__menu-bottom__switch ng-click=\"MU.menus.toggleVisibility( 'bottom' )\"></button>"
  );


  $templateCache.put('templates/menus/left.html',
    "<div ng-controller=\"MUMenuLeftController as ML\"><div class=\"MU__navIcons MU__navIcons-left\"><button class=MU__navIcons__item ng-click=\"ML.toggle( $index )\" ng-repeat=\"button in ML.items\" ng-class=\"{ 'MU__navIcons-left__item--active': ML.openItem === $index }\">{{ $index }}</button></div><div class=MU-you><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p></div></div>"
  );


  $templateCache.put('templates/menus/right.html',
    "<div ng-controller=\"MUMenuRightController as MR\"><div class=\"MU__navIcons MU__navIcons-right\"><button class=MU__navIcons__item ng-click=\"MR.toggle( $index )\" ng-repeat=\"button in MR.items\" ng-class=\"{ 'MU__navIcons-right__item--active': MR.openItem === $index }\">{{ $index }}</button></div><div class=MU-me><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p></div></div>"
  );


  $templateCache.put('templates/menus/top.html',
    "<nav class=MU__menu-top__nav>ONE - - TWO - - THREE - - FOUR</nav><div class=MU__menu-top__switch><button class=MU__menu-top__switch__right ng-click=\"MU.menus.toggleState( 'top' )\">Toggle Nav</button></div>"
  );

}]);
