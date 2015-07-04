/**
 * @ngdoc directive
 * @name Pixi.directive:pixi
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */


LoveDotsApp.directive('imagecapture', function () {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: './views/partials/photoBooth.html',
        link: function(scope, elem, attrs) {

            elem.bind('click', function() {
                /*elem.css('background-color', 'white');
                scope.$apply(function() {
                    scope.color = "white";
                });*/
            });
            elem.bind('mouseover', function() {
                /*elem.css('cursor', 'pointer');*/
            });
        }
    };
});
