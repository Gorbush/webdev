// Exercise: A live chatroom!
//
// Implement a web component that renders and runs a chat component
//
// 1. Make sure your server & chat server are running
//    npm start
//    npm run chat
// 2. Chat server url: "wss://localhost:3030"
//
//
// Insert three elements in the document:
//
//   1. A <ul> where incoming messages will be appended
//
//   2. A text input where you can write chat messages
//
//   3. A submit button so you can send chat messages
//
// Edit the <chat-box> attributes in the index.html file as instructed
// and then use those attributes to connect to a chat server over
// WebSockets.  Details on how to communicate with the chat server can
// be found here:
//
//   https://github.com/pjones/wschat
//
//  TO TEST IN CLI:
// npm install -g wscat
// wscat -c ws://localhost:3030
// and send there {"user":"root","message":'test 222'}
class ChatBox extends HTMLElement {
  // Set up the shadow DOM:
  constructor() {
    super();
    const template = document.getElementById("chat_template");
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Create a new WebSocket and set up callbacks for sending and
  // receiving messages.
  //
  // If you get stuck here is an example implementation:
  //
  //   https://github.com/pjones/wschat/blob/master/examples/example.js
  connectedCallback() {
    var host = this.getAttribute("data-host");
    var userName = this.getAttribute("data-user");
    
    let ws = new WebSocket("ws://" + host);
    ws.onopen = function() {
      console.log("connected to WebSocket server");
      let messageString = JSON.stringify(messageObject, 2);
      ws.send(messageString);
      console.log("Send ping from "+userName);
    };
    ws.onmessage = function(e) {
      console.log("incoming message: " + e.data);
    };
    let messageObject = {
      user: userName,
      message: "Connected "+userName
    };
  }
}

customElements.define("chat-box", ChatBox);
