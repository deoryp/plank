angular.module("plankApp").run(["$templateCache", function($templateCache) {$templateCache.put("components/footer/footer.html","<div class=\"container\" ng-controller=\"FooterCtrl\"><p><a href=\"https://github.com/deoryp/plank\">Plank v{{version}}</a> | <a href=\"https://twitter.com/n3wscott\">@n3wscott</a> | <a href=\"https://github.com/deoryp/plank/issues?state=open\">Issues</a></p></div>");
$templateCache.put("components/modal/modal.html","<div class=\"modal-header\"><button ng-if=\"modal.dismissable\" type=\"button\" ng-click=\"$dismiss()\" class=\"close\">&times;</button><h4 ng-if=\"modal.title\" ng-bind=\"modal.title\" class=\"modal-title\"></h4></div><div class=\"modal-body\"><p ng-if=\"modal.text\" ng-bind=\"modal.text\"></p><div ng-if=\"modal.html\" ng-bind-html=\"modal.html\"></div></div><div class=\"modal-footer\"><button ng-repeat=\"button in modal.buttons\" ng-class=\"button.classes\" ng-click=\"button.click($event)\" ng-bind=\"button.text\" class=\"btn\"></button></div>");
$templateCache.put("components/navbar/navbar.html","<nav class=\"navbar navbar-inverse navbar-fixed-top theforumheader\" ng-controller=\"NavbarCtrl\"><div class=\"container\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" ng-click=\"isCollapsed = !isCollapsed\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a href=\"/\" class=\"navbar-brand theforumheader\"><div class=\"slab\" id=\"theforumheader\"><span class=\"slabtext\">THE</span> <span class=\"slabtext\">FORUM</span></div></a></div><div collapse=\"isCollapsed\" class=\"navbar-collapse collapse\" id=\"navbar-main\"><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(\'/login\')}\"><a href=\"/login\"><span class=\"glyphicon glyphicon-log-in\"></span></a></li><li ng-show=\"isLoggedIn()\"><p class=\"navbar-text\"><img ng-src=\"{{getCurrentUser().google.image.url}}&sz=16\" class=\"img-circle\" style=\"width: 16px; height: 16px;\"></p></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(\'/settings\')}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=\"isAdmin()\" ng-class=\"{active: isActive(\'/admin\')}\"><a href=\"/admin\"><span class=\"glyphicon glyphicon-sunglasses\"></span></a></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(\'/logout\')}\"><a ng-click=\"logout()\"><span class=\"glyphicon glyphicon-log-out\"></span></a></li></ul></div></div></nav>");
$templateCache.put("components/thread/thread-preview-small.html","<div class=\"well bs-callout thread-preview\" ng-class=\"{\'bs-callout-new\': thread.me.updates}\" ng-click=\"view()\"><div class=\"media\"><div class=\"media-left\"><a href=\"#\"><img class=\"media-object img-circle\" ng-src=\"{{thread.author.photo}}&sz=64\" alt=\"{{thread.author.handle}}\" style=\"width: 64px; height: 64px;\" title=\"{{thread.author.handle}}\"></a></div><div class=\"media-body\"><h2 class=\"media-heading\">{{thread.title}} <span ng-if=\"thread.reply.length > 0\" class=\"badge\">{{thread.reply.length}}</span> <small class=\"pull-right\">{{thread.created | date:\'medium\'}}</small></h2><p><img class=\"img-circle\" ng-src=\"{{reply.author.photo}}&sz=32\" alt=\"{{reply.author.handle}}\" title=\"{{reply.author.handle}}\" style=\"width: 32px; height: 32px;\" ng-repeat=\"reply in thread.reply\"></p></div></div></div>");
$templateCache.put("components/thread/thread-preview.html","<div class=\"well bs-callout thread-preview\" ng-class=\"{\'bs-callout-new\': thread.me.updates}\" ng-click=\"view()\"><div class=\"media\"><div class=\"media-left\"><a href=\"#\"><img class=\"media-object img-circle\" ng-src=\"{{thread.author.photo}}\" alt=\"{{thread.author.handle}}\" title=\"{{thread.author.handle}}\" style=\"width: 64px; height: 64px;\"></a></div><div class=\"media-body\"><h2 class=\"media-heading\">{{thread.title}} <span ng-if=\"thread.reply.length > 0\" class=\"badge\">{{thread.reply.length}}</span> <small class=\"pull-right\">{{thread.created | date:\'medium\'}}</small></h2><p ng-bind-html=\"markdownHtml\"></p></div></div></div>");
$templateCache.put("components/thread/thread-reply.html","<div class=\"media\"><div class=\"media-left\"><a href=\"#\"><img class=\"media-object img-circle\" ng-src=\"{{reply.author.photo}}&sz=64\" alt=\"{{reply.author.handle}}\" title=\"{{reply.author.handle}}\" style=\"width: 64px; height: 64px;\"></a></div><div class=\"media-body\"><h2 class=\"media-heading\"><small>{{reply.created | date:\'medium\'}}</small></h2><p ng-bind-html=\"markdownHtml\"></p></div></div>");
$templateCache.put("components/thread/thread.html","<div class=\"media\"><div class=\"media-left\"><a href=\"#\"><img class=\"media-object img-circle\" ng-src=\"{{thread.author.photo}}\" alt=\"{{thread.author.handle}}\" title=\"{{thread.author.handle}}\" style=\"width: 64px; height: 64px;\"></a></div><div class=\"media-body\"><h2 class=\"media-heading\">{{thread.title}} <small class=\"pull-right\">{{thread.created | date:\'medium\'}}</small></h2><p ng-bind-html=\"markdownHtml\"></p><div ng-repeat=\"reply in thread.reply\"><forum-thread-reply reply=\"reply\"></forum-thread-reply></div></div></div><p class=\"pull-right\"><a class=\"btn btn-create\" ng-click=\"reply(thread)\" role=\"button\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a></p>");}]);