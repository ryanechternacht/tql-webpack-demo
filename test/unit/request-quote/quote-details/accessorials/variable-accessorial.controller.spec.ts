namespace app.requestQuote.quoteDetails.accessorials {
    'use strict';

    describe("variable-accessorial.controller", () => {
        let sut: VariableAccessorialController;
        let baseAccessorial: VariableAccessorial

        beforeEach(() => {
            baseAccessorial = {
                kind: "variable",
                name: "jim",
                selected: false,
                amount: 7
            };
            sut = new VariableAccessorialController();
            sut.accessorial = baseAccessorial;
            sut.onUpdate = (params: any) => {};

            // these lines should be updated when angular's $onChanges fires, but
            // that doesn't fire in this context
            sut._selected = baseAccessorial.selected;
            sut._amount = baseAccessorial.amount;

            spyOn(sut, 'onUpdate');
        });

        it("should call onUpdate when _update is called", () => {
            sut._update();

            expect(sut.onUpdate).toHaveBeenCalled();
        });

        it("should send the paramters provided when calling onUpdate", () => {
            sut._update();

            expect(sut.onUpdate).toHaveBeenCalledWith({
                accessorial: baseAccessorial
            });
        });

        it("should send any updates to selected when calling onUpdate", () => {
            sut._selected = !baseAccessorial.selected;

            sut._update();

            expect(sut.onUpdate).not.toHaveBeenCalledWith({
                accessorial: baseAccessorial
            });
        });

        it("should send any updates to amount when calling onUpdate", () => {
            sut._amount = baseAccessorial.amount + 1;

            sut._update();

            expect(sut.onUpdate).not.toHaveBeenCalledWith({
                accessorial: baseAccessorial
            });
        });
    });
}