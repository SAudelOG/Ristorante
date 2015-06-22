suite('"Home" page Tests', function(){
	test('Home page should contain link to login page', function(){
		assert($('a[href="/login"]').length);
	});
});