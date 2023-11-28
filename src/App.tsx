import React from 'react';
import './App.css';
import Sessions from './sessions/Sessions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Header</p>
      </header>
      <aside>
        <Sessions/>
      </aside>
    </div>
  );
}

export default App;
