var jsyaml = require('js-yaml'),
    languageColourMapper = require('../lib/language_colour_mapper'),
    request = require('request'),
    fs = require('fs');

module.exports = function(grunt) {
  grunt.registerTask('languages', function() {
    var done = this.async(),
        YAML_URL = "https://raw.github.com/github/linguist/master/lib/linguist/languages.yml";

    request.get(YAML_URL, function (err, res, body) {
      if (err) {
        grunt.log.write(err).error();
      }
      var languages = jsyaml.safeLoad(body),
          colours = languageColourMapper(languages);

      fs.writeFileSync('colours.json', JSON.stringify(colours));
      grunt.log.writeln('colours.json output successfully').ok();
      done();
    });
  });
};
