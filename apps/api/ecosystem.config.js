module.exports = {
    apps : [{
      name: 'PricesApi',
      script: 'main.js',
      watch: true,
      ignore_watch: ["node_modules", "public"],
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  };