module.exports = {
  apps: [
    {
      name: 'unicamp_server',
      script: './server/dist/index.js',
      ignore_watch: ['./server/node_modules', './server/public', './client'],
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
