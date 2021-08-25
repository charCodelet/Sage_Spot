import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Modal2 from './Modal2';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import './MainNavigation.css';

const MainNavigation: React.FC<any> = props => {
  console.log(props, `--> props!!!`);

  // const [photo, showPhoto] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  let {name} = props.token

  useEffect(() => {
    setIsActive(!isActive);
  },[]);

  useEffect(() => {
    (async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json'},
      })
      .then(v => v.json())
      .then(v => {
        // console.log(v)
        setMyPosts(v)
      });
    })();
  },[]);
  // https://images.unsplash.com/photo-1529472119196-cb724127a98e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE0MTQxN30
  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1);
  //     }, 1000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  // console.log(myPosts, `--> myPosts`);

  const handleClick = e => {
    console.log(e.target)
    props.handlePhoto(e.target)
  }


  return (
    <React.Fragment>
     
     <Modal2
      onCancel={props.onClear}
      header="Login"
      show={!!props.error2}
    >
    <div>
      <div className="main-navigation__post">
        <img style={{width: "8%", borderRadius: "20%"}} className="main-navigation__images" src={myPosts[0]?.image}/>
        <div style={{display: "flex", flexDirection: "column", marginLeft: "2em"}}>
          <h1>{myPosts[0]?.title}</h1>
          <p>{myPosts[0]?.text}</p> 
        </div>
      </div>
    </div>
    
      
    </Modal2>

      <MainHeader>
        <div style={{background: "rgb(177, 172, 172)"}} className="main-navigation__title">
         
          <Link style={{height: "50px"}} to="/test">
           
              <div style={{width: "50px", height: "50px", background: "black", borderRadius: "50%"}}/>
              <div style={{width: "35px", height: "35px", opacity: 0.6, background: "white", transform: "translate(2px, -37px) rotate(45deg)"}}/>           
          </Link>
        </div>
        <h3 style={{color: "white"}}>Welcome {name}. You've been online for 
          {/* <div className="time"> {seconds}s</div> */}
        </h3>
       
      </MainHeader>

      <div style={{backgroundColor: '#b1acac', height: "100vh"}}>
        {myPosts.map(v => {
          return (
            <div onClick={handleClick} className="main-navigation__posts">
              <div className="main-navigation__post">
                <img style={{width: "8%", borderRadius: "20%"}} className="main-navigation__images" src={v.image}/>
                <div style={{display: "flex", flexDirection: "column", marginLeft: "2em"}}>
                  <h1>{v.title}</h1>
                  <p>{v.text}</p> 
                </div>
              </div>
            </div>
            
          )
        })}
      </div>
       
    </React.Fragment>
  );
};

export default MainNavigation;
