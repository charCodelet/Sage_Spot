import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay: React.FC<any> = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        {/* <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer> */}
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal2: React.FC<any> = props => {
  console.log(props.show, `--> props.show`)
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={0}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    
    </React.Fragment>
  );
};

export default Modal2;
