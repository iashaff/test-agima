import './style.scss'
import {article} from './data.js'

let activeArticle = 0
const sliderPlace = document.querySelector('.gallery')
const nextBtn = document.getElementById('next-btn')
const prevBtn = document.getElementById('previous-btn')
const closeBtn = document.getElementById('close-btn')
const openBtn = document.getElementById('open-btn')
const menuFull = document.getElementById('open-menu')
const menu = document.getElementById('close-menu')
const container = document.querySelector('.main-container')

/* pgrogress Bar */

const progressBar = () => {
    let scroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = scroll / height * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', progressBar)


/* Menu active*/

closeBtn.addEventListener('click', () => {
    closeBtn.style.display = 'none'
    menuFull.style.display = 'none'
    openBtn.style.display = 'block'
    menu.style.display = 'block' 
    if(window.innerWidth >= 1280){
        container.classList.remove('toggle-min')
        sliderPlace.classList.remove('toggle-min')
        container.classList.add('toggle-max')
        sliderPlace.classList.add('toggle-max')
     } else {
         container.style.maxWidth = window.innerWidth
         sliderPlace.style.maxWidth = window.innerWidth 
    }
})


openBtn.addEventListener('click', () => {
    closeBtn.style.display = 'block'
    menuFull.style.display = 'block'
    openBtn.style.display = 'none'
    menu.style.display = 'none'
    if(window.innerWidth >= 1280){
         container.classList.add('toggle-min')
         sliderPlace.classList.add('toggle-min')
         container.classList.remove('toggle-max')
         sliderPlace.classList.remove('toggle-max')
     } else {
         container.style.maxWidth = window.innerWidth
         sliderPlace.style.maxWidth = window.innerWidth
     }
})
 
 window.addEventListener('resize', (event) => {
    if(innerWidth <= 1279){
        container.classList.remove('toggle-max')
        sliderPlace.classList.remove('toggle-max')
        document.querySelector(' .gallery div').style.maxWidth = innerWidth
    }
 }, true)

/* active menu during scroll */

const activeMenuScroll = () => {

  document.querySelectorAll('.article-items').forEach((elem) => {
    let menuLink = document.querySelector(`.menu-item[href="#${elem.id}"]`);
    if(window.scrollY >= elem.offsetTop && window.scrollY <  elem.offsetTop + elem.offsetHeight) {
        menuLink.classList.add('active')
    } else {
        menuLink.classList.remove('active')
    }
  })
}
window.addEventListener('scroll', activeMenuScroll)

/* slider */ 

const createEl = (val) => {

     /* create elements for slider item*/

     const div = document.createElement('div')
     const img = document.createElement('img')
     const title = document.createElement('h2')
     const paragraph = document.createElement('p')
     
     /* Inner content for items */
     
     title.textContent = article[val].title
     img.src = article[val].src
     img.alt = article[val].alt
     paragraph.textContent = article[val].content
 
      /* Adding elemetns into DOM */
 
     div.append(img, title, paragraph)
     sliderPlace.append(div)
}

const initSlider  = () => {
    createEl(activeArticle)

    nextArticleGen()
    prevArticleGen()
}

const nextArticleGen = () =>{
    let nextArticle = activeArticle + 1;
    if (nextArticle >= article.length){
        nextArticle = 0
    }
        createEl(nextArticle)
}

const prevArticleGen = () => {

    let prevArticle = activeArticle - 1;
    if(prevArticle < 0){
        prevArticle  = article.length - 1;
    }
        /* create elements for slider item*/

     const div = document.createElement('div')
     const img = document.createElement('img')
     const title = document.createElement('h2')
     const paragraph = document.createElement('p')
     
     /* Inner content for items */
    
     title.textContent = article[prevArticle].title
     img.src = article[prevArticle].src
     img.alt = article[prevArticle].alt
     paragraph.textContent = article[prevArticle].content
 
      /* Adding elemetns into DOM */
 
     div.append(img, title, paragraph)
     sliderPlace.prepend(div)
}

const nextSlide = () => {
    activeArticle++;
    if(activeArticle >= article.length) {
        activeArticle = 0
    }
    document.querySelector('.gallery div').remove()
    nextArticleGen()
}

const prevSlide = () => {
    activeArticle--;
    if(activeArticle < 0){
        activeArticle = article.length - 1
    }
    document.querySelector('.gallery div:last-child').remove()
    prevArticleGen()
}

initSlider()


nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide)

