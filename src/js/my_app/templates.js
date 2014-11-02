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
    "<div class=\"MU__menu-left MU__menu-left--{{ !MU_left.menus.isVisible( 'left' ) && 'hidden' || MU_left.menus.state( 'left' ) }}\" ng-style=MU_left.leftStyle()><div class=MU__menu-left__inner><div class=\"MU__navIcons MU__navIcons-left\"><button class=MU__navIcons__item ng-click=\"MU_left.toggle( $index )\" ng-repeat=\"button in MU_left.items\" ng-class=\"{ 'MU__navIcons-left__item--active': MU_left.openItem === $index }\">{{ $index }}</button></div><div class=MU-you><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p></div></div></div>"
  );


  $templateCache.put('templates/directives/muSystemDirective.html',
    "<div class=\"MU {{ MU.content.mediaClass }} {{ MU.getClassName() }}\" id=MU ng-style=MU.systemStyle()><div class=\"MU__menu-top MU__menu-top--{{ !MU.menus.isVisible( 'top' ) && 'hidden' || MU.menus.state( 'top' ) }}\" ng-style=MU.topStyle()><div class=MU__menu-top__inner ng-include=\" 'templates/menus/top.html' \"></div></div><div left-menu></div><div right-menu></div><div class=\"MU__menu-bottom MU__menu-bottom--{{ !MU.menus.isVisible( 'bottom' ) && 'hidden' || MU.menus.state( 'bottom' ) }}\" ng-style=MU.bottomStyle()><div class=MU__menu-bottom__inner ng-include=\" 'templates/menus/bottom.html' \"></div></div><div class=MU__center><div class=MU__center__scroll><div class=MU__center__content ng-include=\" 'templates/content/center.html' \"></div></div></div></div>"
  );


  $templateCache.put('templates/directives/rightMenuDirective.html',
    "<div class=\"MU__menu-right MU__menu-right--{{ !MU_right.menus.isVisible( 'right' ) && 'hidden' || MU_right.menus.state( 'right' ) }}\" ng-style=MU_right.rightStyle()><div class=MU__menu-right__inner><div class=\"MU__navIcons MU__navIcons-right\"><button class=MU__navIcons__item ng-click=\"MU_right.toggle( $index )\" ng-repeat=\"button in MU_right.items\" ng-class=\"{ 'MU__navIcons-right__item--active': MU_right.openItem === $index }\">{{ $index }}</button></div><div class=MU-me><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p></div></div></div>"
  );


  $templateCache.put('templates/menus/bottom.html',
    "- -- --- -- - Cookies - -- --- -- - <button class=MU__menu-bottom__switch ng-click=\"MU.menus.toggleVisibility( 'bottom' )\"></button>"
  );


  $templateCache.put('templates/menus/right.html',
    "<div ng-controller=\"MUMenuRightController as MR\"><div class=\"MU__navIcons MU__navIcons-right\"><button class=MU__navIcons__item ng-click=\"MR.toggle( $index )\" ng-repeat=\"button in MR.items\" ng-class=\"{ 'MU__navIcons-right__item--active': MR.openItem === $index }\">{{ $index }}</button></div><div class=MU-me><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p><p class=MU__mainNavItem>ONE</p></div></div>"
  );


  $templateCache.put('templates/menus/top.html',
    "<nav class=MU__menu-top__nav>ONE - - TWO - - THREE - - FOUR</nav><div class=MU__menu-top__switch><button class=MU__menu-top__switch__right ng-click=\"MU.menus.toggleState( 'top' )\">Toggle Nav</button></div>"
  );

}]);
