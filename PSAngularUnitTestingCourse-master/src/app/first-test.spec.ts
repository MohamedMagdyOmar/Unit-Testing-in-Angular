// the file name should contain "spec" because it makes karma know that this file is a test file

// it lets us to group tests together, it takes 2 parameters:
//  1- string => the string is a descriptior for our test and
//  2- callback function
describe('my first test', () =>{
    let sut;

    // makes each test not effected by the previous test, it is like resetting the state of sut object, do not pollute future tests with old tests
    beforeEach(() =>{
        sut = {}
    })

    // actual test, it is prefered to start the string with word "should"
    it('should be true if true', () =>{
        // arrange
        sut.a = false;

        // act
        sut.a = true;

        // assert
        expect(sut.a).toBe(true);
    })
})