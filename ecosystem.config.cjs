module.exports = {
  apps: [
    {
      name: 'caiwugongju',
      script: 'server/start.js',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
        PORT: Number(process.env.PORT || 4008),
        DATA_DIR: process.env.DATA_DIR || './data',
        BACKUP_DIR: process.env.BACKUP_DIR || './backups'
      },
      max_memory_restart: '384M'
    }
  ]
};
