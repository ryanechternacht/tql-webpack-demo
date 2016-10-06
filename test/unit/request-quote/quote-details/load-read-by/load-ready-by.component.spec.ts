/// <reference path="../../../../../src/app.d.ts"/>

module app.requestQuote.quoteDetails.loadReadyBy {
    describe("LoadReadyBy Component Tests", () => {

        let tester;

        beforeEach(() => {
            angular.mock.inject(() => {
                tester = new LoadReadyByComponent();
            });
        });

        it("should load the correct controller", () => {
            expect(tester.controller).toBe(LoadReadyByController);
        });
    });
}