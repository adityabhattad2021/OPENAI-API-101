import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";
import { useState } from "react";

interface ChatData {
  role: string,
  content: string,
}

function App() {

  const [value, setValue] = useState<string>("");
  const [recievedQueries, setRecievedQueries] = useState<ChatData[]>([]);

  async function getQuery() {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/generate`, options);
      const data = await response.json();
      console.log(data);
      const userMessage = {
        role: "user",
        content: value
      }
      setRecievedQueries(oldQueries => [...oldQueries, data, userMessage])
    } catch (error) {
      console.log(error);
    }
  }

  function clearChat() {
    setRecievedQueries([])
    setValue('');
  }

  const filteredMessages = recievedQueries.filter(messages => messages.role === "user");
  const latestCode = recievedQueries.filter(message => message.role === "assistant").pop();

  return (
    <div className="App">
      <MessagesDisplay userMessages={filteredMessages} />
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <CodeDisplay text={latestCode?.content || ""} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>Get Query</button>
        <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  );
}

export default App;
