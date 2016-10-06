// module shippingaddress {
//     describe("DestinationControllerTests", ()=>{
//         let service,quoteService, scope, tester, http, q, backend;
//         beforeEach(()=>{
//             angular.mock.inject(function($http, $q, $controller, $httpBackend, $injector, $rootScope){
//                 q = $q;
//                 http = $http;
//                 backend = $httpBackend;
//                 backend.when('GET', 'http://localhost/proxy/api/LocationsSearch/ZipCode/45')
//                     .respond(['[{"key": "45202","value": "Cincinnati, OH USA"},'+
//                             '{"key": "45203","value": "Cincinnati, OH USA"},'+
//                             '{"key": "45205","value": "Price Hill, OH USA"},'+
//                             '{"key": "45204","value": "Cincinnati, OH USA"},'+
//                             '{"key" :"44302","value": "Akron, OH USA"}]']
//                 );
//                 http.$httpBackend = backend;
//                 scope = $rootScope.$apply()
//                 service = new shippingaddress.ShippingAddressService(http, q);
//                 quoteService = new app.requestQuote.quoteDetails.QuoteDetailsService(http, q);
//                 tester = new shippingaddress.DestinationPostalCodeController(service, quoteService);
//                 tester.$inject = [ShippingAddressService]
//             })
//         })
//         afterEach(function() {
//             http.$httpBackend.verifyNoOutstandingExpectation();
//             http.$httpBackend.verifyNoOutstandingRequest();
//         })
//         describe("tests", () =>{
//             it("does get a Destination Controller", ()=>{
//             expect(tester).toBeDefined();
//             })
//             it("locations exists before search", ()=>{
//                 let event ={
//                     keyCode: 9,
//                     currentTarget:{value: "45"}
//                 }
//                 expect(tester.locations.length).toBe(0);
//             })
//             // it("check locations does not fire on backspace", ()=>{
//             //     let event ={
//             //         keyCode: 8,
//             //         currentTarget: {value: "44302"}
//             //     }
//             //     tester.searchPostalCode(event);
//             //     expect(tester.locations.length).toBe(0);
//             // })
//             it("searchPostalcode does access backend", () =>{
//                 let event ={
//                     keyCode: 13,
//                     currentTarget: {value: "45"}
//                 }
//                 http.$httpBackend.expectGET('http://localhost/proxy/api/LocationsSearch/ZipCode/45');
//                 tester.searchPostalCode(event);
//                 http.$httpBackend.flush();
//                 expect(tester.locations.length).toBe(5);
//             })
//             it("update Destination sets city to Akron", ()=>{
//                 let event ={
//                     keyCode:13,
//                     currentTarget: {value: "44302"}
//                 }
//                 backend.when('GET', 'http://localhost/proxy/api/LocationsSearch/ZipCode/44302')
//                     .respond(['[{"key": "45202","value": "Cincinnati, OH USA"},'+
//                             '{"key": "45203","value": "Cincinnati, OH USA"},'+
//                             '{"key": "45205","value": "Price Hill, OH USA"},'+
//                             '{"key": "45204","value": "Cincinnati, OH USA"},'+
//                             '{"key" :"44302","value": "Akron, OH USA"}]']
//                 );
//                 http.$httpBackend = backend;
//                 http.$httpBackend.expectGET('http://localhost/proxy/api/LocationsSearch/ZipCode/44302');
//                 tester.searchPostalCode(event);
//                 http.$httpBackend.flush();
//                 expect(tester.city).toBe('Akron');
//             })
            
//         })
//     });
// }