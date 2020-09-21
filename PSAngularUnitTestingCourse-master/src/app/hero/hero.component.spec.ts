import { TestBed, ComponentFixture } from "@angular/core/testing"
import {HeroComponent} from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("HeroComponent", () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        // we are going to create special utility called testBed, the testBed allows us to test both the component and
        // it's template(html) running together.
        // we are going to create special module just for testing purpose(testing module). configureTestingModule takes parameters that match exactly 
        // the layout of when we create an "app module".

        TestBed.configureTestingModule({
            declarations: [HeroComponent],

            // below lines tells angular that for this module do not error if you encounter an unknown attribute or an unknown element in your
            // HTML of the template, just ignore it. mainly this to prevent karma from giving error when it sees routerLink in the html file
            schemas: [NO_ERRORS_SCHEMA]
        });

        // then we are going to create Test Component. it return fixture component which is a wrapper for a compoent that is 
        // used in testing
        fixture = TestBed.createComponent(HeroComponent);
    })

    it("should have the correct hero", () => {
        fixture.componentInstance.hero = {id: 1, name:'SuperDude', strength:3}

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude')
    })
})