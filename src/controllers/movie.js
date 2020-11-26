const Movies=require("../models/movie");
const path=require("path");
const fs=require("fs");

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

function getImageMovie(req,res){
    const imageName=req.params.imageName;
    const imagePath="./uploads/images/"+imageName;
    fs.exists(imagePath,(exists)=>{
        if(exists){
            res.status(200).sendFile(path.resolve(imagePath));
        }else{
            res.status(404).send({founded:false,error:"Image no encontrada"});
        }
    })
}

function createMovie(req,res){
    if(!req.file){
        return res.status(500).send({uploaded:false});
    }else{
        var Movie=new Movies();
        const {name, genre_ids} = req.body;
        Movie.name=name;
        Movie.genre_ids=genre_ids;
        Movie.poster_path=req.file.filename;
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

function deleteMovie(req,res){
    var movieId=req.params.movieId;
    Movies.findByIdAndRemove(movieId)
    .then(movieRemoved=>{
        if(movieRemoved){
            res.status(200).send({deleted:true,movie:movieRemoved})
        }else{
            res.status(404).send({deleted:false,error:"No se encontro la película"})
        }
    })
    .catch(error=>{
        res.status(500).send({deleted:false,error})
    })
}

module.exports={
    getMovie,
    getImageMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
}
