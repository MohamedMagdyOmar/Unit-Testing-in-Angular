import { HeroesComponent } from "./heroes.component"
import { exec } from "child_process";
import { of } from 'rxjs';

describe("HeroesComponent", () => {

    let component: HeroesComponent;
    let Heroes;
    let mockHeroService;

    beforeEach(()=>{
        Heroes = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        // create mock object that we can control, we can tell what methods it has, and what those methods should return
        // when they are called. it takes array of methods name, if no methods we can leave it blanl
        mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"])

        component = new HeroesComponent(mockHeroService);
    })

    describe("delete", () => {
        it("should remove indeicated hero from the heros list", () => {

            // the simplest way to create observable is to call of method, and pass in a true
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = Heroes;

            component.delete(Heroes[2]);

            expect(component.heroes.length).toBe(2)
        })

        it("should call deleteHero", () => {
            // if you did not put below line, he will gives error that "subscribe" is undefined
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = Heroes;

            component.delete(Heroes[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(Heroes[2]);
        })
    })

})