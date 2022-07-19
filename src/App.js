import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import React from 'react';
import cities from './cities.json';

function App() {
  return (
    <div className="App">
      <Header />
      <Main cities={cities} />
      <Footer />
    </div>
  );
}

export default App;
