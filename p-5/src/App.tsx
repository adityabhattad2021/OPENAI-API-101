import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";


function App() {
  return (
    <div className="App">
        <MessagesDisplay/>
        <input/>
        <CodeDisplay/>
        <div className="button-container">
          <button>Get Query</button>
          <button>Clear Chat</button>
        </div>
    </div>
  );
}

export default App;
