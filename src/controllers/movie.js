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
    Movies.find().sort('name')
        .exec()
        .then(movies=>{
            res.status(200).send({movies});
        })
        .catch(error=>{
            res.status(500).send({founded:false,error})
        })
}

function createMovie(req,res){
    var Movie=new Movies();
    const {name, genre_ids, poster_path} = req.body;
    Movie.name=name;
    Movie.genre_ids=genre_ids;
    Movie.poster_path=poster_path;
    Movie.save()
        .then(newMovie=>{
            if(newMovie){
                res.status(200).send({created:true, movie:newMovie})
            }else{
                res.status(500).send({created:false,error:'Ocurrio un error al intentar agregar la película a la DB'})
            }
        })
        .catch(error=>{
            res.status(500).send({created:false,error})
        })
}
function updateMovie(req,res){
    var movieId=req.params.movieId;
    var update=req.body;
    Movies.findByIdAndUpdate(movieId,{$set:update},{new:true})
    .then(movieUpdated=>{
        if(movieUpdated){
            res.status(200).send({updated:true, movie:movieUpdated})
        }else{
            res.status(404).send({updated:false,error:"No se ha encontrado la cancion"})
        }
    })
    .catch(error=>{
        res.status(500).send({updated:false,error})
    })
}

module.exports={
    getMovie,
    getMovies,
    createMovie,
    updateMovie
}
