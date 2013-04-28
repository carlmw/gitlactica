var emitter = require('emitter');

describe('Universe', function () {
  var Universe,
      sceneStub = sinon.stub(),
      cameraStub = sinon.stub(),
      configStub = {
        host: 'sockethost:80',
        github: {
          username: 'terry'
        }
      },
      planetStub = sinon.stub(),
      orbitAllocatorStub = sinon.stub(),
      shipYardStub = sinon.stub(),
      systemStub = sinon.stub(),
      subspaceStub = sinon.stub(),
      clientCallStub = sinon.stub(),
      client,
      clientStub = function (host) {
        clientCallStub(host);
        this.send = sinon.stub();
        emitter(this);
        client = this;
      },
      hud = sinon.stub(),
      cameraControllerStub = sinon.stub(),
      keyboardNavStub = sinon.stub();

  before(function () {
    mockery.registerMock('./client', clientStub);
    mockery.registerMock('./planet', planetStub);
    mockery.registerMock('./ship_yard', shipYardStub);
    mockery.registerMock('./subspace_channel', subspaceStub);
    mockery.registerMock('../config', configStub);
    mockery.registerMock('./orbit_allocator', orbitAllocatorStub);
    mockery.registerMock('./system', systemStub);
    mockery.registerMock('./keyboard_navigation', keyboardNavStub);
    mockery.registerMock('./camera_controller', cameraControllerStub);
    mockery.registerMock('./hud', hud);
    Universe = require('../lib/universe');
  });

  beforeEach(function () {
    subspaceStub.returns({
      emit: function () {}
    });
    shipYardStub.returns({
      commision: function () {},
      dispatch: function () {}
    });
    systemStub.returns({
      form: function () {},
      layout: function () {}
    });
  });

  it("creates a websocket client", function () {
    new Universe(sceneStub, cameraStub);

    clientCallStub.should.have.been.calledWith('sockethost:80');
  });

  it("creates a keyboard navigator", function () {
    keyboardNavStub.reset();
    new Universe(sceneStub, cameraStub);

    keyboardNavStub.should.have.been.calledWith(subspaceStub.returnValue);
  });

  it("creates a camera controller with the camera and broker", function () {
    var subspace = sinon.stub();
    subspaceStub.returns(subspace);
    cameraControllerStub.reset();
    new Universe(sceneStub, cameraStub);

    cameraControllerStub.should.have.been.calledWith(cameraStub, subspace);
  });

  it("creates a hud", function () {
    var subspace = sinon.stub();
    subspaceStub.returns(subspace);
    hud.reset();
    new Universe(sceneStub, cameraStub);

    hud.should.have.been.calledWith(subspace);
  });

  describe("client messages", function () {
    it("sends a login message to the client when it connects", function () {
      new Universe(sceneStub, cameraStub);
      client.emit('open');

      client.send.should.have.been.calledWith('login', { login: 'terry' });
    });

    it("subscribes to repos", function () {
      new Universe(sceneStub, cameraStub);
      var sendMock = client.send = sinon.mock();
      sendMock.withArgs('subscribe', { repos: ['bob/repo'] });
      client.emit('repos', {
        login: 'bob',
        repos: [{ full_name: 'bob/repo' }]
      });

      sendMock.verify();
    });
  });

  describe("ship yard", function () {
    it("passes a subspace channel", function () {
      new Universe(sceneStub, cameraStub);

      shipYardStub.should.have.been.calledWith(sceneStub, subspaceStub.returnValue);
    });

    it("notified of new committers", function () {
      var commisionMock = sinon.mock();
      shipYardStub.returns({
        commision: commisionMock,
        dispatch: function () {}
      });
      commisionMock.withArgs(['bob']);
      new Universe(sceneStub, cameraStub);
      client.emit('committers', {
        repo: 'bob/repo',
        committers: [{ login: 'bob' }]
      });

      commisionMock.verify();
    });

    it("dispatches ships to a planet after notification", function () {
      var dispatchStub = sinon.stub();
      shipYardStub.returns({
        commision: function () {},
        dispatch: dispatchStub
      });
      new Universe(sceneStub, cameraStub);
      client.emit('committers', {
        repo: 'bob/repo',
        committers: [{ login: 'bob' }]
      });

      dispatchStub.should.have.been.calledWith('bob', 'bob/repo');
    });
  });

  describe("system", function () {
    it("passes the subspace channel", function () {
      new Universe(sceneStub, cameraStub);

      systemStub.should.have.been.calledWith(sceneStub, subspaceStub.returnValue);
    });

    it("notified of new repos", function () {
      var formStub = sinon.stub();
      systemStub.returns({
        form: formStub,
        layout: function () {}
      });
      new Universe(sceneStub);
      client.emit('repos', {
        repos: [{ full_name: 'bob/repo' }]
      });

      formStub.should.have.been.calledWith({ full_name: 'bob/repo' });
    });

    it("performs a layout after it is notified of new repos", function () {
      var layoutStub = sinon.stub();
      systemStub.returns({
        form: function () {},
        layout: layoutStub
      });
      new Universe(sceneStub, cameraStub);
      client.emit('repos', {
        repos: [{ full_name: 'bob/repo' }]
      });

      layoutStub.should.have.been.called;
    });

    it("calls reform when client receives a complexity message", function () {
      var reformMock = sinon.mock();
      systemStub.returns({ reform: reformMock });
      new Universe(sceneStub, cameraStub);
      reformMock
        .withArgs('terry/repo', 2000);
      client.emit('complexity', { repo: 'terry/repo', complexity: 2000 });

      reformMock.verify();
    });
  });

  describe("when a set of commits is received", function () {
    it("dispatches ships to the repo's planet", function () {
      var dispatchMock = sinon.mock();
      dispatchMock.withArgs('bob', 'bob/repo');
      shipYardStub.returns({
        commision: function () {},
        attack: function () {},
        dispatch: dispatchMock
      });
      new Universe(sceneStub, cameraStub);
      client.emit('commits', {
        repo: 'bob/repo',
        commits: [
          {
            committer: 'bob',
            added: {},
            modified: {},
            removed: {}
          }
        ]
      });

      dispatchMock.verify();
    });

    it("orders the ship to fire it's weapons on arrival", function () {
      var attackMock = sinon.mock();
      attackMock.withArgs('bob', 3, 2);
      shipYardStub.returns({
        commision: function () {},
        dispatch: function () {},
        attack: attackMock
      });
      new Universe(sceneStub, cameraStub);
      client.emit('commits', {
        repo: 'bob/repo',
        commits: [
          {
            committer: 'bob',
            added: { JavaScript: ["foo.js", "bar.js"] },
            modified: { JavaScript: ["baz.js"] },
            removed: { JavaScript: ["bin.js"] }
          }
        ]
      });

      attackMock.verify();
    });
  });
});
