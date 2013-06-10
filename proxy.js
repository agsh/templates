var http = require('http')
  , host: 'localhost'
  , port: 3000
  ;

function proxy(req, res) {
	var options = {
		hostname: 'localhost'
		, port: 3000
		, path: req.path
		, method: req.method
		, headers: req.headers
	};

	var preq = http.request(options, function(pres) {
		pres.pipe(res);
	});

	preq.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	req.pipe(preq);
}
