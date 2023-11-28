import React from 'react';
import './App.css';
import Sessions from './sessions/Sessions';

function App() {
  return (
    <div className="App">
      <header className="App-header"><p>Terminal 21</p></header>
      <main>
        <Sessions />
      </main>
    </div>
  );
}

export default App;
