var languageColourMapper = require('../lib/language_colour_mapper');
describe('languageColourMapper', function () {
  it("maps language names to colours", function () {
    var input = {
      JavaScript: {
        color: '#f15501'
      }
    };

    expect(languageColourMapper(input)).to.deep.equal({
      JavaScript: 0xf15501
    });
  });

  it("maps the primary file extension to the language colour", function () {
    var input = {
      JavaScript: {
        color: '#f15501',
        primary_extension: '.js'
      }
    };

    expect(languageColourMapper(input)['.js']).to.equal(0xf15501);
  });

  it("maps other file extensions to the language colour", function () {
    var input = {
      JavaScript: {
        color: '#f15501',
        extensions: ['.jsm']
      }
    };

    expect(languageColourMapper(input)['.jsm']).to.equal(0xf15501);
  });

  describe("when no colours is set", function () {
    it("maps language to a default colour", function () {
      var input = {
        Java: {}
      };

      expect(languageColourMapper(input)['Java']).to.equal(0xffffff);
    });
  });

  describe("when the language is in a group", function () {
    it("maps to its parent", function () {
      var input = {
        JavaScript: {
          color: '#f15501'
        },
        JSON: {
          group: 'JavaScript'
        }
      };

      expect(languageColourMapper(input).JSON).to.equal(0xf15501);
    });

    it("maps primary_extension to the parent", function () {
      var input = {
        JavaScript: {
          color: '#f15501'
        },
        JSON: {
          group: 'JavaScript',
          primary_extension: '.json'
        }
      };

      expect(languageColourMapper(input)['.json']).to.equal(0xf15501);
    });

    it("maps file extensions to the parent", function () {
      var input = {
        JavaScript: {
          color: '#f15501'
        },
        JSON: {
          group: 'JavaScript',
          extensions: ['.jsonderp']
        }
      };

      expect(languageColourMapper(input)['.jsonderp']).to.equal(0xf15501);
    });
  });
});
