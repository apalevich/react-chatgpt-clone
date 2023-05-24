function App() {
  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history"></ul>
        <nav>
          <p>Made by Artyom</p>
        </nav>
      </section>
      <section className="main">
        <h1>ArtyomGPT</h1>  
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input/>
            <div id="submit">Send</div>
          </div>
          <p className="info">
            Chat GPT. Free Research Preview.
            Made as a student project and not for the business purpose.
          </p>
        </div>
      </section>      
    </div>
  );
}

export default App;
