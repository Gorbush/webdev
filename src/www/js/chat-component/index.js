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
// TO START SERVER:
// npm start
// npm run chat
//
//  TO TEST IN CLI:
// npm install -g wscat
// wscat -c ws://localhost:3030
// and send there {"user":"root", "message":"Test"}
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
    var opened = false;
    
    function sendMessage(msg) {
      let messageObject = {
        user: userName,
        message: msg
      };
      let messageString = JSON.stringify(messageObject, 2);
      ws.send(messageString);
    }
    ws.onopen = function() {
      console.log("connected to WebSocket server");
      opened = true;
      console.log("Send ping from "+userName);
      sendMessage("Connected "+userName);
    };
    var messages = this.shadowRoot.getElementById("messages");
    ws.onmessage = function(e) {
      console.log("incoming message: " + e.data);
      let newMessage =document.createElement("li");
      let info = JSON.parse(e.data);
      newMessage.innerHTML = `<strong>${info.user}</strong> said: ${info.message}`;
      messages.appendChild(newMessage);
    };
    
    var submit = this.shadowRoot.querySelector("input[type=submit]");
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      var messageText = this.shadowRoot.querySelector("input[type=text]");
      sendMessage(messageText.value);
    });

  }
}

customElements.define("chat-box", ChatBox);
