/// <reference path="../../../../../src/app.d.ts"/>
module app.requestQuote.quoteDetails.loadReadyBy {
    describe("LoadReadyBy Controller Tests", () => {

        let sut: LoadReadyByController;

        beforeEach(() => {
            angular.mock.inject(() => {
                sut = new LoadReadyByController();
            });
        });

        it("should load a controller", () => {
            expect(sut).toBeDefined(true);
        });

        it("should default to today's date", () => {
            
            var today = moment();
            var isSameDay = today.isSame(sut.selectedDate, 'day');

            expect(isSameDay).toBeTruthy();
        });
    });
}