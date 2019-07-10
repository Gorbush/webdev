class ArtistDetail extends HTMLElement {

  // Exercise 3:
  //
  // Create a template for displaying a single artist.  The template
  // should use slots to display the name of the artist as well as the
  // formation year.
  //
  // When you are done, go back to the `index.js' component and have
  // it create `<artist-detail>' elements with the correct slots.
  constructor() {
    super();
    const template = document.getElementById("artist-detail-template");
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Bonus Exercise:
  //
  // Fetch all of the albums for artist and display them.
  //
  // Example URL for artist 2:
  //
  //   /api/artists/2/albums
  //
  // For an example, see: http://localhost:3000/js/demo/
  connectedCallback() {
    let self = this;
    let userId = self.getAttribute("data-id");
    fetch(`/api/artists/${userId}/albums`)
      .then( response => response.json())
      .then( albums => {
        var ul = self.shadowRoot.querySelector('.albums');
        ul.innerHTML = '';
        albums.forEach( album => {
          const li = document.createElement("li");
          li.textContent = album.name;
          ul.append(li);
        });
      });

  }
}

customElements.define("artist-detail", ArtistDetail);
