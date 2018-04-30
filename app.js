
// Configuration
options = {
  ssh: {
    host: '127.0.0.1',
    port: '22',
    username: process.env.USER,
    private_key_path: '~/.ssh/id_rsa'
  },
  redis: {
    cwd: '/tmp/nikita-tutorial',
    config: {}
  }
}
// Run the application
require('nikita')
.log.cli()
.log.md()
.ssh.open({header: 'SSH Open'}, options.ssh)
.call({header: 'Redis Install'}, './lib/install', options.redis)
.call({header: 'Redis Check'}, './lib/check', options.redis)
.ssh.close({header: 'SSH Close'})
