import logo from "./logo.svg";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");

  async function getMessages() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
        prevChats:currentChat
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      // console.log(data.choices[0].message.content);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
  }

  function createNewChat() {
    setMessage(null);
    setValue("");
    setCurrentTitle("");
  }

  function handleTitleClick(uniqueTitle){
    setCurrentTitle(uniqueTitle)
    setMessage(null);
    setValue("");
  }

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [currentTitle, message]);

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );
  const uniqueTitle = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitle?.map((uniqueTitle, index) => (
            <li key={index} onClick={()=>handleTitleClick(uniqueTitle)}>{uniqueTitle}</li>
          ))}
        </ul>
        <nav>Made by Aditya.</nav>
      </section>
      <section className="main">
        {!currentTitle && <h1 className="title">reactGPT</h1>}

        <ul className="feed">
          {currentChat?.map((chatMessage, index) => {
            return (
              <li key={index}>
                <p className="role">{chatMessage?.role}</p>
                <p>{chatMessage?.content}</p>
              </li>
            );
          })}
        </ul>

        <div className="botton-section">
          <div className="input-container">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div id="submit" onClick={getMessages}>
              &#10148;
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
