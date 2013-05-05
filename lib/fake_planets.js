module.exports = function (client) {
  client.emit('repos', {
    login: "carlmw",
    repos: [
      {
        name: "gitlactica",
        full_name: "carlmw/gitlactica",
        language: "JavaScript",
        color: "#f15501",
        description: "Ajax.org Cloud9 Editor"
      },
      {
        name: "defunkt.github.com",
        full_name: "defunkt/defunkt.github.com",
        language: "Unknown",
        color: "#ffffff",
        description: "My GitHub Page"
      },
      {
        name: "phenny",
        full_name: "carlmw/phenny",
        language: "Python",
        color: "#ffffff",
        description: "My GitHub Page"
      }
    ]
  });
};
