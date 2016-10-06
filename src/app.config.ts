/// <reference path="../typings/index.d.ts"/>
namespace app {
    'use strict';

    angular.module('app')
        .config($locationProvider => {
            $locationProvider.html5Mode(true);
        });
}
