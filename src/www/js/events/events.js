// In the index.html file there are several elements containing the
// text "Click Me".  Those elements are followed by another element
// containing the number zero, which we'll call the "counter".
//
// Below, write the necessary code so that clicking any "Click Me"
// element will increment its paired counter.
//
// BONUS 1: Create a new element on the page that displays the sum of
// all other counters.
//
// BONUS 2: When the global counter goes above 10 add the "goal" class
// to it.  Doing so should make it turn red.


// Your code here.
var body = document.getElementsByTagName("body");

body[0].addEventListener("click", clickHandler);

function incGlobalCounter() {
  var global_counter = document.getElementById("global_counter");
  global_counter.innerText++;
  var counterValue = parseInt(global_counter.innerText);
  if (counterValue > 10) {
    global_counter.classList.add("goal");
  }
}

function clickHandler (event) {
    // if (event.target.tagName === 'BUTTON') {
    if (event.target.innerText && event.target.innerText.toLowerCase() === 'click me') {
        var pairedCounter = event.target.nextElementSibling;
        pairedCounter.innerText++;
        
        incGlobalCounter();
        event.preventDefault();
    }
}
