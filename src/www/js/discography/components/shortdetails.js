class ArtistShortDetail extends HTMLElement {

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
    const template = document.getElementById("artists-detail-template");
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
    shadowRoot.querySelector(".artist-year").innerHTML = 'artName';
    shadowRoot.querySelector(".artist-name").innerHTML = '2222';
  }
}

customElements.define("artist-short-detail", ArtistShortDetail);
