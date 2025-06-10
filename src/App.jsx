import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './Header';
import MovieList from './MovieList';

const App = () => {
  return (
    <div className="App">
      <Header />
      <MovieList />
      <footer>© Oscar Platforms, Inc</footer>
    </div>
  )
}

export default App
