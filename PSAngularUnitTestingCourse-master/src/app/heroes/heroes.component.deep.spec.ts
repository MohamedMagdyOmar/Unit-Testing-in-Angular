// this is more complex component, as heroes component has dependant on child component "app-hero", and also we inject a service to its constructor
import { TestBed, ComponentFixture } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { of } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';
import { By } from "@angular/platform-browser";

describe("HerosComponent", () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHerosService;
    let Heroes;    

    beforeEach(() => {
        Heroes = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        mockHerosService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        
        TestBed.configureTestingModule({
            // since it is deep test, we are not faking the child comopnent, but we are using the actual child component
            declarations: [HeroComponent, HeroesComponent],
            providers: [

                { provide: HeroService, useValue: mockHerosService}
            ],

            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

           
    })

    it("should render each hero as a HeroComponent", () => {
        mockHerosService.getHeroes.and.returnValue(of(Heroes));

        // since we are calling change detection in parent component, so ngOnInit will be caled on parent and child comopnent.
        // run ngOnInit
        fixture.detectChanges();   
        // what we need to do is to look for HeroComponent that we have created, then we need to find child elememnt through a directive.
        // below lines mean: go and find all elements or nodes in this template that have this directive on them, it will get list of all of the debug
        // elements that are attached to a HeroComponent, so it will get list of all "app-hero" elements
        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))

        // check that we have 3 app-hero
        expect(heroComponentsDEs.length).toEqual(3);

        expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual("SpiderDude");
        expect(heroComponentsDEs[1].componentInstance.hero.name).toEqual("Wonderful Woman");
        expect(heroComponentsDEs[2].componentInstance.hero.name).toEqual("SuperDude");

        for(let i = 0; i < heroComponentsDEs.length; i++)
        {
            expect(heroComponentsDEs[i].componentInstance.hero).toEqual(Heroes[i]);
        }
    })

})