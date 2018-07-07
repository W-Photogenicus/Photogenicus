const routes = require('express').Router();
const imagesController = require('../controllers/ImagesController');

routes.get("/gettrue", imagesController.getTrueImages, function(req, res) {
    res.send(res.locals.trueimages);
});

routes.get("/getfalse", imagesController.getFalseImages, function(req, res) {
    res.send(res.locals.falseimages);
});
  
routes.get("/getfresh", imagesController.getFreshImages, function(req, res) {
    res.send(res.locals.freshimages);
});

routes.post("/upload", imagesController.uploadImages, function(req, res) {
    if ( res.locals.uploadstatus === true )
        res.send("File uploaded!");
    else {
        res.status(500);
        res.locals.err ? res.send(res.locals.err) : res.send("Upload Failed");
    }
});

module.exports = routes;