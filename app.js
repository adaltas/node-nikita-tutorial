
// Dependencies
const nikita = require('nikita');
const install = require('./lib/install');
const check = require('./lib/check');
// Configuration
const config = {
  ssh: {
    host: '127.0.0.1',
    port: 22,
    private_key_path: '~/.ssh/id_rsa',
    username: process.env.USER
  },
  redis: {
    cwd: '/tmp/nikita-tutorial',
    config: {}
  }
};
// Run the application
(async () => {
  await nikita(async function() {
    await this.log.cli()
    await this.log.md({basedir: '/tmp/nikita-tutorial/log'})
    await this.ssh.open({$header: 'SSH Open'}, config.ssh)
    await this.call({$header: 'Redis Install'}, config.redis, install)
    await this.call({$header: 'Redis Check'}, config.redis, check)
    await this.ssh.close({$header: 'SSH Close'})
  })
})();
