import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);

  const getMessages = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: value,
      })
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats(previousChats => {
        return [
          ...previousChats, 
          {
            title: currentTitle,
            role: "user",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      })
    }
  }, [message, currentTitle]);

  console.log(previousChats);

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
        <h1>{ currentTitle || 'ArtyomGPT' }</h1>  
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>Send</div>
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
