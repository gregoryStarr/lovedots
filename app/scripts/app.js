'use strict';

/**
 * @ngdoc overview
 * @name loveDotsApp
 * @description
 * # loveDotsApp
 *
 * Main module of the application.
 */
var LoveDotsApp = angular
  .module('loveDotsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngTouch'
  ])
    /*
     *   Use UI-router and stateProvider to handle routing and nested states
     *   Service view/state has nested states
     * */
    .config(
    [          '$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

            /////////////////////////////
            // Redirects and Otherwise //
            /////////////////////////////

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider

                // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                // Here we are just setting up some convenience urls.
                .when('/c?id', '/contacts/:id')
                .when('/user/:id', '/contacts/:id')

                // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                .otherwise('/');


            //////////////////////////
            // State Configurations //
            //////////////////////////

            // Use $stateProvider to configure your states.
            $stateProvider

                //////////
                // Home //
                //////////

                .state("home", {

                    // Use a url of "/" to set a states as the "index".
                    url: "/",

                    // Example of an inline template string. By default, templates
                    // will populate the ui-view within the parent state's template.
                    // For top level states, like this one, the parent template is
                    // the index.html file. So this template will be inserted into the
                    // ui-view within index.html.
                    templateUrl: 'views/main.html'

                })

                //////////
                // quoteType //
                //////////

                .state("main.photoBooth", {

                    // Use a url of "/" to set a states as the "index".
                    url: "/photoBooth",

                    // Example of an inline template string. By default, templates
                    // will populate the ui-view within the parent state's template.
                    // For top level states, like this one, the parent template is
                    // the index.html file. So this template will be inserted into the
                    // ui-view within index.html.
                    templateUrl: 'views/partials/photoBooth.html'

                })


                ///////////
                // Service Selection //
                ///////////

               /* .state('services', {
                    url: '/services',
                    // Showing off how you could return a promise from templateProvider
                    templateUrl: 'views/services.html'
                })

                ///////////
                // Service.userInfo Form //
                ///////////

                .state('services.userInfo', {
                    url: '/services/userInfo',
                    // Showing off how you could return a promise from templateProvider
                    templateUrl: 'views/user.html'
                })*/


        }
    ]
)