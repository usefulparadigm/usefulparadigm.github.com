// brunch-config.js

module.exports = {
  files: {
    javascripts: {joinTo: "app.js"},
  },
  paths: {
    watched: ["_app"],
    public: "js"
  },
  // plugins: {
  //   babel: {presets: ['latest', 'react']},
  //   // postcss: {processors: [require('autoprefixer')]}
  // },
  modules: {
    autoRequire: {
      "app.js": ["_app/application"]
    }
  }
}
