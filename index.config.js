module.exports = {
  apps : [
      {
        name: "Starwars",
        script: "./back-end/index.js",
        watch: true,
        env: {
          "NODE_ENV": "production",
        }
      }
  ]
}