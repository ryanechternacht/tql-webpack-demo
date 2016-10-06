/// <reference path="../../../../src/app.d.ts"/>
namespace app.requestQuote.carrierSelection {
    describe("CarrierService", () => {
        let rewrite;
        let $http, $httpBackend;
        let sut: CarrierService;
        beforeEach(() => {
            angular.mock.inject((_$http_, _$httpBackend_, _$injector_) => {
                $http = _$http_;
                $httpBackend = _$httpBackend_;
                rewrite = new AppProxyService();
                sut = new CarrierService($http, rewrite);

                $httpBackend.when('dist/data/carriers.json').respond([
                    { },
                    { }
                ]);
            });
        });

        it("should make a webrequest for data", () => {
            sut.getCarriers().then(c => {
                expect(c).toBeDefined();
                expect(c.length).toBe(2);
                // done();
            })
            // .finally(done);
        });
    });
}