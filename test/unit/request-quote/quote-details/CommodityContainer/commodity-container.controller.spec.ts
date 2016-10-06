module app.requestQuote.quoteDetails.commodityentry {
    describe("CommodityControllerTests", ()=>{
        let tester, rewrite;
        beforeEach(() =>{
            angular.mock.inject(function($http, $q){
                rewrite = new AppProxyService()
                let service = new app.requestQuote.quoteDetails.QuoteDetailsService($http, $q, rewrite);
                tester = new CommodityEntryController(service);

            })
        });

        it("does test checking total weight", () =>{
            let event = {
                keyCode: 9,
                currentTarget: {
                    value: "25001"
                }
            }
            tester.newCommodity.totalWeight = 25001;
            tester.checkWeight();
            expect(tester.heavyWeight).toBe(true);
        })
        it("does test checking total weight, small", ()=>{
            let event = {
                keyCode: 9,
                currentTarget: {
                    value: "42"
                }
            }
            tester.checkWeight(event);
            expect(tester.heavyWeight).toBe(false);
        })
        //TODO
        // it("does add commodity -- has valid total weight", ()=> {
        //     tester.freightClass = "050";
        //     tester.totalWeight = 250;
        //     tester.density = '33'
        //     tester.quantity = 1;
        //     tester.addCommodity();
        //     expect(tester.commodities.length).toBeGreaterThan(0);
        // });
        it("does calculate density, everything null", ()=>{
            tester.calculateDensity(); 
            expect(tester.newCommodity.density).toBe(0);
        })
        it("does calculate density, one value", ()=>{
            tester.newCommodity.dimensionLength = 40;
            tester.calculateDensity(); 
            expect(tester.newCommodity.density).toBe(0);

        })
        it("does calculate density, two values", () =>{
            tester.newCommodity.dimensionLength = 40;
            tester.newCommodity.dimensionWidth = 40;
            tester.calculateDensity(); 
            expect(tester.newCommodity.density).toBe(0);
        })
        it("does calculate density, all values no weight", ()=>{
            tester.newCommodity.dimensionLength = 40;
            tester.newCommodity.dimensionWidth = 40;
            tester.newCommodity.dimensionHeight = 40;
            tester.calculateDensity(); 
            expect(tester.newCommodity.density).toBe(0);
        })
        it("does calculate density, all values", ()=>{

            tester.newCommodity.dimensionLength = 25;
            tester.newCommodity.dimensionWidth = 25;
            tester.newCommodity.dimensionHeight = 25;
            tester.newCommodity.totalWeight = 2500;
            tester.newCommodity.selectedUnits = 'in';
            let event = {}
            tester.calculateDensity(event);
            expect(tester.newCommodity.density).toBe(276.48)
        })
        it("does calculate density,  all values in centimeters", ()=>{
            
            tester.newCommodity = {
                id:0,
                quoteId:0,
                commodityName:"",
                handlingUnits: "Pallets",
                quantity: 0,
                freightClass: "",
                totalWeight: 2500,
                dimensionLength: 63.5,
                dimensionWidth: 63.5,
                dimensionHeight: 63.5,
                units:"cm",
                density: 0,
                isStackable: false,
                isHazmat: false,
                services: [],
                isEditState: true,
                isWarning: false,
                weightUnits: "lbs"
            }            
            tester.newCommodity.dimensionLength = 63.5;
            tester.newCommodity.dimensionWidth = 63.5;
            tester.newCommodity.dimensionHeight = 63.5;
            tester.newCommodity.totalWeight = 2500;
            tester.newCommodity.selectedUnits = 'cm';
            let event = {}
            tester.calculateDensity(event);
            expect(tester.newCommodity.density).toBe(276.48)
        })
        it("does calculate density, using QA numbers", ()=>{
            tester.newCommodity = {
                id:0,
                quoteId:0,
                commodityName:"",
                handlingUnits: "Pallets",
                quantity: 0,
                freightClass: "",
                totalWeight: 100,
                dimensionLength: 12,
                dimensionWidth: 12,
                dimensionHeight: 12,
                units:"in",
                density: 0,
                isStackable: false,
                isHazmat: false,
                services: [],
                isEditState: true,
                isWarning: false,
                weightUnits: "lbs"
            }

            let event = {}
            tester.calculateDensity(event);
            expect(tester.newCommodity.density).toBe(100)
        })
        it("does calculate density, using kg units", ()=>{
            tester.newCommodity = {
                id:0,
                quoteId:0,
                commodityName:"",
                handlingUnits: "Pallets",
                quantity: 0,
                freightClass: "",
                totalWeight:2.20462,
                dimensionLength: 12,
                dimensionWidth: 12,
                dimensionHeight: 12,
                units:"in",
                density: 0,
                isStackable: false,
                isHazmat: false,
                services: [],
                isEditState: true,
                isWarning: false,
                weightUnits: "kg"
            }

            tester.calculateDensity();
            expect(tester.newCommodity.density).toBe(1);
        })       
    })
}