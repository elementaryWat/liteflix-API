const moviesRouter=require("express").Router();
const moviesController=require("../controllers/movie");
const multer=require("multer");
const crypto=require("crypto");
const path=require("path");

var storageImages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/../uploads/images')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) return cb(err);
  
        cb(null, raw.toString('hex') + path.extname(file.originalname));
      });
    }
  })
const uploadImage=multer({storage:storageImages});

moviesRouter.get("/",moviesController.getMovies);
moviesRouter.get("/:movieId",moviesController.getMovie);
moviesRouter.post("/",[uploadImage.single("avatar")],moviesController.createMovie);
moviesRouter.put("/:movieId",moviesController.updateMovie);
moviesRouter.delete("/:movieId",moviesController.deleteMovie);

module.exports=moviesRouter;
