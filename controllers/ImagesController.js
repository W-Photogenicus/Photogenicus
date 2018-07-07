var fs = require("fs");
var path = require("path");

const ourServerUrl = "http://localhost:5000/";
var trueImagePath = path.join(path.resolve(__dirname, ".."), "/public/true/");
var falseImagePath = path.join(path.resolve(__dirname, ".."), "/public/false/");
var freshImagePath = path.join(path.resolve(__dirname, ".."), "/public/fresh/");

const ImagesController = {

    getFreshImages(req, res, next) {
        fs.readdir(freshImagePath, function(err, images) {
          if (err) return next(err);
          let returnarr = [];
          const finalimages = images.filter( function( item ) {return item.match(/.*\.(jpg)/ig);});
          for (imagename of finalimages) {
            const fullimgurl = ourServerUrl + 'fresh/' + imagename;
            returnarr.push({ url: fullimgurl });
          }
          res.locals.freshimages = returnarr;
          return next();
        });
    },

    getTrueImages(req, res, next) {
        fs.readdir(trueImagePath, function(err, images) {
          if (err) return next(err);
          let returnarr = [];
          const finalimages = images.filter( function( item ) {return item.match(/.*\.(jpg)/ig);});
          for (imagename of finalimages) {
            const fullimgurl = ourServerUrl + 'true/' + imagename;
            returnarr.push({ url: fullimgurl });
          }
          res.locals.trueimages = returnarr;
          return next();
        });
    },
    
    getFalseImages(req, res, next) {
        fs.readdir(falseImagePath, function(err, images) {
          if (err) return next(err);
          let returnarr = [];
          const finalimages = images.filter( function( item ) {return item.match(/.*\.(jpg)/ig);});
          for (imagename of finalimages) {
            const fullimgurl = ourServerUrl + 'false/' + imagename;
            returnarr.push({ url: fullimgurl });
          }
          res.locals.falseimages = returnarr;
          return next();
        });
    },

    uploadImages(req, res, next) {
      if (!req.files) return res.status(400).send("No files were uploaded.");

      let sampleFile = req.files.sampleFile;
      const filename = Math.floor(Math.random() * (100000 - 2) + 2);
      sampleFile.mv(freshImagePath + "/" + filename + ".jpg", function(err) {
        if (err) {
          res.locals.uploadstatus = false;
          res.locals.err = err;
          console.log(err);
        }
        else res.locals.uploadstatus = true;
        return next();
      });
  },

};

module.exports = ImagesController;