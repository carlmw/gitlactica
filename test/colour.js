var subject = require('../lib/colour');

describe("colours", function () {
  var colour;
  beforeEach(function () {
    colour = subject({
      JavaScript: 0xff0000
    });
  });

  describe("of", function () {
    describe("when the language has a colour", function () {
      it("returns the colour", function () {
        expect(colour.of('JavaScript')).to.equal(0xff0000);
      });
    });

    describe("when the language has no colour", function () {
      it("returns white", function () {
        expect(colour.of('Derp')).to.equal(0xffffff);
      });
    });
  });
});
