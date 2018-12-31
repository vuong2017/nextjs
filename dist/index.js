"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _next = _interopRequireDefault(require("next"));

var _helmet = _interopRequireDefault(require("helmet"));

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = parseInt(process && process.env && process.env.PORT || undefined, 10) || 3100;
var dev = (process && process.env && process.env.NODE_ENV || "development") !== 'production';
var app = (0, _next.default)({
  dev: dev
});

var handler = _routes.default.getRequestHandler(app);

app.prepare().then(function () {
  var server = (0, _express.default)();
  server.use((0, _helmet.default)());
  server.use((0, _compression.default)());

  var staticPath = _path.default.join(__dirname, '../static');

  server.use('/static', _express.default.static(staticPath, {
    maxAge: '30d',
    immutable: true
  }));
  server.get('*', function (req, res) {
    return handler(req, res);
  });
  startServer();

  function startServer() {
    server.listen(port, function () {
      console.log("> Ready on http://localhost:".concat(port));
    });
  }
});