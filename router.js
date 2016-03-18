module.exports = function (app) {
    app.get('/', function(req //request
      , res //response
      , next) {
          res.send(['a', 'b', 'c']);
    });
}
