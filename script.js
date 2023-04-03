//--DOM ELEMENTS--//
const dogImage = document.getElementById("pic1")
const catImage = document.getElementById("pic2")
//--FETCH FUNCTIONS--//
const fetchFrom = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  }
  catch (error) {
    console.log(error);
    return null;
  }
}
//--DOG FETCH--//
const getDogImg = async () => {
  const url = "https://dog.ceo/api/breeds/image/random";

  const data = await fetchFrom(url);
  if (data !== null) {
    // do stuff with the data!
    console.log(data)
    const dogSrc = data.message
    dogImage.src = dogSrc
    console.log(data.message);
  }
}
getDogImg()
//--CAT FETCH--//
const getCatImg = async () => {
  const url = "https://api.thecatapi.com/v1/images/search";

  const data = await fetchFrom(url);
  if (data !== null) {
    // do stuff with the data!
    console.log(data)
    const catSrc = data[0].url
    catImage.src = catSrc
    console.log(data[0].url);
  }
}
getCatImg()

//--FUNCTION FOR CAROUSEL--//
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("item-slide");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
}
//--CREATED STICKY--//
window.onscroll = function () { myFunction() };

// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}