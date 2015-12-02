var needle = require('needle');

var options = {
  url: 'http://localhost:4343',
  headers: {
  	'x-url': 'http://www.cnblogs.com/',
    'x-use-jquery': 'true',
    'x-crawl-script': 'cnblogs.js'
  }
};

needle.get(options.url, options, function (err, res) {
    var data = res.body.toString()
	console.log(data);
});
