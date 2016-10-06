namespace app.requestQuote.quoteDetails.accessorials {
    'use strict';

    describe("simple-accessorial.controller", () => {
        let sut: SimpleAccessorialController;
        let baseAccessorial: SimpleAccessorial
        
        beforeEach(() => {
            baseAccessorial = {
                kind: "simple",
                name: "bob",
                selected: true
            };
            sut = new SimpleAccessorialController();
            sut.accessorial = baseAccessorial; 
            sut.onUpdate = (params: any) => {};

            // this line should be updated when angular's $onChanges fires, but
            // that doesn't fire in this context
            sut._selected = baseAccessorial.selected;

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

        it("should send any updates when calling onUpdate", () => {
            sut._selected = !baseAccessorial.selected;

            sut._update();

            expect(sut.onUpdate).not.toHaveBeenCalledWith({
                accessorial: baseAccessorial
            });
        });
    });
}