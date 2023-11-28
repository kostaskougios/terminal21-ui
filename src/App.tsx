import React from 'react';
import './App.css';
import Sessions from './sessions/Sessions';
import Terminal from './terminal/Terminal';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Terminal 21</p>
      </header>
      <aside>
        <Sessions/>
      </aside>
      <main>
        <Terminal/>
      </main>
    </div>
  );
}

export default App;
