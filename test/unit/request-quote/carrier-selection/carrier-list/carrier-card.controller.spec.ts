namespace app.requestQuote.carrierSelection.carrierList {
    'use strict';

    describe("carrier-card.controller", () => {
        let sut: CarrierCardController;
        let carrier: Carrier;

        beforeEach(() => {
            carrier = {
                maxLiability: 5,
                name: "abc",
                serviceDays: 3,
                image: "kk",
                cost: 10,
                serviceType: "yo",
                onTimeRate: .03
            };
            sut = new CarrierCardController();
            sut.carrier = carrier;
            sut.carrierSelected = (params: any) => {};

            spyOn(sut, 'carrierSelected');
        });

        it("should call carrierSelected when _selectCarrier is called", () => {
            sut._selectCarrier();

            expect(sut.carrierSelected).toHaveBeenCalled();
        });

        it("should pass the carrier when _selectCarrier is called", () => {
            sut._selectCarrier();

            expect(sut.carrierSelected).toHaveBeenCalledWith({
                carrier: carrier
            });
        });
    });
}