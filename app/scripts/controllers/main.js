'use strict';

/**
 * @ngdoc function
 * @name loveDotsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loveDotsApp
 */
angular.module('loveDotsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
