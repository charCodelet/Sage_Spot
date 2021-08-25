import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Modal2 from './Modal2';
import MainHeader from './MainHeader';
import './MainNavigation.css';

const MainNavigation: React.FC<any> = props => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  let {name} = props.token;

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
      .then(v => setMyPosts(v));
    })();
  },[]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) => {
    props.handlePhoto(i)
  }

  return (
    <React.Fragment>
      <Modal2
        onCancel={props.onClear}
        header="Login"
        show={!!props.photoIndex.toString()}
      >
      <div>
        <div className="main-navigation__post">
          <img style={{width: "40%", borderRadius: "20%"}} className="main-navigation__images" src={myPosts[props.photoIndex]?.image}/>
          <div style={{display: "flex", flexDirection: "column", marginLeft: "2em"}}>
            <h1>{myPosts[props.photoIndex]?.title}</h1>
            <p>{myPosts[props.photoIndex]?.text}</p> 
          </div>
        </div>
      </div>   
      </Modal2>
      <MainHeader>
        <div style={{background: "rgb(177, 172, 172)"}} className="main-navigation__title"> 
          <Link style={{height: "50px"}} to="/">
              <div style={{width: "50px", height: "50px", background: "black", borderRadius: "50%"}}/>
              <div style={{width: "35px", height: "35px", opacity: 0.6, background: "white", transform: "translate(2px, -37px) rotate(45deg)"}}/>           
          </Link>
        </div>
        <h3 style={{color: "white"}}>Welcome {name}. You've been online for 
          <div className="time"> {seconds}s</div>
        </h3>
      </MainHeader>

      <div style={{backgroundColor: '#b1acac', height: "100vh"}}>
        {myPosts.map((v, i) => {
          return (
            <div key={i} onClick={e => handleClick(e, i)} className="main-navigation__posts">
              <div className="main-navigation__post">
                <img style={{width: "8%"/*, borderRadius: "20%"*/}} className="main-navigation__images" src={v.image}/>
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
