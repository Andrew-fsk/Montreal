let works = document.querySelectorAll(".work");

function hide(number) {
  for (let work = 0; work < works.length; work++) {
    if (work != number) {
      works[work].style.display = "none";
    }
    works[number].style.display = "block";
  }
}

hide(0);

window.onclick = function(e) {
  var elem = e ? e.target : window.event.srcElement;
  if (elem.className.includes("portfolio-btn")) {
    if (elem.value == 0) {
      hide(elem.value);
    }
    if (elem.value == 1) {
      hide(elem.value);
    }
    if (elem.value == 2) {
      hide(elem.value);
    }
    if (elem.value == 3) {
      hide(elem.value);
    }
    if (elem.value == 4) {
      hide(elem.value);
    }
  }
};
