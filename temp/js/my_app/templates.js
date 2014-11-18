angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/content/center.html',
    "<div hero-area></div>\n" +
    "\n" +
    "<p class=\"widthDisplay\"></p>\n" +
    "\n" +
    "<div game-grid></div>\n" +
    "\n" +
    "<div test-buttons></div>"
  );


  $templateCache.put('templates/directives/gameGridDirective.html',
    "<div class=\"gameGrid\">\n" +
    "\t<div class=\"gameGrid__game\" ng-repeat=\"game in gameGrid.games track by game.id\">\n" +
    "\t\t<div class=\"gameGrid__game__inner\" ng-style=\"{ 'background-color': game.bg }\"></div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/heroAreaDirective.html',
    "<div class=\"hero\" ng-style=\"hero.contentHeight()\">\n" +
    "\t<h1 class=\"hero__title\">{{ hero.title }}</h1>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/leftMenuDirective.html',
    "<div class=\"MU__menu-left MU__menu-left--{{ !MU_left.menus.isVisible( 'left' ) && 'hidden' || MU_left.menus.state( 'left' ) }}\" ng-style=\"MU_left.leftStyle()\">\n" +
    "\t<div class=\"MU__menu-left__inner\">\n" +
    "\t\t<div class=\"MU__navIcons MU__navIcons-left\">\n" +
    "\t\t\t<button class=\"MU__navIcons__item\" ng-click=\"MU_left.toggle( $index )\" ng-repeat=\"button in MU_left.items\" ng-class=\"{ 'MU__navIcons-left__item--active': MU_left.openItem === $index }\">\n" +
    "\t\t\t\t{{ $index }}\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<div class=\"MU-you\">\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/muSystemDirective.html',
    "<div class=\"MU {{ MU.content.contentClass }} {{ MU.content.containerClass }} {{ MU.getClassName() }}\" id=\"MU\" ng-style=\"MU.systemStyle()\">\n" +
    "\n" +
    "\t<div class=\"MU__menu-top MU__menu-top--{{ !MU.menus.isVisible( 'top' ) && 'hidden' || MU.menus.state( 'top' ) }}\" ng-style=\"MU.topStyle()\">\n" +
    "\t\t<div class=\"MU__menu-top__inner\" ng-include=\" 'templates/menus/top.html' \"></div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div left-menu></div>\n" +
    "\t<div right-menu></div>\n" +
    "\n" +
    "\t<div class=\"MU__menu-bottom MU__menu-bottom--{{ !MU.menus.isVisible( 'bottom' ) && 'hidden' || MU.menus.state( 'bottom' ) }}\" ng-style=\"MU.bottomStyle()\">\n" +
    "\t\t<div class=\"MU__menu-bottom__inner\" ng-include=\" 'templates/menus/bottom.html' \"></div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div class=\"MU__center\">\n" +
    "\t\t<div class=\"MU__center__scroll\">\n" +
    "\t\t\t<div class=\"MU__center__content\" ng-include=\" 'templates/content/center.html' \"></div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/rightMenuDirective.html',
    "<div class=\"MU__menu-right MU__menu-right--{{ !MU_right.menus.isVisible( 'right' ) && 'hidden' || MU_right.menus.state( 'right' ) }}\" ng-style=\"MU_right.rightStyle()\">\n" +
    "\t<div class=\"MU__menu-right__inner\">\n" +
    "\t\t<div class=\"MU__navIcons MU__navIcons-right\">\n" +
    "\t\t\t<button class=\"MU__navIcons__item\" ng-click=\"MU_right.toggle( $index )\" ng-repeat=\"button in MU_right.items\" ng-class=\"{ 'MU__navIcons-right__item--active': MU_right.openItem === $index }\">\n" +
    "\t\t\t\t{{ $index }}\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\n" +
    "\t\t<div class=\"MU-me\">\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t\t<p class=\"MU__mainNavItem\">ONE</p>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/directives/testButtonsDirective.html',
    "<div class=\"testButtons\">\n" +
    "\t<hr style=\"clear: both\">\n" +
    "\n" +
    "\t<span>Toggle open:</span>\n" +
    "\t<br>\n" +
    "\t<button ng-repeat=\"(title, menu) in testButtons.menus.menus track by title\" ng-click=\"testButtons.menus.toggleState( title )\">\n" +
    "\t\t{{ title }}\n" +
    "\t</button>\n" +
    "\n" +
    "\t<hr>\n" +
    "\n" +
    "\n" +
    "\t<span>Toggle visiblity:</span>\n" +
    "\t<br>\n" +
    "\t<button ng-repeat=\"(title, menu) in testButtons.menus.menus track by title\" ng-click=\"testButtons.menus.toggleVisibility( title )\">\n" +
    "\t\t<span ng-if=\"testButtons.menus.isVisible( title )\">Hide {{ title }}</span>\n" +
    "\t\t<span ng-if=\"!testButtons.menus.isVisible( title )\">Show {{ title }}</span>\n" +
    "\t</button>\n" +
    "\n" +
    "\t<hr>\n" +
    "\n" +
    "\n" +
    "\t<span>Prioritise:</span>\n" +
    "\t<br>\n" +
    "\t<button ng-repeat=\"(title, menu) in testButtons.menus.menus track by title\" ng-click=\"testButtons.menus.reorder( title )\">\n" +
    "\t\tLift {{ title }}\n" +
    "\t</button>\n" +
    "\n" +
    "\t<hr>\n" +
    "\n" +
    "\n" +
    "\t<span>Link:</span>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['left'] && testButtons.menus.menus['right']\" ng-click=\"testButtons.linkMenus( 'left right' )\">\n" +
    "\t\tleft and right\n" +
    "\t</button>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['top'] && testButtons.menus.menus['bottom']\" ng-click=\"testButtons.linkMenus( 'top bottom' )\">\n" +
    "\t\ttop and bottom\n" +
    "\t</button>\n" +
    "\n" +
    "\t<br>\n" +
    "\n" +
    "\n" +
    "\t<span>Unlink:</span>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['left'] && testButtons.menus.menus['right']\" ng-click=\"testButtons.unlinkMenus( 'left right' )\">\n" +
    "\t\tleft and right\n" +
    "\t</button>\n" +
    "\t<button ng-show=\"testButtons.menus.menus['top'] && testButtons.menus.menus['bottom']\" ng-click=\"testButtons.unlinkMenus( 'top bottom' )\">\n" +
    "\t\ttop and bottom\n" +
    "\t</button>\n" +
    "\t<button ng-click=\"testButtons.menus.unlink()\">\n" +
    "\t\tall\n" +
    "\t</button>\n" +
    "</div>"
  );


  $templateCache.put('templates/menus/bottom.html',
    "- -- --- -- - Cookies - -- --- -- -\n" +
    "<button class=\"MU__menu-bottom__switch\" ng-click=\"MU.menus.toggleVisibility( 'bottom' )\">\n" +
    "</button>"
  );


  $templateCache.put('templates/menus/top.html',
    "<nav class=\"MU__menu-top__nav\">\n" +
    "\tONE - - TWO - - THREE - - FOUR\n" +
    "</nav>\n" +
    "<div class=\"MU__menu-top__switch\">\n" +
    "\n" +
    "\t<button class=\"MU__menu-top__switch__right\" ng-click=\"MU.menus.toggleState( 'top' )\">\n" +
    "\t\tToggle Nav\n" +
    "\t</button>\n" +
    "</div>"
  );

}]);
