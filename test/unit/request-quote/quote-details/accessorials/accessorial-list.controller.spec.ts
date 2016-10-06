namespace app.requestQuote.quoteDetails.accessorials {
    'use strict';

    describe("list-accessorial.controller", () => {
        let sut: AccessorialListController;
        let simpleAccessorial : SimpleAccessorial
        let variableAccessorial : VariableAccessorial
        let name: string;
        
        beforeEach(() => {
            simpleAccessorial = {
                kind: "simple",
                name: "bob",
                selected: true
            };

            variableAccessorial = {
                kind: "variable",
                name: "jim",
                selected: false,
                amount: 7
            };

            sut = new AccessorialListController(); 
            let accessorials: Accessorial[] = [simpleAccessorial, variableAccessorial];
            sut.onAccessorialsChanged = () => {};

            spyOn(sut, 'onAccessorialsChanged');
        });

        it("should call onAccessorialsChanged when _update is called", () => {
            var acc : SimpleAccessorial = { // details don't matter
                kind: "simple",
                name: "",
                selected: false
            };

            sut._update(acc); 

            expect(sut.onAccessorialsChanged).toHaveBeenCalled();
        });

        it("should set the correct parameters when calling onAccessorialsChanged for a simple accessorial", () => {
            sut._update(simpleAccessorial);

            expect(sut.onAccessorialsChanged).toHaveBeenCalledWith({
                accessorial: simpleAccessorial
            });
        });

        it("should set the correct parameters when calling onAccessorialsChanged for a variable accessorial", () => {
            sut._update(variableAccessorial);

            expect(sut.onAccessorialsChanged).toHaveBeenCalledWith({
                accessorial: variableAccessorial
            });
        });

        it("should send new values for simple accessorial updates, not its original values", () => {
            var acc = Object.assign({}, simpleAccessorial); // duplicate

            acc.selected = !acc.selected; // change it

            sut._update(acc);

            expect(sut.onAccessorialsChanged).not.toHaveBeenCalledWith({
                accessorial: simpleAccessorial
            });
        });

        it("should send new values for variable accessorial updates, not its original values", () => {
            // check selected
            var acc = Object.assign({}, variableAccessorial); // duplicate

            acc.selected = !acc.selected; // change it

            sut._update(acc);

            expect(sut.onAccessorialsChanged).not.toHaveBeenCalledWith({
                accessorial: variableAccessorial
            });

            // check amount
            acc = Object.assign({}, variableAccessorial);

            acc.amount = acc.amount + 1; // change it

            sut._update(acc);

            expect(sut.onAccessorialsChanged).not.toHaveBeenCalledWith({
                accessorial: variableAccessorial
            });
        });
    });
}