// here we are going to impement integration test for the service, you may ask why we need to make integration test for a service
// and not only use isolated test especially there is no template asscoiacted with the service? 
// that is because here we are using http, so we need integration test.
// angular team provide special mock for http service

import { TestBed, inject } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe("HeroService", () => {
    let mockMessageService;

    // we are importing this controller because it allows us to configure HttpClientTestingModule
    let httpTestingController: HttpTestingController
    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(["add"]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            // you find that HeroService is expecting 2 things, HttpClient, and MessageService
            // so we will mock MessageService, and use especial mock for HttpClient that is provided by angular team
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });
        // it access dependency injection registery and looks for this TestBed's Module, and find the service that correlates to that type, and give us a handle
        // to it so it gives us an instance of the service inside the testing module
        // httpTestingController = TestBed.inject(HttpTestingController);

    })

    describe("getHero", () =>{
        // there is special inject function that is provided by angular, inject takes list of dependencies that we want to use
        it("should call get with correct URL", inject([HeroService, HttpTestingController],
             (service: HeroService, controller: HttpTestingController)  => {

            // here we need to test "getHero" method, the method create the URL, and return the required hero.
            // we have to subscribe to make Http fire, so here we make the call (httpGet)
            service.getHero(4).subscribe(() => {
                // below line will be executed after the flush is executed
                console.log("fulfilled");
            });

            // here we are expecting the call
            const req = controller.expectOne('api/heroes/4')

            // it will send back this data, when above request is sent
            req.flush({id: 4, name: "SuperDude", strngth: 100})

            controller.verify()
        }));
    })

})
