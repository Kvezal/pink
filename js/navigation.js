'use strict';

(function () {
  var menu = document.querySelector(".main-nav");
  var btn = menu.querySelector(".main-nav__toggle");
  var logoItem = menu.querySelector(".main-nav__item");
  var menuList = menu.querySelector(".main-nav__list");

  menu.classList.remove("main-nav--nojs");
  menuList.classList.remove("main-nav__list--nojs");
  btn.classList.remove("main-nav__toggle--nojs");
  logoItem.classList.remove("main-nav__item--nojs");

  btn.addEventListener("click", function(event) {
    event.preventDefault("main-nav__list--nojs");

    if (menu.classList.contains("main-nav--open")) {
      menu.classList.remove("main-nav--open");
      logoItem.classList.add("main-nav__item--logo-open");
      btn.classList.remove("main-nav__toggle--open");
    } else {
      menu.classList.add("main-nav--open");
      logoItem.classList.remove("main-nav__item--logo-open");
      btn.classList.add("main-nav__toggle--open");
    }
  })
})();




