import './App.css';
import * as React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import UserSide from './pages/UserSide'
import { connect } from 'react-redux';


function App(props) {
  
  
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route  path='/user' element={<UserSide/>}/>
        </Routes>
      </BrowserRouter>
    </div>
   
  );
}

const mapStateToProps = state =>{
  return {
    //state.books => 'books' in reducer's initState
    books: state.books
  }
}


export default connect(mapStateToProps)(App);
