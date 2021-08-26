import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import LoginModal from './components/LoginModal';
import MainNavigation from './components/MainNavigation';
import SendBird from 'sendbird';
import SendBirdWidget from './widget.SendBird';
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

  useEffect(() => {
    window.SendBird = SendBird;
    SendBirdWidget.start('9DA1B1F4-0BE6-4DA8-82C5-2E81DAB56F23'); // Sample APP_ID: '9DA1B1F4-0BE6-4DA8-82C5-2E81DAB56F23'
  })


  let routes: {};
  if (token) {
      routes = (
        <Switch>
          <Route path="/login" exact>        
            <MainNavigation token={token} photoIndex={photo} onHome={clearError} onClear={clearPhoto} handlePhoto={handlePhoto} handleToken={handleToken}/>    
           
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
  return (
    <Router>
      {routes}
      {token && <div id="sb_widget" />}  
      {/* <div style={{display: "none"}} id="sb_widget" />       */}
    </Router>
  )
}

export default App;




