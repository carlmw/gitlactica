module.exports = function (client) {
  client.emit('commits', {
    repo: "carlmw/gitlactica",
    commits: [
      {
        committer: "carlmw",
        added: {
          JavaScript: [
            "lib/sky_box.js",
            "test/sky_box.js"
          ],
        },
        modified: {
          HTML: ["index.html"],
          JavaScript: ["lib/gitlactica.js"],
          Unknown: ["textures/stars.jpg"]
        },
        removed: {
          HTML: ["index2.html"],
          JavaScript: ["lib/gitlactica2.js"],
          Unknown: ["textures/stars2.jpg"]
        }
      },
      {
        committer: "dgym",
        added: {
          JavaScript: [
            "lib/sky_box.js",
            "test/sky_box.js"
          ],
        },
        modified: {
          HTML: ["index.html"],
          JavaScript: ["lib/gitlactica.js"],
          Unknown: ["textures/stars.jpg"]
        },
        removed: {
          HTML: ["index2.html"],
          JavaScript: ["lib/gitlactica2.js"],
          Unknown: ["textures/stars2.jpg"]
        }
      }
    ]
  });

  client.emit('commits', {
    repo: "carlmw/phenny",
    commits: [
      {
        committer: "carlmw",
        added: {
          JavaScript: [
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js"
          ],
        },
        modified: {
          HTML: ["index.html"],
          JavaScript: ["lib/gitlactica.js"],
          Unknown: ["textures/stars.jpg"]
        },
        removed: {
          HTML: ["index2.html"],
          JavaScript: [
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js",
            "lib/sky_box.js",
            "test/sky_box.js"
          ],
          Unknown: ["textures/stars2.jpg"]
        }
      },
      {
        committer: "dgym",
        added: {
          JavaScript: [
            "lib/sky_box.js",
            "test/sky_box.js"
          ],
        },
        modified: {
          HTML: ["index.html"],
          JavaScript: ["lib/gitlactica.js"],
          Unknown: ["textures/stars.jpg"]
        },
        removed: {
          HTML: ["index2.html"],
          JavaScript: ["lib/gitlactica2.js"],
          Unknown: ["textures/stars2.jpg"]
        }
      }
    ]
  });
};
