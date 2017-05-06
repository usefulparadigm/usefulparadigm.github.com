// brunch-config.js

module.exports = {
  files: {
    javascripts: {joinTo: "app.js"},
  },
  paths: {
    watched: ["_app"],
    public: "js"
  },
  modules: {
    autoRequire: {
      "app.js": ["_app/application"]
    }
  }
}