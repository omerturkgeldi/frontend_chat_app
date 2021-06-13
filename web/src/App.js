import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    // socketRef.current = io.connect("http://localhost:4000");
    socketRef.current = io.connect(
      "https://murmuring-mountain-20587.herokuapp.com/"
    );
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
      var elem = document.getElementsByClassName("scroll")[0];
      elem.scrollTop = elem.scrollHeight;
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  // chat.map(({ name, message }, index) => {
  //   name == state.name ? console.log("xxx") : console.log("yyy");
  //   return (
  //     <div className="message__area" key={index}>
  //       <h5>
  //         <span className="message__area__name">{name}: </span>
  //         <span className="message__area__text">{message}</span>
  //       </h5>
  //     </div>
  //   );
  // });

  const renderChat = () => {
    const currentUser = state.name;
    return chat.map(({ name, message }, index) => (
      <>
        {currentUser == name ? (
          <div className="message__area__self" key={index}>
            <h5>
              <span className="message__area__name">{name}: </span>
              <span className="message__area__text">{message}</span>
            </h5>
          </div>
        ) : (
          <div className="message__area" key={index}>
            <h5>
              <span className="message__area__name">{name}: </span>
              <span className="message__area__text">{message}</span>
            </h5>
          </div>
        )}
      </>
    ));
  };

  return (
    <div className="app">
      <div className="container app_body">
        <div className="row">
          <div className="col-12  chat__area order-1">
            <h1 className="chat__title">Live Chat</h1>
            <div className="scroll">{renderChat()}</div>
          </div>

          <div className="col-12 input__area order-2">
            <form onSubmit={onMessageSubmit} class="container">
              <div className="row ">
                {/* NAME AREA */}
                <div className="input__name__area col-lg-4">
                  <input
                    className="form-control name-field"
                    name="name"
                    type="text"
                    onChange={(e) => onTextChange(e)}
                    value={state.name}
                    placeholder="Name"
                  />
                </div>
                {/* MESSAGE AREA */}
                <div className="input__message__area col-lg-6">
                  <input
                    class="form-control"
                    placeholder="Type a message"
                    type="text"
                    name="message"
                    onChange={(e) => onTextChange(e)}
                    value={state.message}
                  ></input>
                </div>

                {/* BUTTON AREA */}
                <div className="input__button__area col-lg-2 ">
                  <button id="sendButton" className="btn btn-danger">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

/* <div class="col-lg-3 col-lg-pull-9 form">
            <h1>form</h1>
          </div>
          <div class="col-lg-9 col-lg-push-3 chat">
            <h1>chat</h1>
          </div> */
