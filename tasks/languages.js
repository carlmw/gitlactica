var jsyaml = require('js-yaml'),
    languageColourMapper = require('../lib/language_colour_mapper'),
    https = require('https'),
    fs = require('fs');

module.exports = function(grunt) {
  grunt.registerTask('languages', function() {
    var done = this.async(),
        YAML_URL = "https://raw.github.com/github/linguist/master/lib/linguist/languages.yml";

    https.get(YAML_URL, function (res) {
      var body = '';
      res.on('data', function (d) {
        body += d;
      });
      res.on('end', function () {
        var languages = jsyaml.safeLoad(body),
            colours = languageColourMapper(languages);

        fs.writeFileSync('colours.json', JSON.stringify(colours));
        grunt.log.writeln('colours.json output successfully').ok();
        done();
      });
    }).on('error', function (e) {
      grunt.log.write(e.message).error();
    });
  });
};
