
module.exports = async function({config}) {
  // Default configs
  if(!config.url){ config.url = 'http://download.redis.io/redis-stable.tar.gz' }
  if(!config.config){ config.config = {} }
  if(!config.config['bind']){ config.config['bind'] = '127.0.0.1' }
  if(!config.config['daemonize']){ config.config['daemonize'] = 'yes' }
  if(!config.config['protected-mode']){ config.config['protected-mode'] = 'yes' }
  if(!config.config['port']){ config.config['port'] = 6379 }
  // Do the job
  await this.file.download({
    $header: 'Download',
    source: config.url,
    target: `${config.cwd}/cache/redis-stable.tar.gz`
  })
  await this.execute({
    $header: 'Compilation',
    $unless_exists: `${config.cwd}/redis-stable/src/redis-server`,
    cwd: config.cwd,
    command: `
    tar xzf cache/redis-stable.tar.gz
    cd redis-stable
    make
    `
  })
  await this.file.properties({
    $header: 'Configuration',
    target: `${config.cwd}/conf/redis.conf`,
    separator: ' ',
    content: config.config
  })
  await this.execute({
    $header: 'Startup',
    cwd: config.cwd,
    code_skipped: 3,
    command: `
    redis-stable/src/redis-cli ping && exit 3
    nohup redis-stable/src/redis-server conf/redis.conf &
    `
  })
}
