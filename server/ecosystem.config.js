module.exports = {
  apps: [
    {
      name: 'unicamp_server',
      script: './dist/index.js',
      ignore_watch: ['./node_modules'],
      watch: true,
      instances: 2,
      exec_mode: 'cluster',
      increment_var: 'PORT',
      node_args: ['-r dotenv/config'],
      env: {
        PORT: 3030,
        NODE_ENV: 'production',
      },
    },
  ],
};
