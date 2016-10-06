namespace app.requestQuote.carrierSelection {
    'use strict';

    describe("Carrier Selection Controller", () => {
        let sut: CarrierSelectionController;
        let $rootScope;

        beforeEach(() => angular.mock.module('app.requestQuote.carrierSelection'));
        beforeEach(() => {
            angular.mock.inject((_$q_, _$rootScope_, _$state_) => {
                let carrierData = [{}]; // 1 carrier
                var spy = jasmine.createSpyObj("CarrierService", ["getCarriers"]);
                spy.getCarriers.and.returnValue(_$q_.when(carrierData));

                $rootScope = _$rootScope_;
                
                sut = new CarrierSelectionController(spy, _$state_);
            });
        });

        it("should load data from carrierService", () => {
            // before promise resolves
            expect(sut.carriers).toBeUndefined();
            
            // resolve promise
            $rootScope.$apply();

            // after promise resolves 
            expect(sut.carriers).toBeDefined();
            expect(sut.carriers.length).toBe(1);
        });
    });
}
