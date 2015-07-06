var routes = require('routes')();
var db = require('monk')('localhost/laptops');
var laptops = db.get('laptops');
var fs = require('fs');
var view = require('./view');
var qs = require('qs');
var task = {};

routes.addRoute('/laptops', (req, res, url) => {
  res.setHeader('Content-Type', 'text/html');
  if (req.method === 'GET') {
    laptops.find(task, (err, docs) => {
      if (err) res.end('404 on index');
      var template = view.render('laptops/index', {laptops: docs, pageTitle: 'Movies index'});
      res.end(template);
    });
  }
  if (req.method === 'POST') {
      console.log('inside index post');
    var data = ''

    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', function () {
      var laptop = qs.parse(data)
      console.log(laptop);
      laptops.find(laptop, (err, doc) => {
        if (err) res.end('error displaying');
        res.writeHead(302, {'Location': '/laptops'});
        res.end()
      })
    })
  }
});

routes.addRoute('/laptops/out', (req, res, url) => {
  if (req.method === 'POST') {
    task = {checkedout: true}
    laptops.find(task, (err, docs) => {
      console.log(docs);
      if (err) res.end('error loading docs');
      res.writeHead(302, {'Location': '/laptops'});
      res.end();
    });
  }
});

routes.addRoute('/laptops/available', (req, res, url) => {
  if (req.method === 'POST') {
    task = {checkedout: false}
    laptops.find(task, (err, docs) => {
      if (err) res.end('error loading docs');
      res.writeHead(302, {'Location': '/laptops'});
      res.end();
    });
  }
});

routes.addRoute('/laptops/all', (req, res, url) => {
  if (req.method === 'POST') {
    task = {}
    laptops.find(task, (err, docs) => {
      if (err) res.end('error loading docs');
      res.writeHead(302, {'Location': '/laptops'});
      res.end();
    });
  }
});

module.exports = routes;
