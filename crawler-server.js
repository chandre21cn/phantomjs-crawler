var server = require('webserver').create(),
    system = require('system'),
    port     = system.env.PORT || 8080;

function main() {
    if (system.args.length < 2) {
        console.log('Usage: phantomjs crawler-server.js <some port>');
        phantom.exit(1);
    } else {
        port = system.args[1];
        var listening = server.listen(port, handleRequest);
        if (!listening) {
            console.log("could not create web server listening on port " + port);
            phantom.exit();
        }
        console.log('crawler-server started at: ' + port);
    }
}

function handleRequest(req, res) {
	var headers = req.headers;
    var targetUrl = headers['x-url'];
    var page = new WebPage();
    page.viewportSize = { width: 1024, height: 800 };
    
    page.onLoadFinished = function (status) {
        var result = null;
        var jsFile = headers['x-crawl-script'];
    	if ('x-use-jquery' in headers) {
	    	page.injectJs('jquery.js');
    	} 
        page.injectJs(jsFile);
        var result = page.evaluate(function () { return crawl(); });
        page.close();

        res.write(JSON.stringify(result, null, '  '));
        res.statusCode = 200;
        res.close();
    }

    page.open(targetUrl);
    console.log('request ' + targetUrl);
}

main();
