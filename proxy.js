var http = require('http')
  , host: 'localhost'
  , port: 3000
  ;

function proxy(req, res) {
  var options = {
    hostname: host
    , port: port
    , path: req.originalUrl
    , method: req.method
    , headers: req.headers
  };

  var preq = http.request(options, function(pres) {
    res.writeHead(pres.statusCode, pres.headers);
    pres.pipe(res);
  });

  preq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.pipe(preq);
}
