let movieObj = {
    // 'The Batman':{
    //     name:'The Batman',
    //     poster:'./assets/posters/batman.jpg',
    //     img: './assets/movimages/batman.jpg',
    //     genre:['Action','Adventure'],
    //     'release date': 2021,
    // trailer:'https://youtu.be/NLOp_6uPccQ' ,
    // },
    'Black Widow': {
        name: 'Black Widow',
        poster: './assets/posters/blackwidow.jpg',
        img: './assets/movimages/blackwidow.jpeg',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': 'ybji16u608U',

    },
    'Dune': {
        name: 'Dune',
        poster: './assets/posters/dune.jpg',
        img: './assets/movimages/dune.jpg',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': 'n9xhJrPXop4',
    },
    'Shang-Chi': {
        name: 'Shang-chi',
        poster: './assets/posters/changchi.webp',
        img: './assets/movimages/changchi.webp',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': '8YjFbMbfXaQ',
    },
    'Godzilla vs Kong': {
        name: 'Godzilla vs Kong',
        poster: './assets/posters/godzillavkong.jpg',
        img: './assets/movimages/godzillavkong.jpg',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': 'odM92ap8_c0',
    },
    'Mortal Kombat': {
        name: 'Mortal Kombat',
        poster: './assets/posters/mortalkombat.jpg',
        img: './assets/movimages/mortalkombat.jpeg',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': 'NYH2sLid0Zc',

    },
    'Raya': {
        name: 'Raya and the Last Dragon',
        poster: './assets/posters/raya.jpg',
        img: './assets/movimages/raya.jpg',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': '1VIZ89FEjYI',

    },
    'Suicide Squad': {
        name: 'Suicide Squad 2',
        poster: './assets/posters/ss.webp',
        img: './assets/movimages/ss.jpg',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': 'Z1EbSXxrZ34',

    },
    'The Tomorrow War': {
        name: 'The Tomorrow War',
        poster: './assets/posters/tomwars.jpg',
        img: './assets/movimages/tomorrowwars.webp',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': 'QPistcpGB8o',

    },
    'Venom': {
        name: 'Venom 2',
        poster: './assets/posters/venom.jpg',
        img: './assets/movimages/venom2.jpg',
        genre: ['Action', 'Adventure'],
        'release year': 2021,
        'trailer path': '-FmWuCgJmxo',
    },

}


// TODO 
// create iframe only w when the watchtrailer is pressed so the background movie animation wouldn't be cluncky  done
// links :
// https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fkataya1.github.io%2Fmovie_website_landing_page%2F  i got this from chrome developer tools
// https://web.dev/preload-responsive-images/
// https://web.dev/measure/



///
// make sure the image is loaded before appending it to movie-slideshow
const loadImage = (url) => new Promise((resolve, reject) => {
    // const img = new Image();
    const img = document.createElement('img')
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
});

// for funcoolo
const wt = document.querySelector('#watch-trailer-button')
let wtCurrentMovie ;

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