const moviesRouter=require("express").Router();
const moviesController=require("../controllers/movie");

moviesRouter.get("/",moviesController.getMovies);
moviesRouter.get("/:movieId",moviesController.getMovie);
moviesRouter.post("/",moviesController.createMovie);
moviesRouter.put("/:movieId",moviesController.updateMovie);

module.exports=moviesRouter;
