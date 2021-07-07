
const postMovie = (movie) => {
  return new Promise ((resolve, reject) => {
    //TODO:
    console.log(movie)
    movie ? resolve() : reject() //change this of course
  })
}

const postMusic = (music) => {
  return new Promise ((resolve, reject) => {
    //TODO:
    music = 'goes into a query!'
    music ? resolve() : reject() //change this of course
  })

}

module.exports = {
  postMovie: postMovie,
  postMusic: postMusic
}