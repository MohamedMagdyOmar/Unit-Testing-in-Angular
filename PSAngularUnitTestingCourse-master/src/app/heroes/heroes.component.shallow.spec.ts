// this is more complex component, as heroes component has dependant on child component "app-hero", and also we inject a service to its constructor
import { TestBed, ComponentFixture } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';

describe("HerosComponent", () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHerosService;
    let Heroes;

    // we are going to create another component that is similar to heroes component but it is much simpler. we added this simple component because we need to delete 
    // this line schemas: [NO_ERRORS_SCHEMA], becuase this line if we have a problem with the html for example we have <adiv> instead of <div> the test will neglect this issue.
    // so it hide errors in our template.
    // so we create child mock component
    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })

    class FakeHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter();
      }      

    beforeEach(() => {
        // we are going to create special utility called testBed, the testBed allows us to test both the component and
        // it's template(html) running together.
        // we are going to create special module just for testing purpose(testing module). configureTestingModule takes parameters that match exactly 
        // the layout of when we create an "app module".

        Heroes = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        mockHerosService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        
        TestBed.configureTestingModule({
            declarations: [FakeHeroComponent, HeroesComponent],
            providers: [
                // this line means when someone need this service, please use this mock service instead
                { provide: HeroService, useValue: mockHerosService}
            ],
            // below lines tells angular that for this module do not error if you encounter an unknown attribute or an unknown element in your
            // HTML of the template, just ignore it. mainly this to prevent karma from giving error when it sees routerLink in the html file
            // schemas: [NO_ERRORS_SCHEMA]
        });

        // then we are going to create Test Component. it return fixture component which is a wrapper for a compoent that is 
        // used in testing.
        // note: when we create component using testbed, ngOnInit in this component will be called automatically
        // the constructor of this comopnent is expecting a service to be injected, so we have to mock this service
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it("should set heroes correctly from the service", () => {
        mockHerosService.getHeroes.and.returnValue(of(Heroes));

        // we have to call change detection, because it causes life cycles events to run, whcih makes ngOnInit to be called
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

})