import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ delay: 1 })
  tl.to(".preloader", {
    opacity: 0,
    ease: "power3.out",
    duration: 1,
  })

  tl.to(".preloader", {
    display: "none",
    duration: 0,
  })

  tl.from("h1", {
    y: 100,
    opacity: 0
  })

  tl.from(".mouse-scroll", {
    y: 50,
    opacity: 0
  })
})

gsap.to(".bg-image", {
  y: 200,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    scrub: true
  }
})


const images = gsap.utils.toArray(".image img")
images.forEach(image => {
  gsap.to(image, {
    y: 200,
    scrollTrigger: {
      trigger: image.parentElement,
      scrub: true,
    }
  })
})

const titles = gsap.utils.toArray("h2")
titles.forEach(title => {
  gsap.from(title, {
    y: 100,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: title,
    }
  })
})

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


const tracker = document.querySelector(".tracker")

let scrollAmmount = 0
let yPos = 0
let xPos = 0

function mouseTracker() {
  scrollAmmount = window.scrollY + yPos
  tracker.style.top = `${scrollAmmount}px`
  tracker.style.left = `${xPos}px`
}

window.addEventListener("mousemove", (e) => {

  setTimeout(() => {
    yPos = e.clientY - tracker.offsetHeight / 2
    xPos = e.clientX - tracker.offsetWidth / 2
    mouseTracker()
  }, 100)
})

window.addEventListener("scroll", () => {
  mouseTracker()
})


const links = document.querySelectorAll("a")
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    tracker.style.display = "none"
  })

  link.addEventListener("mouseleave", () => {
    tracker.style.display = "block"
  })
})

if("ontouchstart" in window || navigator.maxTouchPoints) {
  tracker.style.display = "none"
}