/// <reference path="../typings/index.d.ts"/>
var app;
(function (app) {
    'use strict';
    angular.module('app')
        .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });
})(app || (app = {}));
