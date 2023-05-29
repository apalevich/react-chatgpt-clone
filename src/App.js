import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState('');
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');

  const submitHandler = () => {
    setPreviousChats(previousChats => [
      ...previousChats,
      {
        content: value,
        role: 'user',
      },
    ]);
  };

  const getMessages = async () => {
    if (!previousChats.length) return false;
    if (previousChats[previousChats.length-1].role === 'assistant') return false;

    if (!currentTitle && value) {
      setCurrentTitle(value);
    }

    const options =  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: previousChats
      })
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setPreviousChats((previousChats => [
        ...previousChats,
        data.choices[0].message
      ]));
      console.log('data', data);
    } catch (error) {
      console.error(error)
    }
  }

  // const uniqueTitles = Array.from(new Set())

  useEffect(() => {
    getMessages();
  }, [previousChats]);

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history">
          BLAH
        </ul>
        <nav>
          <p onClick={() => {console.log('previousChats', previousChats)}}>Made by Artyom</p>
        </nav>
      </section>
      <section className="main">
        <h1>{ currentTitle || 'ArtyomGPT' }</h1>  
        <ul className="feed">
          { previousChats?.map((chat, idx) => <li key={idx} className={chat.role}>{chat.content}</li>) }
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={submitHandler}>Send</div>
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
