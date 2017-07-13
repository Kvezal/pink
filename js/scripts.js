var mainNav = document.querySelector(".main-nav");
var btn = mainNav.querySelector(".main-nav__toggle");
var logoItem = mainNav.querySelector(".main-nav__item");
var mainNavList = mainNav.querySelector(".main-nav__list");



mainNav.classList.remove("main-nav--nojs");
mainNavList.classList.remove("main-nav__list--nojs");
btn.classList.remove("main-nav__toggle--nojs");
logoItem.classList.remove("main-nav__item--nojs")



btn.addEventListener("click", function(event) {
  event.preventDefault("main-nav__list--nojs");

  if (mainNav.classList.contains("main-nav--open")) {
    mainNav.classList.remove("main-nav--open");
    logoItem.classList.add("main-nav__item--logo-open");
    btn.classList.remove("main-nav__toggle--open");
  } else {
    mainNav.classList.add("main-nav--open");
    logoItem.classList.remove("main-nav__item--logo-open");
    btn.classList.add("main-nav__toggle--open");
  }
})
