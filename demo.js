var needle = require('needle');
var cheerio = require('cheerio');

needle.get('http://www.cnblogs.com/', function (err, res, body) {
	$ = cheerio.load(body);
	var result = [];
	$('a.titlelnk').each(function () {
		result.push({
			'title': $(this).text(),
			'link': $(this).attr('href')
		});
	});

	console.log(JSON.stringify(result, null, '  '));
});