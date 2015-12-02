function crawl() {
	var result = [];
	$('a.titlelnk').each(function () {
		result.push({
			'title': $(this).text(),
			'link': $(this).attr('href')
		});
	});
	return result;
}