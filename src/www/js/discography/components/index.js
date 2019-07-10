class ArtistList extends HTMLElement {

  // Exercise 1:
  //
  // Create a `<template>' in the index.html file that will be used to
  // display a list of all artists.  In the constructor below, fetch
  // that template and insert it into the shadow DOM.
  //
  // Your template should have a <ul> where you can insert artists in
  // the next exercise.
  constructor() {
    super();
    
    const template = document.getElementById("artists-list-template");
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Exercise 2:
  //
  // Fetch all artists from the backend and render them into the
  // template's `<ul>' element.  Start simple by just inserting the
  // the name of the artist.
  connectedCallback() {
    let self = this;
    fetch('/api/artists')
      .then( response => response.json())
      .then( artists => {
        var ul = self.shadowRoot.querySelector('.main-artists-list');
        ul.innerHTML = '';
        artists.forEach( artist => {
          const li = document.createElement("li");
          li.textContent = artist.name;
          ul.append(li);
        });
      });
  }
}

customElements.define("artist-list", ArtistList);
