describe('KeyboardNavigation', function () {
  var mousetrap = {
        bind: function () {}
      },
      keyboardNavigation;

  before(function () {
    mockery.registerMock('mousetrap', mousetrap);
    keyboardNavigation = require('../lib/keyboard_navigation');
  });

  it("triggers the next planet event when the left key is pressed", function () {
    var triggerMock = sinon.mock();
    sinon.stub(mousetrap, 'bind')
      .withArgs('left')
      .callsArg(1);
    triggerMock
      .withArgs('previous:planet');
    keyboardNavigation({
      emit: triggerMock
    });

    triggerMock.verify();
  });

  it("triggers the next planet event when the right key is pressed", function () {
    var triggerMock = sinon.mock();
    sinon.stub(mousetrap, 'bind')
      .withArgs('right')
      .callsArg(1);
    triggerMock
      .withArgs('next:planet');
    keyboardNavigation({
      emit: triggerMock
    });

    triggerMock.verify();
  });
});
