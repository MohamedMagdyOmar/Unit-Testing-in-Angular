// this is more complex component, as heroes component has dependant on child component "app-hero", and also we inject a service to its constructor
import { TestBed, ComponentFixture } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroesComponent } from "./heroes.component";

describe("HerosComponent", () => {
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(() => {
        // we are going to create special utility called testBed, the testBed allows us to test both the component and
        // it's template(html) running together.
        // we are going to create special module just for testing purpose(testing module). configureTestingModule takes parameters that match exactly 
        // the layout of when we create an "app module".

        TestBed.configureTestingModule({
            declarations: [HeroesComponent],

            // below lines tells angular that for this module do not error if you encounter an unknown attribute or an unknown element in your
            // HTML of the template, just ignore it. mainly this to prevent karma from giving error when it sees routerLink in the html file
            schemas: [NO_ERRORS_SCHEMA]
        });

        // then we are going to create Test Component. it return fixture component which is a wrapper for a compoent that is 
        // used in testing.
        // note: when we create component using testbed, ngOnInit in this component will be called automatically
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it("should have the correct hero", () => {

    })

})