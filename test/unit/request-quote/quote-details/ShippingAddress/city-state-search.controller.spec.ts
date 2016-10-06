module app.requestQuote.quoteDetails.shippingAddress {
    describe("CityStateSearchTestController", () => {
        let http, q, backend, tester, service, rootScope, rewrite;

        beforeEach(() => {
            angular.mock.inject(function ($http, $q, $httpBackend) {
                q = $q;
                http = $http;
                backend = $httpBackend;
                let rewrite = new AppProxyService();
                service = new app.requestQuote.quoteDetails.shippingAddress.ShippingAddressService(http, q, rewrite);
                tester = new app.requestQuote.quoteDetails.shippingAddress.CityStateSearchController(service);
                tester.$inject = [ShippingAddressService];
            })
        });

        describe("tests", () => {
            it("has a CityStateSearchController", () => {
                expect(tester).toBeDefined();
            });

            it("should get states list", () => {
                backend.when('GET', 'http://localhost/proxy/api/LocationsSearch/GetStates')
                    .respond(['["OH", "KY", "IN", "ON", "NY"]']);
                http.$httpBackend = backend;
                http.$httpBackend.expectGET('http://localhost/proxy/api/LocationsSearch/GetStates');
                tester = new app.requestQuote.quoteDetails.shippingAddress.CityStateSearchController(service);
                backend.flush();
                expect(tester.states.length).toBeGreaterThan(0);
            });
        });
    });
}