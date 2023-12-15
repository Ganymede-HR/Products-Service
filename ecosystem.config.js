module.exports = {
  apps: [{
    name: 'Products API Service',
    script: 'index.js',
    env: {
      NODE_ENV: 'development',
      // port: 3000,
    },
    env_production: {
      NODE_ENV: "production",
      // port: 80,
    },
    watch: '.'
  }],
};
