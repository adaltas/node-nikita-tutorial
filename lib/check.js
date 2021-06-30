
module.exports = async function({config}) {
  // Get option from config if present
  if(config.config){
    if(config.config.host){ config.host = config.config.host }
    if(config.config.port){ config.port = config.config.port }
  }
  // Default configs
  if(!config.host){ config.host = '127.0.0.1' }
  if(!config.port){ config.port = 6379 }
  // Do the job
  return this.execute({
    $header: 'Check',
    $relax: true,
    $shy: true,
    cwd: config.cwd,
    command: `redis-stable/src/redis-cli -h ${config.host} -p ${config.port} ping`
  })
}
