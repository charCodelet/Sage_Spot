import React, {useState} from 'react';
import Modal from './Modal';
import './LoginModal.css';

const LoginModal: React.FC<any> = props => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, password }) // body data type must match "Content-Type" header
    })
    .then(v => v.json())
    .then(v => props.handleToken(v));
  }
  return (
    <Modal
      onCancel={props.onClear}
      header="Enter your name and password"
      show={props.error}
    >
      <div className="authentication">
        <label className="authentication__label" htmlFor='name'>Name<input className="authentication__input" onChange={handleName} name={name} value={name}/></label>
        <label className="authentication__label" htmlFor='password'>Password<input className="authentication__input" onChange={handlePassword} name={password} value={password}/></label>
        <button className="authentication__button" onClick={handleSubmit}>Login</button>
      </div>
    </Modal>
  );
};

export default LoginModal;
