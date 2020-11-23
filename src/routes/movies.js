const moviesRouter=require("express").Router();
const moviesController=require("../controllers/movie");

moviesRouter.get("/",moviesController.getMovies);
moviesRouter.get("/:movieId",moviesController.getMovie);

module.exports=moviesRouter;
