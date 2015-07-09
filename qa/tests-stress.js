var loadtest = require('loadtest'),
    expect = require('chai').expect;

suite('Stress test', function(){
  test('Homepage should handle 30 requests in a second', function(done){
    var options = {
      url:'http://localhost:3000',
      concurrency: 4,
      maxRequests:30
    };
    loadtest.loadTest(options, function(err, result){
      expect(!err);
      expect(result.totalTimeSeconds < 1);
      done();
    });
  });
});
