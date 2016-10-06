"use strict";
var demo_component_controller_1 = require('./demo-component.controller');
var DemoComponent = (function () {
    function DemoComponent() {
        this.bindings = {};
        this.controller = demo_component_controller_1.DemoComponentController;
        this.templateUrl = 'dist/demo-component/demo-component.component.html';
    }
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
angular.module('app.demoComponent')
    .component('demo', new DemoComponent());
