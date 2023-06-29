// asynchronous image loading but i found out 
//  the original function was already loading the images in parallel since it's synchronous and it doesn't wait for the promise (loadImage) to resolve before calling another
// the original function appended the poster to the page if it loaded while this one will have to wait for all to finish
// the original was unintentially better. and if i add a then inside promise.all to append the image then what was the use of promise.all 
movieArr = Object.values(movieObj)

let seedSlideshow = () => {
    slshow.innerHTML = ''
    Promise.all(
        movieArr.map(
            (movie) =>
                loadImage(movie.poster)
                    .catch(err => console.log)
        )
    ).then(imgs => {
        imgs.forEach((img, i) => {
            img.addEventListener('mousedown', () => {
                wtCurrentMovie = i
                changeDisplayedMovie(movieArr[i])
            })
            slshow.appendChild(img)
        });
    })
}
seedSlideshow()
