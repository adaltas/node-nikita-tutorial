
module.exports = function(){
  // Get option from config if present
  if(options.config){
    if(options.config.host){ options.host = options.config.host }
    if(options.config.port){ options.port = options.config.port }
  }
  // Default options
  if(!options.host){ options.host = '127.0.0.1' }
  if(!options.port){ options.port = 6379 }
  // Do the job
  this
  .system.execute({
    header: 'Redis Check',
    relax: true,
    shy: true,
    cmd: `./redis-stable/src/redis-cli -h ${options.host} -p  ${options.port} ping`
  })
}
