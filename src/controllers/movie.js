const Movies=require("../models/movie");

function getMovie(req,res){
    var movieId=req.params.movieId;
    Movies.findById(movieId).populate({path:'album'}).exec()
    .then(movie=>{
        if(movie){
            res.status(200).send({founded:true,movie})
        }else{
            res.status(404).send({founded:false,error:"No se ha encontrado a la película"})
        }
    })
    .catch(error=>{
        res.status(500).send({founded:false,error})
    })
}

function getMovies(req,res){
    Movies.find().sort('name').exec()
    .then(movies=>{
        res.status(200).send({movies});
    })
    .catch(error=>{
        res.status(500).send({founded:false,error})
    })
}

module.exports={
    getMovie,
    getMovies
}
