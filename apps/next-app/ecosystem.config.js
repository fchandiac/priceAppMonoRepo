module.exports = {
  apps: [{
    name: 'PricesApp',
    script: '../../node_modules/next/dist/bin/next', // Ruta relativa a node_moduless
    args: 'start',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
