"use strict";
var _ = require('lodash');
var DemoComponentController = (function () {
    function DemoComponentController() {
        this.value = "hello, world";
        var array = [1, 2, 3, 4, 5];
        this.num = _.reduce(array, function (sum, n) { return sum + n; }, 0);
    }
    return DemoComponentController;
}());
exports.DemoComponentController = DemoComponentController;
