var http = require('http'),
    httpProxy = require('http-proxy');


if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
//  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  //console.log(req.url); 
  
  if (req.url.startsWith('/api/') || req.url.startsWith('/auth/')) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:4000'
    });
  } else {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3000'
    });
  }
  
  
  
});

proxy.on('open', function (proxySocket) {
  // listen for messages coming FROM the target here
  proxySocket.on('data', hybiParseAndLogMessage);
});


proxy.on('close', function (req, socket, head) {
  // view disconnected websocket connections
  console.log('Client disconnected');
});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});

console.log("listening on port 1337")
server.listen(1337);
