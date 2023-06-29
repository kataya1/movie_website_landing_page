// TODO 
// create iframe only w when the watchtrailer is pressed so the background movie animation wouldn't be cluncky  done
// links :
// https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fkataya1.github.io%2Fmovie_website_landing_page%2F  i got this from chrome developer tools
// https://web.dev/preload-responsive-images/
// https://web.dev/measure/



///



// (old) make sure the image is loaded before appending it to movie-slideshow (old)
// const loadImage = (url) => new Promise((resolve, reject) => {
//     // const img = new Image();

//     const img = new Image()
//     // img.onload() // can use this instead of adding event listener for load
//     img.addEventListener('load', () => {
//         resolve(img)
//     });
//     img.addEventListener('error', (err) => reject(err));
//     img.src = url;

// });
// (new) image is loaded and decoded
const loadImage = url => {
    const img = new Image();
    img.src = url;
    return Promise.all([
        new Promise(resolve => img.addEventListener('load', resolve)), // a promise that resolves when image loads
        img.decode() // returns a promise which is resolved once the image data is ready to be used.
    ]).then(() => img); // you can use .then(img => append to dom(img)) next
}
// same as above
let loadimageEquivelant = `
// const loadImage = (url) => new Promise((resolve, reject) => {
//     const img = new Image();

//     const loadPromise = new Promise((loadResolve, loadReject) => {
//       img.addEventListener('load', () => {
//         loadResolve();
//       });
//       img.addEventListener('error', (err) => {
//         loadReject(err);
//       });
//     });

//     const decodePromise = img.decode();

//     Promise.all([loadPromise, decodePromise])
//       .then(() => {
//         resolve(img);
//       })
//       .catch((error) => {
//         reject(error);
//       });

//     img.src = url;
//   });

`

// for funcoolo
const wt = document.querySelector('#watch-trailer-button')
let wtCurrentMovie;

////
// create movie list into slideshow and add hover event listener to change background
let slshow = document.querySelector('#movie-slideshow')
let mp = document.querySelectorAll('#movie-slideshow img')


numberOfMovies = Object.keys(movieObj).length
movieArr = Object.values(movieObj)

let seedSlideshow = () => {
    slshow.innerHTML = ''
    for (let i = 0; i < numberOfMovies; i++) {
        // to make poster load first before the image is appended
        loadImage(movieArr[i].poster)
            .then(img => {
                img.addEventListener('mousedown', () => {
                    wtCurrentMovie = i
                    changeDisplayedMovie(movieArr[i])
                })
                slshow.appendChild(img)

            })
    }
}
seedSlideshow()

// 
// 
// alter between the two backgroud divs in bgs to animate background image transition
let bgs = document.querySelectorAll('.background-image')


const title = document.querySelector('#movie-title')
const minfo = document.querySelector('#movie-info')
const rd = document.querySelector('#release-date')
const ifr = document.querySelector('iframe')
const iframeCont = document.querySelector('#iframe-cont')

let changeDisplayedMovie = (imgobj) => {
    // i'm so numb right now can't thing of a better solution

    if (bgs[0].style.opacity == 1) {
        bgs[1].style.backgroundImage = `url(${imgobj.img})`;
        bgs[1].style.opacity = 1
        bgs[0].style.opacity = 0
    } else {
        bgs[0].style.backgroundImage = `url(${imgobj.img})`;
        bgs[0].style.opacity = 1
        bgs[1].style.opacity = 0
    }
    // console.log('why is this not triggering')
    title.innerText = imgobj.name
    funcoolo(false)
    localStorage.setItem('bgi', `url(${imgobj.img})`)
}
let setDefaultDisplayedMovie = (obj) => {
    changeDisplayedMovie(obj)
    wtCurrentMovie = movieArr.indexOf(obj)
}
setDefaultDisplayedMovie(movieObj['Dune'])


// 
// 
// you need to login in to watch the movie
const nav = document.querySelector('nav')
const wn = document.querySelector('#watch-now-button')
const lginbtn = document.querySelector('#log-in')
let timeOut;
let p = lginbtn.children[0]

let pReturnToNormal = () => {
    p.textContent = 'Log-in'
    lginbtn.classList.remove('js-make-visible', 'js-login-prompt')
    nav.classList.remove('js-make-visible')
}

wn.addEventListener('click', () => {

    // console.log('all good')
    lginbtn.classList.add('js-make-visible', 'js-login-prompt')
    nav.classList.add('js-make-visible')
    // console.log(lginbtn.children[0].textContent)

    p.textContent = "Sign-in to watch Here"
    timeOut = setTimeout(pReturnToNormal, 5000)
})

lginbtn.addEventListener('mouseover', () => {
    clearTimeout(timeOut)
    pReturnToNormal()
})

// 
// 
// 
// .js-make-visible
wt.addEventListener('click', (e) => {
    // e.target.style.width = "560px"
    funcoolo()
})

function funcoolo(b = true) {
    let checked = wt.getAttribute('aria-checked')
    // console.log(checked)
    // console.log('b is '+ b)
    if (checked == "false" && b) {
        // ifr.setAttribute('src', `https://www.youtube.com/embed/${movieArr[wtCurrentMovie]['trailer path']}`)
        iframeCont.innerHTML = `<iframe  src="https://www.youtube.com/embed/${movieArr[wtCurrentMovie]['trailer path']}" title="YouTube video player" frameborder="0" allow="gyroscope;" allowfullscreen></iframe>`
        wt.setAttribute('aria-checked', true)
        wt.textContent = 'Hide Trailer'
        iframeCont.classList.add('js-make-visible')

    } else {

        iframeCont.innerHTML = ''
        wt.setAttribute('aria-checked', false)
        wt.textContent = 'Watch Trailer'
        iframeCont.classList.remove('js-make-visible')
    }
}