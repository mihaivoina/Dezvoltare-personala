import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Questions from './questionsComponent/questions';
import Header from './header/header';

function App() {
  return (
    <>
    <Header />
      <Questions />
  </>
  );
}

export default App;
