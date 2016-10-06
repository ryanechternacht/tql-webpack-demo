module app.requestQuote.quoteDetails.shippingAddress {
    describe("ZipCodesTestController", () => {
        let service, quoteService, scope, tester, http, q, backend, rewrite;

        beforeEach(() => {
            angular.mock.inject(function ($http, $q, $httpBackend) {
                q = $q;
                http = $http;
                backend = $httpBackend;

                rewrite = new AppProxyService()
                service = new ShippingAddressService(http, q,rewrite);
                quoteService = new app.requestQuote.quoteDetails.QuoteDetailsService(http, q, rewrite);
                tester = new ZipCodeController(service, quoteService);
                tester.$inject = [ShippingAddressService];
            })
        });

        describe("tests", () => {
            it("has a ZipCodeController", () => {
                expect(tester).toBeDefined();
            });

            it("has locations before search", () => {
                let event = {
                    keyCode: 9,
                    currentTarget: { value: "45" }
                };
                backend.when('GET', 'http://localhost/proxy/api/LocationsSearch/ZipCode/45')
                    .respond(['[{"key": "45202","value": "Cincinnati, OH USA"},' +
                        '{"key": "45203","value": "Cincinnati, OH USA"},' +
                        '{"key": "45205","value": "Price Hill, OH USA"},' +
                        '{"key": "45204","value": "Cincinnati, OH USA"},' +
                        '{"key" :"44302","value": "Akron, OH USA"}]']
                );
                http.$httpBackend = backend;
                http.$httpBackend.expectGET('http://localhost/proxy/api/LocationsSearch/ZipCode/45');
                tester.searchPostalCode(event);
                http.$httpBackend.flush();
                expect(tester.locations.length).toBeGreaterThan(0);
            });

            it("sets destination to Akron", () => {
                let event = {
                    keyCode: 13,
                    currentTarget: { value: "44302" }
                }
                backend.when('GET', 'http://localhost/proxy/api/LocationsSearch/ZipCode/44302')
                    .respond(['[{"key": "45202","value": "Cincinnati, OH USA"},' +
                        '{"key": "45203","value": "Cincinnati, OH USA"},' +
                        '{"key": "45205","value": "Price Hill, OH USA"},' +
                        '{"key": "45204","value": "Cincinnati, OH USA"},' +
                        '{"key" :"44302","value": "Akron, OH USA"}]']
                    );
                http.$httpBackend = backend;
                http.$httpBackend.expectGET('http://localhost/proxy/api/LocationsSearch/ZipCode/44302');
                tester.searchPostalCode(event);
                http.$httpBackend.flush();
                expect(tester.city).toBe('Akron');
            })
        })
    });
}