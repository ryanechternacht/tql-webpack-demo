
import * as _ from 'lodash';

export class DemoComponentController {
    value: string
    num: number

    constructor() {
        this.value = "hello, world";

        var array = [1,2,3,4,5];
        this.num = _.reduce(array, (sum, n) => sum + n, 0);
    }
}