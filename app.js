var http = require('http');
var url = require('url');
var router = require('./router');

var server = http.createServer(function (req, res) {
  console.log(req.url);
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end();
    return;
  }
  var path = url.parse(req.url).pathname;
  var currentRoute = router.match(path);
  if (currentRoute) {
    currentRoute.fn(req, res, currentRoute);
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('404 on app.js');
  }
});

server.listen(9000, function (err) {
  if (err) console.log('busted', err);
  console.log('Yup, server on 9000');
})
