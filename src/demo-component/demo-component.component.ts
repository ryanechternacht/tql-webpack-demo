import { DemoComponentController } from './demo-component.controller'

export class DemoComponent {
    bindings: any
    controller: any
    templateUrl: any

    constructor() {
        this.bindings = {

        };
        this.controller = DemoComponentController;
        this.templateUrl = 'dist/demo-component/demo-component.component.html';
    }
}

angular.module('app.demoComponent')
    .component('demo', new DemoComponent());