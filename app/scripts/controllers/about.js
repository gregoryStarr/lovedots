'use strict';

/**
 * @ngdoc function
 * @name loveDotsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the loveDotsApp
 */
angular.module('loveDotsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
