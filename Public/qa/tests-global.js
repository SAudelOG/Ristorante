suite('Global Tests', function(){
	test('Page has valid Title', function(){
		assert(document.title && document.title.match(/\S/) && 
							document.title.toUpperCase() !== 'TODO');
	});
});