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
    </div>
  )
}

export default App
