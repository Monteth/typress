import express from'express';
const IndexController = express.Router();

IndexController.get('/', function(req, res, next) {
  res.send( "{ title: 'Express' }");
});

export default IndexController;
