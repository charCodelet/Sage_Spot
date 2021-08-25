import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import LoginModal from './components/LoginModal';
import MainNavigation from './components/MainNavigation';
import './App.css';

function App() {
  const [error, setError] = useState<boolean>(false);
  const [token, setToken] = useState('');
  const [photo, setPhoto] = useState('');

  const clearError = () => { 
    setError(false);
  };

  const clearPhoto = () => { 
    setPhoto('');
  };

  const handleClick = (e: any) => {
    setError(true)
  }

  const handleToken = token => {
    setToken(token)
  }

  const handlePhoto = photo => {
    setPhoto(photo)
  }

  let routes: {};
  if (token) {
      routes = (
        <Switch>
          <Route path="/login" exact>        
            <MainNavigation /*error2={photo}*/ token={token} photoIndex={photo} onClear={clearPhoto} handlePhoto={handlePhoto}/>            
          </Route>     
          <Redirect to="/login" />
        </Switch>
      );
    console.groupEnd();
  } 
  else {
    routes = (
      <div className="App">
        <LoginModal error={error} onClear={clearError} handleToken={handleToken}/>
        <header className="App-header">
          <h1 style={{color: "black", fontFamily: "sans-serif", fontWeight: 200}}>Scrollr</h1>
          <div style={{width: "100px", height: "100px", background: "black", borderRadius: "50%"}}/>
          <div style={{width: "76px", height: "76px", opacity: 0.3, background: "white", transform: "translate(-6px, -78px) rotate(45deg)"}}/>
          <button className="App-button" onClick={handleClick}>Login</button>  
        </header>
      </div>
    )
  }
  return <Router>{routes}</Router>;
}

export default App;




