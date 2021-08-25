import React, {useState} from 'react';

import Modal from './Modal';
// import Button from '../FormElements/Button';

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
    .then(v => {     
      props.handleToken(v)
    });
   
  }
  return (
    <Modal
      onCancel={props.onClear}
      header="Login"
      show={props.error}
      footer={<button onClick={props.onClear}>Cancel</button>}
    >
    <div>
      <label htmlFor='name'>Name<input onChange={handleName} name={name} value={name}/></label>
      <label htmlFor='password'>Password<input onChange={handlePassword} name={password} value={password}/></label>
      <button onClick={handleSubmit}>Login</button>
    </div>
    
      
    </Modal>
  );
};

export default LoginModal;
